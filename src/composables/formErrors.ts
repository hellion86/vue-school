import type { LoginForm } from "@/types/AuthForm"
import type { AuthError } from "@supabase/supabase-js"

type FomrErrors<T> = {
  [K in keyof T]: T[K][]
}

export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FomrErrors<LoginForm>>()

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message === 'Invalid login credentials '
      ? 'Incorrect email or password'
      : error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: []
    }

    const { validatePassword, validatenEmail } = await import('@/utils/formValidations')

    const emailErrors = validatenEmail(formData.email)
    const passwordErros = validatePassword(formData.password)

    if (emailErrors.length) realtimeErrors.value.email = emailErrors
    if (passwordErros.length) realtimeErrors.value.password = passwordErros


  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm
  }
}
