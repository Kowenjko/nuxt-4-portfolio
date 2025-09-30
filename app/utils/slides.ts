export const equalizeSlides = () => {
  const slides = document.querySelectorAll('.review-slide')

  let maxHeight = 0
  slides.forEach((s) => (maxHeight = Math.max(maxHeight, s.offsetHeight)))
  slides.forEach((s) => (s.style.height = maxHeight + 'px'))
}
