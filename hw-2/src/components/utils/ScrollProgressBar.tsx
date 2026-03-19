import { useEffect, useState } from "react";
import "../../styles/ScrollProgressBar.css";

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
      className="scroll-progress-bar"
      style={{
        height: `${height}px`,
        zIndex
      }}
    >
      <div
        className="scroll-progress-bar__fill"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: color,
          borderRadius: `0 0 ${height}px ${height}px`
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;