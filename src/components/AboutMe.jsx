import { useEffect, useRef } from 'react';
import profileImg from '../assets/img.jpg';
import './AboutMe.css';

const achievements = [
    {
        icon: 'bx bx-trophy',
        title: 'Hackathon Finalist',
        detail: 'Competed in inter-college hackathons, delivering full-stack solutions under tight deadlines.',
        color: '#f59e0b',
    },
    {
        icon: 'bx bx-rocket',
        title: '18+ Live Projects',
        detail: 'Shipped production-ready web apps used by real users — from fintech dashboards to AI-powered tools.',
        color: '#6366f1',
    },
    {
        icon: 'bx bxl-github',
        title: '500+ GitHub Contributions',
        detail: 'Consistent open-source presence with contributions spanning full-stack, ML, and DevOps repos.',
        color: '#10b981',
    },
    {
        icon: 'bx bx-brain',
        title: 'AI & ML Integration',
        detail: 'Built and deployed machine learning models — including a real-world diabetes risk prediction engine.',
        color: '#ec4899',
    },
    {
        icon: 'bx bx-devices',
        title: 'Cross-Platform Builder',
        detail: 'From live wallpapers to chat apps, I build across platforms — web, desktop, and mobile.',
        color: '#06b6d4',
    },
    {
        icon: 'bx bx-code-curly',
        title: 'Full-Stack Engineer',
        detail: 'Proficient across the entire web stack: React frontends, Node.js APIs, and MongoDB/SQL databases.',
        color: '#8b5cf6',
    },
];

const AboutMe = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('am-visible');
                });
            },
            { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
        );
        const els = sectionRef.current?.querySelectorAll('.am-reveal');
        els?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="about-me-section" ref={sectionRef} aria-label="About Samarpan Jayswal">
            {/* Subtle background accents */}
            <div className="am-bg-blob am-blob-1" />
            <div className="am-bg-blob am-blob-2" />

            <div className="container am-outer">

                {/* ── TOP: two-column intro + photo ── */}
                <div className="am-top-row am-reveal">
                    {/* Left — text */}
                    <div className="am-left">
                        <span className="am-eyebrow">
                            <i className="bx bx-user-circle" /> Who am I
                        </span>
                        <div className="am-heading-wrapper">
                            <h2 className="am-heading">
                                I'm <span className="am-name-highlight">Samarpan Jayswal</span>
                            </h2>
                            <span className="am-nickname">~ <a href="https://www.google.com/search?q=owsam22" target="_blank" rel="noopener noreferrer">owsam22</a></span>
                        </div>
                        <p className="am-bio">
                            A <strong>Full-Stack Engineer</strong> and CS student who obsesses over clean code,
                            thoughtful architecture, and beautiful interfaces. I build things that are fast,
                            scalable, and — most importantly — actually useful. From{' '}
                            <strong>AI-powered web apps</strong> to real-time chat systems and personal
                            finance dashboards, I turn ideas into living, breathing products.
                        </p>
                        <p className="am-bio">
                            My work spans the <strong>full product lifecycle</strong> — ideating, designing,
                            engineering, and deploying. Based in <strong>India</strong>, open to remote work
                            and collaboration worldwide.
                        </p>
                        <div className="am-quick-tags">
                            <span className="am-tag"><i className="bx bx-map-pin" /> India</span>
                            <span className="am-tag"><i className="bx bx-graduation" /> CS Student</span>
                            <span className="am-tag am-tag-available">
                                <i className="bx bx-circle" /> Available for Freelance
                            </span>
                            <span className="am-tag"><i className="bx bx-world" /> Open to Remote</span>
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div className="am-right">
                        <div className="am-photo-frame">
                            <img src={profileImg} alt="Samarpan Jayswal" className="am-photo" />
                            <div className="am-photo-badge">
                                <i className="bx bx-code-alt" />
                                <span>Full-Stack Engineer</span>
                            </div>
                            <div className="am-photo-deco am-deco-1" />
                            <div className="am-photo-deco am-deco-2" />
                        </div>
                    </div>
                </div>

                {/* ── Achievements Grid ── */}
                <div className="am-achievements-block am-reveal" style={{ '--am-delay': '0.1s' }}>
                    <h3 className="am-sub-heading">
                        <i className="bx bx-medal" /> Achievements &amp; Highlights
                    </h3>
                    <div className="am-achievements-grid">
                        {achievements.map((a, i) => (
                            <div
                                key={a.title}
                                className="am-ach-card"
                                style={{ '--ach-color': a.color, '--ach-delay': `${i * 0.07}s` }}
                            >
                                <div className="am-ach-icon">
                                    <i className={a.icon} />
                                </div>
                                <div className="am-ach-text">
                                    <h4>{a.title}</h4>
                                    <p>{a.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
