import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tyrgacwlvphttaotpsvc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cmdhY3dsdnBodHRhb3Rwc3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTYzMTMsImV4cCI6MjA2NzY5MjMxM30.stz-N6MoVVAH93Cz3cF9Fw29_iCzRsFU4XGWufLfOgk'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      portfolio_images: {
        Row: {
          id: string
          url: string
          title: string
          category: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          url: string
          title: string
          category: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          url?: string
          title?: string
          category?: string
          description?: string | null
          updated_at?: string
        }
      }
      portfolio_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
    }
  }
}