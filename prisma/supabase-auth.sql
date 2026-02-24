-- Run this directly in the Supabase SQL editor (Dashboard → SQL Editor).
-- Prisma cannot apply these because its shadow database lacks the auth schema.

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles table
-- ─────────────────────────────────────────────────────────────────────────────

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

-- ─────────────────────────────────────────────────────────────────────────────
-- investments table
-- ─────────────────────────────────────────────────────────────────────────────

-- 4. Foreign key from investments to auth.users
--    (Prisma cannot model this — auth schema is outside Prisma's control)
ALTER TABLE "public"."investments"
  ADD CONSTRAINT "investments_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- 5. Enable Row Level Security so users can only access their own investments
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies — auth.uid() returns the UUID of the currently logged-in user
CREATE POLICY "investments: select own"
  ON public.investments FOR SELECT
  USING (auth.uid() = "userId");

CREATE POLICY "investments: insert own"
  ON public.investments FOR INSERT
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "investments: update own"
  ON public.investments FOR UPDATE
  USING (auth.uid() = "userId");

CREATE POLICY "investments: delete own"
  ON public.investments FOR DELETE
  USING (auth.uid() = "userId");
