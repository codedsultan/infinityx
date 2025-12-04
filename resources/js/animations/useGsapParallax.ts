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
        // Proper type assertion for GSAP conditions
        const conditions = context.conditions as { isMobile: boolean; isDesktop: boolean } | undefined;

        if (!conditions) return;

        const { isMobile } = conditions;

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
