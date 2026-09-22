const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '../src/data/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

const chunks = content.split(`id: 'course-`);

for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  
  const minutesMatches = [...chunk.matchAll(/durationMinutes:\s*(\d+)/g)];
  
  let totalMinutes = 0;
  minutesMatches.forEach(m => {
    totalMinutes += parseInt(m[1], 10);
  });
  
  let hours = Math.ceil(totalMinutes / 60);
  if (hours === 0) hours = 1; // Minimum 1 hour
  
  chunks[i] = chunk.replace(/durationHours:\s*\d+/, `durationHours: ${hours}`);
}

const newContent = chunks.join(`id: 'course-`);

fs.writeFileSync(mockDataPath, newContent, 'utf8');
console.log('Successfully updated all course durations to match curriculum!');
