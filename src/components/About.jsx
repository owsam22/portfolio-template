import { useEffect, useState, useRef } from 'react';
import './About.css';
import main from '../assets/main.png';

// --- Animated Counter Hook/Component ---
const AnimatedNumber = ({ value, duration = 1200, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const elementRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Extract numerical part from string value if necessary (e.g., "50+" -> 50)
    const target = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : (typeof value === 'number' ? value : 0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out quad function
                        const easeProgress = progress * (2 - progress);
                        const currentCount = Math.floor(easeProgress * target);

                        setDisplayValue(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setDisplayValue(target);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <span ref={elementRef} className="animated-num">
            {displayValue}{suffix}
        </span>
    );
};

const About = () => {
    const [githubData, setGithubData] = useState({
        repos: 0,
        contributions: '0',
        joined: '--',
        avatarUrl: '',
        languages: [],
        lastPulse: { name: '', date: '' }
    });

    useEffect(() => {
        const fetchGitHubData = async () => {
            const CACHE_KEY = 'github_stats_cache_v3';
            const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

            try {
                // Check Cache
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                        setGithubData(parsed.data);
                        return;
                    }
                }

                // 1. Fetch User Profile
                const profileRes = await fetch('https://api.github.com/users/owsam22', {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                });
                if (!profileRes.ok) throw new Error('Profile fetch failed');
                const profile = await profileRes.json();

                // 2. Fetch Detailed Contributions
                const statusRes = await fetch('https://github-contributions-api.jogruber.de/v4/owsam22');
                if (!statusRes.ok) throw new Error('Stats fetch failed');
                const stats = await statusRes.json();

                // 3. Fetch Repositories for Languages
                const reposRes = await fetch('https://api.github.com/users/owsam22/repos?sort=updated&per_page=100', {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                });
                if (!reposRes.ok) throw new Error('Repos fetch failed');
                const repos = await reposRes.json();

                // Process Data
                const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                });

                // Real Total Contributions
                const totalContribs = Object.values(stats.total).reduce((a, b) => a + b, 0);
                const roundedContribs = Math.floor(totalContribs / 10) * 10;

                // Aggregate Languages
                const langMap = {};
                repos.forEach(repo => {
                    if (repo.language) {
                        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                    }
                });

                const sortedLangs = Object.entries(langMap)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([name, count]) => ({
                        name,
                        percent: Math.round((count / (repos.length || 1)) * 100)
                    }));

                const lastUpdatedRepo = repos[0];
                const lastPulse = lastUpdatedRepo ? {
                    name: lastUpdatedRepo.name,
                    date: new Date(lastUpdatedRepo.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })
                } : { name: 'N/A', date: 'N/A' };

                const freshData = {
                    repos: profile.public_repos || 0,
                    contributions: roundedContribs.toString(),
                    joined: joinedDate,
                    avatarUrl: profile.avatar_url,
                    languages: sortedLangs,
                    lastPulse: lastPulse
                };

                setGithubData(freshData);
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: freshData
                }));

            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                // Fallback to minimal state if no cache exists
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    setGithubData(JSON.parse(cached).data);
                }
            }
        };


        fetchGitHubData();

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => revealElements.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <section id="about" className="section about-section">
            <div className="container">
                {/* GitHub Impact Section - Deep Metrics */}
                <div className="github-impact reveal">
                    <div className="section-header center">
                        <h2 className="section-title">
                            <i className='bx bxl-github-fill'></i>
                            Engineering Momentum
                        </h2>
                        <p className="section-subtitle">Real-time technical footprint and repository architecture.</p>
                    </div>

                    <div className="github-lux-container glass-card">
                        {/* Header Stats */}
                        <div className="github-lux-header">
                            <div className="github-profile-brief">
                                <div className="profile-icon-wrapper">
                                    {githubData.avatarUrl ? (
                                        <img src={githubData.avatarUrl} alt="owsam22" className="profile-avatar" />
                                    ) : (
                                        <i className='bx bxl-github-fill profile-icon'></i>
                                    )}
                                </div>
                                <div className="profile-text">
                                    <h4>owsam22</h4>
                                    <p className="profile-meta">System Architect</p>
                                </div>
                            </div>
                            <div className="main-stat-badge">
                                <span className="stat-value">
                                    <AnimatedNumber value={githubData.repos} />
                                </span>
                                <span className="stat-label">Total Repos</span>
                            </div>
                        </div>

                        {/* Top Languages Distribution */}
                        <div className="github-languages-section">
                            <div className="lang-header">
                                <span className="lang-title">Tech Stack Distribution</span>
                                <div className="lang-legend">
                                    {githubData.languages.map(lang => (
                                        <div key={lang.name} className="legend-item">
                                            <span className="dot" data-lang={lang.name}></span>
                                            <span className="name">{lang.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="language-bar">
                                {githubData.languages.map((lang, index) => (
                                    <div
                                        key={lang.name}
                                        className="lang-segment"
                                        style={{ width: `${lang.percent}%` }}
                                        data-lang={lang.name}
                                        title={`${lang.name}: ${lang.percent}%`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Compact Stats Grid */}
                        <div className="github-lux-grid dual-col">
                            <div className="lux-stat-item">
                                <span className="lux-label">Engineering Effort</span>
                                <span className="lux-value">
                                    <AnimatedNumber value={githubData.contributions} suffix="+" />
                                </span>
                            </div>
                            <div className="lux-stat-item">
                                <span className="lux-label">System Member Since</span>
                                <span className="lux-value small">{githubData.joined}</span>
                            </div>
                        </div>

                        {/* Restored Contribution Graph */}
                        <div className="github-lux-graph">
                            <div className="graph-label">
                                <i className='bx bx-pulse'></i>
                                <span>Core Contribution Stream</span>
                            </div>
                            <div className="graph-scroll-container">
                                <img
                                    src="https://ghchart.rshah.org/3cf82f6/owsam22"
                                    alt="GitHub Contribution Graph"
                                    className="contribution-img"
                                />
                            </div>
                        </div>



                        {/* Activity & Actions Wrapper */}
                        <div className="github-activity-footer">
                            <div className="last-pulse-card">
                                <div className="pulse-indicator">
                                    <span className="pulse-dot"></span>
                                    <span className="pulse-label">Last Pulse</span>
                                </div>
                                <div className="pulse-content">
                                    <span className="repo-name">{githubData.lastPulse.name}</span>
                                    <span className="update-date">Updated on {githubData.lastPulse.date}</span>
                                </div>
                            </div>

                            <div className="github-action-grid">
                                <a href="https://github.com/owsam22/portfolio" target="_blank" rel="noopener noreferrer" className="gh-action-btn star-btn">
                                    <i className='bx bx-star'></i> Star Portfolio
                                </a>
                                <a href="https://github.com/owsam22" target="_blank" rel="noopener noreferrer" className="gh-action-btn follow-btn">
                                    <i className='bx bx-user-plus'></i> Follow on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-divider reveal">
                    <span className="divider-line"></span>
                    <h3 className="about-me-title">The Blueprint</h3>
                    <span className="divider-line"></span>
                </div>

                {/* Balanced 3-Column Bento Grid */}
                <div className="bento-grid-v2">
                    {/* Bio Card - Wide & Impactful */}
                    <div className="bento-card-v2 bio-card-v2 reveal">
                        <div className="card-header">
                            <i className='bx bx-terminal'></i>
                            <span>Developer Profile</span>
                        </div>
                        <div className="card-content">
                            <h3>Architecting Digital Excellence</h3>
                            <p>
                                I'm Samarpan, a Full-Stack Developer dedicated to building <strong>high-performance</strong> software that bridges the gap between complex backend logic and intuitive user experiences.
                            </p>
                        </div>
                    </div>

                    {/* Profile Card - Tall & Visual */}
                    <div className="bento-card-v2 profile-card-v2 reveal">
                        <div className="image-wrapper">
                            <img src={main} alt="Samarpan" />
                            <div className="profile-overlay">
                                <h4>Samarpan</h4>
                                <span className="status-badge">System: Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stacks Card - Square */}
                    <div className="bento-card-v2 tech-card-v2 reveal">
                        <div className="card-header">
                            <i className='bx bx-code-alt'></i>
                            <span>Tech Stack</span>
                        </div>
                        <div className="tech-mini-grid">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                        </div>
                    </div>

                    {/* Impact Card - Square */}
                    <div className="bento-card-v2 impact-card-v2 reveal">
                        <div className="card-header">
                            <i className='bx bx-trending-up'></i>
                            <span>Scale</span>
                        </div>
                        <div className="impact-stats-v2">
                            <div className="stat-group">
                                <span className="stat-val">
                                    <AnimatedNumber value={50} suffix="+" />
                                </span>
                                <span className="stat-lab">Projects</span>
                            </div>
                            <div className="stat-group">
                                <span className="stat-val">
                                    <AnimatedNumber value={99} suffix="%" />
                                </span>
                                <span className="stat-lab">Uptime</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Inspiration Card - Filled space */}
                    <div className="bento-card-v2 visual-card-v2 reveal">
                        <div className="visual-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800")' }}></div>
                        <div className="visual-overlay">
                            <i className='bx bx-landscape'></i>
                        </div>
                    </div>

                    {/* Philosophy Card - Wide & Centered */}
                    <div className="bento-card-v2 philosophy-card-v2 reveal">
                        <div className="philosophy-v2">
                            <i className='bx bxs-quote-alt-left quote-icon'></i>
                            <blockquote className="philosophy-quote">"Architecture is the art of organizing complexity to reveal simplicity."</blockquote>
                            <p className="philosophy-footer">The Core Principle</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
