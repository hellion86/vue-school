export const validatenEmail = (email: string) => {
  const trimmedEmail = email.trim()

  if (!trimmedEmail) return []

  const errors = []

  const emailRegexp = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/

  const isValidEmailFormat = emailRegexp.test(trimmedEmail)

  if (!isValidEmailFormat) errors.push('Not valid email')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length <= 6) errors.push('Password too short')

  if (!password.includes('@')) errors.push('Add specialnie simvoli')

  return errors
}
