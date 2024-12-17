
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://pgpasurkskbtwrcnqyck.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncGFzdXJrc2tidHdyY25xeWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5ODkxOTcsImV4cCI6MjA0OTU2NTE5N30.zhVU46TYvhCGhzcXHLr4TNIs6GWE_d1QCwdNUvyWlwo'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase