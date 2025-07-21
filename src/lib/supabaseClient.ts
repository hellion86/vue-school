import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_TOKEN )

// console.log(import.meta.env.VITE_SUPABASE_TOKEN)
// 'https://dxjvxdwvuazlxpziupsm.supabase.co'
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4anZ4ZHd2dWF6bHhweml1cHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjk0MzMsImV4cCI6MjA2ODY0NTQzM30.UEA0_RKv5OK9y9B-zCsqAJ8r50jIc22xx4PXj9lt2rg'
