// public/scripts/supabase.js
import { createClient } from '@supabase/supabase-js';
import { Analytics } from "@vercel/analytics/next"

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://hfowpjsdivftvvevikem.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmb3dwanNkaXZmdHZ2ZXZpa2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzQ1NjYsImV4cCI6MjA2NDAxMDU2Nn0.eSVPUKLwYxyQIbwmjbdSJW4l272mcsRsOGImSUnh5E4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);