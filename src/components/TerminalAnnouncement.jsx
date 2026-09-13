import { useState, useEffect } from 'react';
import './TerminalAnnouncement.css';

const TerminalAnnouncement = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show announcement after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);

            // Auto-hide after 10 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="terminal-announcement-container fade-in-up">
            <div className="announcement-content">
                <i className='bx bx-terminal'></i>
                <div className="announcement-text">
                    <p>Developer Shell is active!</p>
                    <span>Press <code>Ctrl + `</code> to toggle</span>
                </div>
                <button className="announcement-close" onClick={() => setIsVisible(false)}>
                    <i className='bx bx-x'></i>
                </button>
            </div>
            <div className="announcement-progress-bar"></div>
        </div>
    );
};

export default TerminalAnnouncement;
