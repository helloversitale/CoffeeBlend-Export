/*
  # Create Headlines Table for Dynamic Content

  1. New Tables
    - `headlines`
      - `id` (uuid, primary key) - Unique identifier for each headline
      - `ref` (text, unique, not null) - Referrer identifier (e.g., "google", "facebook")
      - `headline` (text, not null) - The headline text to display
      - `created_at` (timestamptz) - Timestamp when the headline was created
      - `updated_at` (timestamptz) - Timestamp when the headline was last updated

  2. Security
    - Enable RLS on `headlines` table
    - Add policy for public read access (headlines are public content)
    - Add policy for authenticated users to manage headlines (for admin panel)

  3. Sample Data
    - Insert default headlines for various referrer sources
*/

CREATE TABLE IF NOT EXISTS headlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref text UNIQUE NOT NULL,
  headline text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE headlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view headlines"
  ON headlines
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert headlines"
  ON headlines
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update headlines"
  ON headlines
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete headlines"
  ON headlines
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO headlines (ref, headline) VALUES
  ('default', 'Discover Your Perfect Cup'),
  ('google', 'Find Your Perfect Coffee Match'),
  ('facebook', 'Join Our Coffee Community'),
  ('instagram', 'Brew Like a Barista'),
  ('email', 'Welcome Back Coffee Lover')
ON CONFLICT (ref) DO NOTHING;