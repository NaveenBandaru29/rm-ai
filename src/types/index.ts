export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  instructorId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  price: number;
  rating: number;
  reviewCount: number;
  thumbnailUrl: string;
  skills: string[];
  modules: Module[];
  isBestseller?: boolean;
}


export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'project';
  durationMinutes: number;
  content?: string; // Markdown or HTML content
  videoUrl?: string; // Mock URL
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'admin';
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedLessonIds: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  role: string;
}
