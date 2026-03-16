import React, { useRef, PropsWithChildren } from 'react';

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

    const baseButtonStyle = {
        position: 'absolute' as const,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        transition: 'all 0.2s'
    };

    return (
        <div style={{
            position: 'relative',
            marginBottom: '30px',
            padding: '0 30px'
        }}>
            <button 
                onClick={() => scroll('left')}
                style={{ ...baseButtonStyle, left: '0' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                aria-label="Прокрутить влево"
            >
                ← 
            </button>
            <div
                ref={scrollContainerRef}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px',
                    overflowX: 'auto',
                    padding: '10px 5px 20px 5px',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#007bff #f0f0f0'
                }}
                className="tabs-scroll-container"
            >
                {children}
            </div>
            
            <button
                onClick={() => scroll('right')}
                style={{ ...baseButtonStyle, right: '0' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                aria-label="Прокрутить вправо"
            >
                →
            </button>
        </div> 
    );
};