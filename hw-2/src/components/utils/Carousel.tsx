import { useRef, PropsWithChildren } from 'react';
import "../../styles/Carousel.css"

interface CarouselProps {
  scrollAmount?: number;
}

export const Carousel = ({ children, scrollAmount = 300 }: PropsWithChildren<CarouselProps>) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const newScrollLeft = scrollContainerRef.current.scrollLeft + 
                (direction === 'left' ? -scrollAmount : scrollAmount);
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="carousel">
            <button 
                onClick={() => scroll('left')}
                className="carousel-button carousel-button--left"
                aria-label="Прокрутить влево"
            >
                ← 
            </button>
            
            <div
                ref={scrollContainerRef}
                className="carousel-container"
            >
                {children}
            </div>
            
            <button
                onClick={() => scroll('right')}
                className="carousel-button carousel-button--right"
                aria-label="Прокрутить вправо"
            >
                →
            </button>
        </div> 
    );
};