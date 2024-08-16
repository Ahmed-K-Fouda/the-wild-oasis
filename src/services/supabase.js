import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jdiuygwedngugfqgngeq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaXV5Z3dlZG5ndWdmcWduZ2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NDc2NTAsImV4cCI6MjAzNzIyMzY1MH0.xc8X2Z0nA_5eD9PL6puKlIVJcSLGmfOUM7SZLIR_od0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
