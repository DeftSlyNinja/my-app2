import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tmwcjfkebwcbiodezwik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtd2NqZmtlYndjYmlvZGV6d2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNDU4NjQsImV4cCI6MjA2MjgyMTg2NH0.liXfaaXDPEfGeSCs9vmpxfV9l9hgdvGlmly9iWQ616k",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
