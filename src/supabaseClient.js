import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

//console.log('Supabase URL:', supabaseUrl); // Log the URL
//console.log('Supabase Anon Key:', supabaseAnonKey); // Log the key (be careful with this in production)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
