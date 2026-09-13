import { useEffect, useRef, useState } from 'react';
import { TOOLS_URL } from '../constants';
import './Footer.css';

/* ── Pixel Pet Character ── */
const PixelPet = () => {
    const petRef = useRef(null);
    const posRef = useRef(10); // % position
    const dirRef = useRef(1);  // 1 = right, -1 = left
    const frameRef = useRef(0);
    const [frame, setFrame] = useState(0);
    const [pos, setPos] = useState(10);
    const [dir, setDir] = useState(1);

    useEffect(() => {
        let animId;
        let lastTime = 0;
        const SPEED = 0.018;   // % per ms
        const FRAME_INTERVAL = 200; // ms per walk frame
        let lastFrameTime = 0;

        const tick = (time) => {
            const dt = time - lastTime;
            lastTime = time;

            // Move
            posRef.current += dirRef.current * SPEED * dt;
            if (posRef.current >= 88) { posRef.current = 88; dirRef.current = -1; }
            if (posRef.current <= 2)  { posRef.current = 2;  dirRef.current = 1; }

            setPos(posRef.current);
            setDir(dirRef.current);

            // Animate walk frames
            if (time - lastFrameTime > FRAME_INTERVAL) {
                frameRef.current = (frameRef.current + 1) % 2;
                setFrame(frameRef.current);
                lastFrameTime = time;
            }

            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div
            ref={petRef}
            className={`pixel-pet ${dir === -1 ? 'flip' : ''} frame-${frame}`}
            style={{ left: `${pos}%` }}
            title="Pixel Engineer — always coding!"
        >
            {/* Pixel art cat/coder via CSS box-shadow */}
            <div className="pet-sprite" />
        </div>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Pet runway */}
            <div className="pet-runway">
                <PixelPet />
            </div>

            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h2 className="footer-logo gradient-text">Samarpan</h2>
                        <p>Building smart, modern, and creative web experiences.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li>
                                <a href={TOOLS_URL} target="_blank" rel="noopener noreferrer" className="footer-tools-link">
                                    <i className='bx bx-rocket'></i> Tools &amp; Products
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="footer-social">
                        <h3>Connect</h3>
                        <div className="social-links">
                            <a href="https://github.com/owsam22" target="_blank" rel="noopener noreferrer">
                                <i className='bx bxl-github'></i>
                            </a>
                            <a href="https://linkedin.com/in/samarpan22" target="_blank" rel="noopener noreferrer">
                                <i className='bx bxl-linkedin-square'></i>
                            </a>
                            <a href="https://youtube.com/@samarpan.22" target="_blank" rel="noopener noreferrer">
                                <i className='bx bxl-youtube'></i>
                            </a>
                            <a href="https://instagram.com/owsam22" target="_blank" rel="noopener noreferrer">
                                <i className='bx bxl-instagram'></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <p>© {currentYear} Samarpan — All rights reserved.</p>
                    <p>Built with ❤️ using React &amp; Vite</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
