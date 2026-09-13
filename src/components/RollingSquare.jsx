import { useState, useEffect } from 'react';
import './RollingSquare.css';

const RollingSquare = () => {
    const [rotation, setRotation] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            // Only show square after scrolling past roughly 80% of hero
            setIsVisible(currentScroll > window.innerHeight * 0.7);
            
            // Rotation speed
            setRotation(currentScroll * 0.2); 
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`rolling-square-container ${isVisible ? 'visible' : ''}`}>
            <div 
                className="rolling-square" 
                style={{ transform: `rotate(${rotation}deg)` }}
            ></div>
        </div>
    );
};

export default RollingSquare;
