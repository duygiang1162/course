import { supabase } from './supabase';
import type { Course, Category, Lesson } from './types';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as Category[];
}

export async function getCourses({ 
  categoryId, 
  search, 
  level 
}: { 
  categoryId?: string;
  search?: string;
  level?: string;
}) {
  let query = supabase
    .from('courses')
    .select(`
      *,
      category:categories(name),
      instructor:profiles(username, full_name, avatar_url)
    `)
    .eq('is_published', true);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  if (level) {
    query = query.eq('level', level);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as (Course & {
    category: Pick<Category, 'name'>;
    instructor: { username: string; full_name: string; avatar_url: string; };
  })[];
}

export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      category:categories(name),
      instructor:profiles(username, full_name, avatar_url, bio),
      lessons:lessons(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Course & {
    category: Pick<Category, 'name'>;
    instructor: { username: string; full_name: string; avatar_url: string; bio: string; };
    lessons: Lesson[];
  };
}

export async function isEnrolled(courseId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('course_id', courseId)
    .eq('user_id', supabase.auth.getUser())
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

export async function enrollInCourse(courseId: string) {
  const { error } = await supabase
    .from('enrollments')
    .insert({ course_id: courseId });

  if (error) throw error;
}
