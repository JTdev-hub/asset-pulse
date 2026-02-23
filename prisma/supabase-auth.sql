-- Run this directly in the Supabase SQL editor (Dashboard → SQL Editor).
-- Prisma cannot apply these because its shadow database lacks the auth schema.

-- 1. Foreign key from profiles to auth.users
ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- 2. Function that inserts a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles ("userId", "preferredCurrency")
  VALUES (NEW.id, 'PHP');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger that calls the function after every new user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
