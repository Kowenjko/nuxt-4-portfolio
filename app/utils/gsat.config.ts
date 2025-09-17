import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

const {
  set: gsapSet,
  registerPlugin,
  to: gsapTo,
  fromTo: gsapFromTo,
  utils: gsapUtils,
  from: gsapFrom,
  timeline: gsapTimeline,
} = useGSAP()

registerPlugin(ScrollTrigger, TextPlugin)

export { gsapSet, gsapTo, gsapFromTo, gsapUtils, gsapFrom, gsapTimeline, SplitText }
