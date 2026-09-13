import { useState, useEffect } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import './Hero.css';
import mainimg from '../assets/main-img.webp';
const Hero = () => {
    const gitHubBtnRef = useMagnetic(0.3);
    const resumeBtnRef = useMagnetic(0.3);
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const roles = [
        'Full-Stack Developer',
        'AI Engineer',
        'Creative Designer',
        'Frontend Dev',
        'Problem Solver'
    ];

    useEffect(() => {
        const role = roles[currentRole];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < role.length) {
                    setDisplayText(role.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(role.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole]);

    return (
        <section id="home" className="hero">
            {/* Floating Particles */}
            <div className="hero-particles">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            <div className="container">
                <div className="hero-content">
                    {/* Profile Image */}
                    <div className="hero-image-container fade-in">
                        <div className="hero-image-wrapper">
                            <img
                                src={mainimg}
                                alt="Samarpan - Developer"
                                className="hero-image"
                            />
                            <div className="image-glow"></div>
                        </div>

                        {/* Social Links */}
                        <div className="hero-socials">
                            <a href="https://instagram.com/owsam22" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className='bx bxl-instagram'></i>
                            </a>
                            <a href="https://github.com/owsam22" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className='bx bxl-github'></i>
                            </a>
                            <a href="https://linkedin.com/in/owsam22" target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className='bx bxl-linkedin-square'></i>
                            </a>
                        </div>
                    </div>

                    {/* Hero Text */}
                    <div className="hero-text">
                        <h1 className="hero-title slide-in-right">
                            Hi, I'm <span className="gradient-text">Samarpan</span>
                        </h1>
                        <h2 className="hero-subtitle slide-in-right" style={{ animationDelay: '0.2s' }}>
                            <span className="typed-text">{displayText}</span>
                            <span className="cursor">|</span>
                        </h2>
                        <p className="hero-description slide-in-right" style={{ animationDelay: '0.4s' }}>
                            Crafting modern, AI-powered full-stack solutions with creativity and code.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-buttons slide-in-right" style={{ animationDelay: '0.6s' }}>
                            <a
                                ref={gitHubBtnRef}
                                href="https://github.com/owsam22"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <i className='bx bxl-github'></i>
                                View GitHub
                            </a>
                            <a
                                ref={resumeBtnRef}
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <i className='bx bx-file'></i>
                                View Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <p>Scroll Down</p>
            </div>
        </section>
    );
};

export default Hero;
