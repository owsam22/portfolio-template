import { useEffect, useRef } from 'react';
import { TOOLS_URL } from '../constants';
import './ToolsSection.css';

const ToolsSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('tools-visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="tools-section" ref={sectionRef}>
            <div className="container">
                <div className="tools-inner">
                    {/* Left content */}
                    <div className="tools-content">
                        <div className="tools-badge">
                            <i className="bx bx-rocket" />
                            <span>Live Products</span>
                        </div>

                        <h2 className="tools-heading">
                            Explore My{' '}
                            <span className="tools-highlight">Tools &amp; Products</span>
                        </h2>

                        <p className="tools-description">
                            Beyond client projects, I build my own tools and products — crafted to
                            solve real problems with clean UX and sharp engineering. Check out what
                            I've shipped.
                        </p>

                        <div className="tools-features">
                            <div className="tools-feature-item">
                                <i className="bx bx-check-circle" />
                                <span>Publicly deployed &amp; battle-tested</span>
                            </div>
                            <div className="tools-feature-item">
                                <i className="bx bx-check-circle" />
                                <span>Built with modern stacks</span>
                            </div>
                            <div className="tools-feature-item">
                                <i className="bx bx-check-circle" />
                                <span>Free to use, open &amp; evolving</span>
                            </div>
                        </div>

                        <a
                            href={TOOLS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tools-cta-btn"
                            id="tools-cta-primary"
                        >
                            <span>Browse Tools &amp; Products</span>
                            <i className="bx bx-arrow-back bx-rotate-180" />
                        </a>
                    </div>

                    {/* Right visual card */}
                    <div className="tools-visual">
                        <a href='#'>
                            <div className="tools-card">
                                <div className="tools-card-header">
                                    <div className="tools-dots">
                                        <span className="dot dot-red" />
                                        <span className="dot dot-yellow" />
                                        <span className="dot dot-green" />
                                    </div>
                                    <span className="tools-card-title">products.js</span>
                                </div>
                                <div className="tools-card-body">
                                    <div className="code-line">
                                        <span className="code-keyword">const</span>{' '}
                                        <span className="code-var">tools</span>{' '}
                                        <span className="code-op">=</span>{' '}
                                        <span className="code-bracket">[</span>
                                    </div>
                                    <div className="code-line code-indent">
                                        <span className="code-string">"Live Previewer"</span>
                                        <span className="code-op">,</span>
                                    </div>
                                    <div className="code-line code-indent code-blink">
                                        <span className="code-string">"More coming..."</span>
                                    </div>
                                    <div className="code-line">
                                        <span className="code-bracket">]</span>
                                    </div>
                                    <div className="code-line code-spacer" />
                                    <div className="code-line">
                                        <span className="code-keyword">export default</span>{' '}
                                        <span className="code-var">tools</span>
                                    </div>
                                </div>
                                <div className="tools-card-glow" />
                            </div>
                        </a>

                        {/* Floating stat chips */}
                        <div className="tools-chip tools-chip-1">
                            <i className="bx bxs-zap" />
                            <span>Live &amp; Deployed</span>
                        </div>
                        <div className="tools-chip tools-chip-2">
                            <i className="bx bxs-star" />
                            <span>Open Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
