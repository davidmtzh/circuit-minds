'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '0.6rem 1rem',
        background: '#222',
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Log out
    </button>
  )
}
