import { createClient } from '@supabase/supabase-js'

let client = null

export function getSupabase() {
  if (client) return client

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn('Supabase non configuré: mode local.')
    return null
  }

  client = createClient(url, anonKey)
  return client
}

export async function saveDiagnosis(diagnosis) {
  const supabase = getSupabase()
  if (!supabase) return { data: diagnosis, error: null, local: true }

  const { data, error } = await supabase
    .from('diagnoses')
    .insert(diagnosis)
    .select()
    .single()

  return { data, error, local: false }
}
