export const getYearsAtWork = () => {
  const now = new Date()
  const birthdate = new Date('2021 11')
  const diff = now.getTime() - birthdate.getTime()

  const milliseconds = 1000 * 60 * 60 * 24 * 365.25

  const years = Math.floor(diff / milliseconds)
  const months = Math.floor((diff % milliseconds) / (milliseconds / 12))

  return { years, months }
}
