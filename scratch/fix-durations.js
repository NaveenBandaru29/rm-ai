const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '../../src/data/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// We need to parse the courses. Since it's TS, let's use a simpler approach.
// We can find each course block, extract its durationMinutes, sum them up,
// and replace the durationHours.

const courseRegex = /{[\s\S]*?id:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?durationHours:\s*(\d+)[\s\S]*?modules:\s*\[([\s\S]*?)\]\n\s*}/g;

let match;
const updates = [];

// Since the regex might not capture the full modules array reliably due to nested brackets,
// let's do this: we can just use the typescript compiler API or babel to parse it.
// Actually, it's simpler:
// Split the file by `id: 'course-` to process each course chunk.

const chunks = content.split(`id: 'course-`);

for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  
  // Find all durationMinutes in this chunk
  const minutesMatches = [...chunk.matchAll(/durationMinutes:\s*(\d+)/g)];
  
  let totalMinutes = 0;
  minutesMatches.forEach(m => {
    totalMinutes += parseInt(m[1], 10);
  });
  
  let hours = Math.ceil(totalMinutes / 60);
  if (hours === 0) hours = 1; // Minimum 1 hour
  
  // Replace the first occurrence of durationHours in this chunk
  chunks[i] = chunk.replace(/durationHours:\s*\d+/, `durationHours: ${hours}`);
}

const newContent = chunks.join(`id: 'course-`);

fs.writeFileSync(mockDataPath, newContent, 'utf8');
console.log('Successfully updated all course durations to match curriculum!');
