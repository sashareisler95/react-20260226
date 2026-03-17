import { useEffect, useState } from "react";

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  color = "#2c2b2cff",
  height = 3,
  zIndex = 9999
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        backgroundColor: "transparent",
        zIndex,
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${scrollProgress}%`,
          backgroundColor: color,
          transition: "width 0.1s ease-out",
          borderRadius: `0 0 ${height}px ${height}px`
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;