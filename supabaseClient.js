import { createClient } from "@supabase/supabase-js"

const supaBaseURL = import.meta.env.VITE_SUPABASE_URL
const supaBaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supaBaseURL, supaBaseAnonKey)
