import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSectionAnimations = () => {
  // Animate section titles safely
  gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 95%",
        toggleActions: "play none none none",
      },
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      immediateRender: false,
    });
  });

  // Animate fade-item elements safely
  gsap.utils.toArray<HTMLElement>(".fade-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 98%",
        toggleActions: "play none none none",
      },
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
      immediateRender: false,
    });
  });
};
