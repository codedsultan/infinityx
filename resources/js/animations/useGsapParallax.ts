// /animations/useGsapParallax.ts
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  selector: string;
  y?: number;
  scrub?: boolean;
}

export const useGsapParallax = ({
  selector,
  y = -60,
  scrub = true,
}: ParallaxOptions) => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      },
      (context) => {
        const { isMobile } = context.conditions as any;

        if (!isMobile) {
          gsap.to(selector, {
            scrollTrigger: {
              trigger: selector,
              scrub,
              start: "top bottom",
              end: "bottom top",
            },
            y,
            ease: "none",
            immediateRender: false,
          });
        }
      }
    );

    return () => mm.revert();
  }, [selector, y, scrub]);
};
