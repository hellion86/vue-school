import type { User, Session } from "@supabase/supabase-js"
import type { Tables } from "../../database/types"
import { profileQuery } from "@/utils/supaQueries"
import { supabase } from "@/lib/supabaseClient"


export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTrackingAuthChanges = ref(false)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery({ column: 'id', value: user.value.id })
      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      profile.value = null
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) {
      await setAuth(data.session)
    }
  }

  const trackAuthChanges = () => {
    if (!isTrackingAuthChanges.value) {
      isTrackingAuthChanges.value = true
      supabase.auth.onAuthStateChange((event, session) => {
        setTimeout(async () => {
          await setAuth(session)
        }, 0);
      })
    }
  }

  return {
    user,
    profile,
    setAuth,
    setProfile,
    getSession,
    trackAuthChanges
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
