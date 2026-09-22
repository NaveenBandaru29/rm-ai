import type { Enrollment } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ENROLLMENTS_KEY = 'learning_platform_enrollments';

export const EnrollmentService = {
  async getEnrollments(userId: string): Promise<Enrollment[]> {
    await delay(400);
    const stored = localStorage.getItem(ENROLLMENTS_KEY);
    if (!stored) return [];
    
    const enrollments: Enrollment[] = JSON.parse(stored);
    return enrollments.filter(e => e.userId === userId);
  },

  async enrollInCourse(userId: string, courseId: string): Promise<Enrollment> {
    await delay(800); // Simulate payment processing delay
    
    const stored = localStorage.getItem(ENROLLMENTS_KEY);
    const enrollments: Enrollment[] = stored ? JSON.parse(stored) : [];
    
    // Check if already enrolled
    const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (existing) {
      return existing;
    }

    const newEnrollment: Enrollment = {
      id: 'enr-' + Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progressPercentage: 0,
      completedLessonIds: []
    };

    enrollments.push(newEnrollment);
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
    
    return newEnrollment;
  },

  async markLessonComplete(userId: string, courseId: string, lessonId: string): Promise<Enrollment | null> {
    await delay(300);
    
    const stored = localStorage.getItem(ENROLLMENTS_KEY);
    if (!stored) return null;
    
    const enrollments: Enrollment[] = JSON.parse(stored);
    const index = enrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
    
    if (index === -1) return null;
    
    const enrollment = enrollments[index];
    if (!enrollment.completedLessonIds.includes(lessonId)) {
      enrollment.completedLessonIds.push(lessonId);
      
      // In a real app, progress would be calculated based on total lessons in the course.
      // For this mock, we'll just increment it vaguely or leave accurate calculation for the component side.
      // We'll leave accurate calculation to the UI or a separate method for simplicity here.
    }
    
    enrollments[index] = enrollment;
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
    
    return enrollment;
  }
};
