/*
  # Bible Study Progress System

  1. New Tables
    - `studies`
      - `id` (int, primary key)
      - `title` (text)
      - `description` (text)
      - `total_chapters` (int)
      - `difficulty` (text)
      - `is_unlocked_by_default` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chapters`
      - `id` (int, primary key)
      - `study_id` (int, foreign key)
      - `chapter_number` (int)
      - `title` (text)
      - `total_pages` (int)
      - `content` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_study_progress`
      - `id` (int, primary key)
      - `user_id` (uuid, foreign key)
      - `study_id` (int, foreign key)
      - `chapter_id` (int, foreign key)
      - `pages_completed` (int)
      - `is_chapter_complete` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own progress
    - Add policies for reading study content
*/

-- Create studies table
CREATE TABLE IF NOT EXISTS studies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  total_chapters INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
  is_unlocked_by_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  study_id INTEGER REFERENCES studies(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  total_pages INTEGER NOT NULL DEFAULT 1,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(study_id, chapter_number)
);

-- Create user_study_progress table
CREATE TABLE IF NOT EXISTS user_study_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  study_id INTEGER REFERENCES studies(id) ON DELETE CASCADE,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  pages_completed INTEGER DEFAULT 0,
  is_chapter_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, study_id, chapter_id)
);

-- Enable Row Level Security
ALTER TABLE studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_study_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for studies table (readable by all authenticated users)
CREATE POLICY "Studies are viewable by authenticated users"
  ON studies
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for chapters table (readable by all authenticated users)
CREATE POLICY "Chapters are viewable by authenticated users"
  ON chapters
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_study_progress table
CREATE POLICY "Users can view own study progress"
  ON user_study_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study progress"
  ON user_study_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study progress"
  ON user_study_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample studies data
INSERT INTO studies (title, description, total_chapters, difficulty, is_unlocked_by_default) VALUES
('Foundations of Faith', 'Explore the fundamental principles of Christian faith', 12, 'Beginner', true),
('The Life of Jesus', 'Journey through the life and teachings of Christ', 15, 'Intermediate', false),
('Psalms and Worship', 'Discover the heart of worship through the Psalms', 8, 'Beginner', false),
('Parables and Teachings', 'Understand Jesus'' parables and their meanings', 10, 'Intermediate', false),
('Letters to the Churches', 'Study Paul''s letters and their applications', 14, 'Advanced', false),
('Prophecies and Revelation', 'Explore biblical prophecy and end times', 18, 'Advanced', false);

-- Insert sample chapters for the first study
INSERT INTO chapters (study_id, chapter_number, title, total_pages) VALUES
(1, 1, 'Understanding God''s Love', 3),
(1, 2, 'The Nature of Faith', 3),
(1, 3, 'Prayer and Communication', 3),
(1, 4, 'Scripture and Truth', 3),
(1, 5, 'Grace and Forgiveness', 3),
(1, 6, 'Community and Fellowship', 3),
(1, 7, 'Service and Ministry', 3),
(1, 8, 'Spiritual Growth', 3),
(1, 9, 'Overcoming Challenges', 3),
(1, 10, 'Living with Purpose', 3),
(1, 11, 'Sharing Your Faith', 3),
(1, 12, 'Walking in Victory', 3);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_studies_updated_at BEFORE UPDATE ON studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_study_progress_updated_at BEFORE UPDATE ON user_study_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();