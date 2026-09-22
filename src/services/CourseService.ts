import { courses, categories } from '../data/mockData';
import type { Course, Category } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CourseService = {
  async getAllCourses(): Promise<Course[]> {
    await delay(80);
    return courses;
  },

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    await delay(50);
    return courses.find(c => c.slug === slug);
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    await delay(50);
    return courses.find(c => c.id === id);
  },

  async getCoursesByCategory(categoryId: string): Promise<Course[]> {
    await delay(80);
    return courses.filter(c => c.categoryId === categoryId);
  },

  async getAllCategories(): Promise<Category[]> {
    await delay(50);
    return categories;
  }
};
