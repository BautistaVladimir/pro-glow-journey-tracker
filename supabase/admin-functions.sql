
-- Create a table to store admin verification codes
CREATE TABLE IF NOT EXISTS public.admin_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  description TEXT
);

-- Allow only admins to view and manage admin codes
ALTER TABLE public.admin_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage admin codes" 
  ON public.admin_codes 
  USING (EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Function to verify admin codes
CREATE OR REPLACE FUNCTION public.verify_admin_code(input_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  is_valid BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_codes
    WHERE code = input_code AND is_used = FALSE
  ) INTO is_valid;
  
  -- Optionally mark the code as used
  IF is_valid THEN
    UPDATE public.admin_codes 
    SET is_used = TRUE, used_at = now()
    WHERE code = input_code;
  END IF;
  
  RETURN is_valid;
END;
$$;

-- Function to generate new admin codes (can only be called by existing admins)
CREATE OR REPLACE FUNCTION public.generate_admin_code(description TEXT DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  new_code TEXT;
  is_admin BOOLEAN;
BEGIN
  -- Check if the current user is an admin
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  ) INTO is_admin;
  
  IF NOT is_admin THEN
    RAISE EXCEPTION 'Only administrators can generate admin codes';
  END IF;

  -- Generate a random code with a combination of letters and numbers
  new_code := 'ADMIN' || floor(random() * 900000 + 100000)::TEXT;
  
  -- Insert the new code
  INSERT INTO public.admin_codes (code, created_by, description)
  VALUES (new_code, auth.uid(), description);
  
  RETURN new_code;
END;
$$;

-- Insert initial admin code (this is just for setup, in production you would generate this securely)
INSERT INTO public.admin_codes (code, description)
VALUES ('ADMIN123', 'Initial admin code for first administrator')
ON CONFLICT (code) DO NOTHING;

-- Create view for admin dashboard statistics
CREATE OR REPLACE VIEW public.admin_statistics AS
SELECT
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM public.users WHERE role = 'admin') as total_admins,
  (SELECT COUNT(*) FROM public.activities) as total_activities,
  (SELECT COUNT(*) FROM public.bmi) as total_bmi_entries,
  (SELECT COUNT(*) FROM public.nutrition) as total_nutrition_entries,
  (SELECT COUNT(*) FROM public.sleep) as total_sleep_entries,
  (SELECT COUNT(*) FROM public.hydration) as total_hydration_entries,
  (SELECT COUNT(*) FROM public.goals) as total_goals;

-- Add function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;
