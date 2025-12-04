import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeOptions {
  selector: string;
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export const useGsapFadeIn = ({
  selector,
  y = 40,
  x = 0,
  duration = 1,
  stagger = 0.15,
  once = true,
}: FadeOptions) => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        // Proper type assertion for GSAP conditions
        const conditions = context.conditions as { isMobile: boolean; isDesktop: boolean } | undefined;

        if (!conditions) return;

        const { isMobile } = conditions;

        gsap.from(selector, {
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
          autoAlpha: isMobile ? 1 : 0,
          y: isMobile ? 0 : y,
          x: isMobile ? 0 : x,
          duration,
          stagger,
          ease: "power2.out",
          immediateRender: false,
        });
      }
    );

    return () => mm.revert();
  }, [selector, y, x, duration, stagger, once]);
};
