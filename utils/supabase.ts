import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserStudyProgress {
  id?: number;
  user_id: string;
  study_id: number;
  chapter_id: number;
  pages_completed: number;
  is_chapter_complete: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Study {
  id: number;
  title: string;
  description: string;
  total_chapters: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  is_unlocked_by_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Chapter {
  id: number;
  study_id: number;
  chapter_number: number;
  title: string;
  total_pages: number;
  content?: string;
  created_at?: string;
  updated_at?: string;
}