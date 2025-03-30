/*
  # Create Test User

  1. Changes
    - Create a test user in auth.users
    - Create corresponding profile in public.profiles
    
  2. Security
    - Uses proper UUID format for user ID
    - Securely hashes password using bcrypt
*/

DO $$
DECLARE
  test_user_id uuid := gen_random_uuid();
BEGIN
  -- Insert test user into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    test_user_id,
    'authenticated',
    'authenticated',
    'test@example.com',
    crypt('password123', gen_salt('bf')),
    now(),
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert corresponding profile
  INSERT INTO public.profiles (
    id,
    username,
    full_name,
    created_at,
    updated_at
  ) VALUES (
    test_user_id,
    'testuser',
    'Test User',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
END $$;
