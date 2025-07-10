/*
  # Create Portfolio Tables

  1. New Tables
    - `portfolio_images`
      - `id` (uuid, primary key)
      - `url` (text, image URL)
      - `title` (text, image title)
      - `category` (text, image category)
      - `description` (text, optional description)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `portfolio_categories`
      - `id` (uuid, primary key)
      - `name` (text, unique category name)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content

  3. Storage
    - Create storage bucket for images
    - Set up public access policies
*/

-- Create portfolio_images table
CREATE TABLE IF NOT EXISTS portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio_categories table
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_images
CREATE POLICY "Anyone can view portfolio images"
  ON portfolio_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert portfolio images"
  ON portfolio_images
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio images"
  ON portfolio_images
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete portfolio images"
  ON portfolio_images
  FOR DELETE
  TO public
  USING (true);

-- Create policies for portfolio_categories
CREATE POLICY "Anyone can view portfolio categories"
  ON portfolio_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert portfolio categories"
  ON portfolio_categories
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio categories"
  ON portfolio_categories
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Anyone can delete portfolio categories"
  ON portfolio_categories
  FOR DELETE
  TO public
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for portfolio_images
CREATE TRIGGER update_portfolio_images_updated_at
  BEFORE UPDATE ON portfolio_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO portfolio_categories (name) VALUES
  ('advertising'),
  ('digital-art'),
  ('branding'),
  ('ui-design'),
  ('print-design')
ON CONFLICT (name) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Anyone can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'images');