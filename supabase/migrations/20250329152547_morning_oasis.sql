/*
  # Add email column to profiles table

  1. Changes
    - Add email column to profiles table
    - Update existing test user profile with email
*/

-- Add email column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email text;

-- Update the test user's profile with their email
UPDATE public.profiles
SET email = 'test@example.com'
WHERE username = 'testuser';

-- Add index on email column for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles (email);
