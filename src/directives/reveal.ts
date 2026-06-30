import type { Directive } from 'vue'

/**
 * v-reveal — slick scroll entrance animation.
 *
 * Elements start slightly offset and faded out, then ease into place the first
 * time they scroll into view. Pass a number to stagger the delay (ms):
 *   <div v-reveal />        // no delay
 *   <div v-reveal="120" />  // 120ms delay
 *
 * Tailwind utility classes only; honors prefers-reduced-motion.
 */
const HIDDEN = ['opacity-0', 'translate-y-8']
const TRANSITION = [
  'transition',
  'duration-700',
  'ease-out',
  'will-change-transform',
  'motion-reduce:transition-none',
]

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) return

    el.classList.add(...TRANSITION, ...HIDDEN)

    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.remove(...HIDDEN)
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
  },
}
