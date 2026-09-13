import { useState, useEffect } from 'react';
import { TOOLS_URL } from '../constants';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Calculate scroll progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // Update active section based on scroll position
            const sections = ['home', 'projects', 'skills', 'about', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            {/* Scroll Progress Bar */}
            <div
                className="scroll-progress-bar"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            <div className="container">
                <div className="header-content">
                    <div className="logo-section" onClick={() => scrollToSection('home')}>
                        <div className="logo gradient-text">Samarpan Jayswal</div>
                        <div className="status-badge">
                            <span className="status-dot"></span>
                            <span className="status-text">Available for Freelance</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        {['home', 'projects', 'skills', 'about', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                        <a
                            href={TOOLS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-tools-btn"
                        >
                            <i className='bx bx-rocket'></i>
                            Tools
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
                    {['home', 'projects', 'skills', 'about', 'contact'].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`nav-link ${activeSection === section ? 'active' : ''}`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                    <a
                        href={TOOLS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-tools-btn"
                    >
                        <i className='bx bx-rocket'></i>
                        Tools & Products
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
