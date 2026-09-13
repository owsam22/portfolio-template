import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Loader from './Loader';
import './Projects.css';

const GITHUB_USERNAME = 'owsam22';
const CARDS_PER_PAGE = 3;

const Projects = () => {
    const [activeTab, setActiveTab] = useState('top');
    const [isTabSwitching, setIsTabSwitching] = useState(false);

    // Top Projects state (from JSON)
    const [topProjects, setTopProjects] = useState([]);
    const [topLoading, setTopLoading] = useState(true);
    const [topError, setTopError] = useState(null);

    // GitHub repos state (from API)
    const [githubRepos, setGithubRepos] = useState([]);
    const [githubLoading, setGithubLoading] = useState(true);
    const [githubError, setGithubError] = useState(null);
    const [githubPage, setGithubPage] = useState(1);
    const [githubExpanding, setGithubExpanding] = useState(false);

    // Show more for top projects
    const [showAllTop, setShowAllTop] = useState(false);
    const [topExpanding, setTopExpanding] = useState(false);

    const [sectionRef, isSectionVisible] = useScrollReveal({ threshold: 0.05 });
    const currentYear = new Date().getFullYear();

    // Fetch top projects from JSON
    useEffect(() => {
        const fetchTopProjects = async () => {
            try {
                setTopLoading(true);
                const response = await fetch('/projects.json');
                if (!response.ok) throw new Error('Failed to load projects');
                const data = await response.json();
                setTopProjects(data.projects || []);
                setTopError(null);
            } catch (err) {
                setTopError(err.message);
                console.error('Error loading projects:', err);
            } finally {
                setTopLoading(false);
            }
        };
        fetchTopProjects();
    }, []);

    // Fetch GitHub repos
    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                setGithubLoading(true);
                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`
                );
                if (!response.ok) throw new Error('Failed to load GitHub repos');
                const data = await response.json();
                const filtered = data
                    .filter(repo => !repo.fork)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setGithubRepos(filtered);
                setGithubError(null);
            } catch (err) {
                setGithubError(err.message);
                console.error('Error loading GitHub repos:', err);
            } finally {
                setGithubLoading(false);
            }
        };
        fetchGithubRepos();
    }, []);

    const handleTabChange = (tab) => {
        if (tab === activeTab) return;
        setIsTabSwitching(true);
        setTimeout(() => {
            setActiveTab(tab);
            setIsTabSwitching(false);
        }, 300);
    };

    const handleTopExpand = () => {
        setTopExpanding(true);
        setTimeout(() => {
            setShowAllTop(true);
            setTopExpanding(false);
        }, 800);
    };

    const handleGithubShowMore = () => {
        setGithubExpanding(true);
        setTimeout(() => {
            setGithubPage(prev => prev + 1);
            setGithubExpanding(false);
        }, 800);
    };

    // Language color mapping
    const langColors = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
        HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', 'C++': '#f34b7d',
        C: '#555555', Shell: '#89e051', Ruby: '#701516', Go: '#00ADD8',
        Rust: '#dea584', PHP: '#4F5D95', 'Jupyter Notebook': '#DA5B0B',
        Vue: '#41b883', Dart: '#00B4AB', Kotlin: '#A97BFF', Swift: '#F05138',
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 30) return `${diffDays}d ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
        return `${Math.floor(diffDays / 365)}y ago`;
    };

    // Visible items
    const visibleTop = showAllTop ? topProjects : topProjects.slice(0, CARDS_PER_PAGE);
    const maxGithubVisible = githubPage * CARDS_PER_PAGE;
    const visibleGithub = githubRepos.slice(0, maxGithubVisible);
    const hasMoreGithub = githubRepos.length > maxGithubVisible;
    // After showing 12 (2 pages), show "View Complete on GitHub" instead
    const showViewAllGithub = githubPage >= 2 && hasMoreGithub;

    return (
        <section
            id="projects"
            className={`section projects-section reveal ${isSectionVisible ? 'active' : ''}`}
            ref={sectionRef}
        >
            <div className="container projects-container">
                {/* === SECTION HEADER + TABS === */}
                <div className="projects-hero-header">
                    <span className="projects-badge">
                        <i className='bx bx-briefcase-alt-2'></i> Portfolio Showcase {currentYear}
                    </span>
                    <h2 className="projects-main-title">Crafted with Purpose</h2>
                    <p className="projects-main-subtitle">
                        From full-stack applications to creative experiments — each project represents a unique challenge solved with modern technologies.
                    </p>

                    {/* Filter Tabs */}
                    <div className="projects-tabs">
                        <button
                            className={`projects-tab ${activeTab === 'top' ? 'active' : ''}`}
                            onClick={() => handleTabChange('top')}
                        >
                            <i className='bx bx-star'></i> Top Projects
                        </button>
                        <button
                            className={`projects-tab ${activeTab === 'github' ? 'active' : ''}`}
                            onClick={() => handleTabChange('github')}
                        >
                            <i className='bx bxl-github'></i> GitHub
                        </button>
                    </div>
                </div>

                {/* === TAB CONTENT === */}
                <div className={`tab-content ${isTabSwitching ? 'switching' : ''}`}>

                    {/* ---- TOP PROJECTS TAB ---- */}
                    {activeTab === 'top' && (
                        <>
                            {topLoading && (
                                <div className="panel-state">
                                    <Loader />
                                    <p className="panel-state-text">Loading projects...</p>
                                </div>
                            )}

                            {topError && (
                                <div className="panel-state error">
                                    <i className='bx bx-error-circle'></i>
                                    <p className="panel-state-text">Error: {topError}</p>
                                </div>
                            )}

                            {!topLoading && !topError && (
                                <>
                                    {isTabSwitching ? (
                                        <div className="selection-loader-container">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <div className="projects-grid top-projects-grid">
                                            {visibleTop.map((project, index) => (
                                                <div
                                                    key={project.id}
                                                    className="top-project-card"
                                                    style={{ '--card-index': index % CARDS_PER_PAGE }}
                                                >
                                                    {/* Image Preview */}
                                                    {project.image && (
                                                        <div className="top-card-image">
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="top-card-body">
                                                        <div className="top-card-header">
                                                            <h4 className="top-card-title">{project.title}</h4>
                                                            <div className="top-card-actions">
                                                                {project.github && (
                                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="top-card-link" title="View Code">
                                                                        <i className='bx bxl-github'></i>
                                                                    </a>
                                                                )}
                                                                {project.demo && (
                                                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="top-card-link primary" title="Live Preview">
                                                                        <i className='bx bx-link-external'></i>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="top-card-desc">{project.description}</p>
                                                        {project.tech && (
                                                            <div className="top-card-tech">
                                                                {project.tech.map((t, i) => (
                                                                    <span key={i} className="tech-tag">{t}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Show More / Less for Top */}
                                    {topProjects.length > CARDS_PER_PAGE && !isTabSwitching && (
                                        <div className="panel-expand-wrapper">
                                            {!showAllTop ? (
                                                topExpanding ? (
                                                    <Loader />
                                                ) : (
                                                    <button className="panel-expand-btn" onClick={handleTopExpand}>
                                                        <span>Show More</span>
                                                        <i className='bx bx-chevron-down'></i>
                                                    </button>
                                                )
                                            ) : (
                                                <button className="panel-expand-btn" onClick={() => {
                                                    setShowAllTop(false);
                                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                                }}>
                                                    <span>Show Less</span>
                                                    <i className='bx bx-chevron-up'></i>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* ---- GITHUB TAB ---- */}
                    {activeTab === 'github' && (
                        <>
                            {githubLoading && (
                                <div className="panel-state">
                                    <Loader />
                                    <p className="panel-state-text">Fetching repositories...</p>
                                </div>
                            )}

                            {githubError && (
                                <div className="panel-state error">
                                    <i className='bx bx-error-circle'></i>
                                    <p className="panel-state-text">Could not load GitHub repos. Please try again later.</p>
                                </div>
                            )}

                            {!githubLoading && !githubError && (
                                <>
                                    {isTabSwitching ? (
                                        <div className="selection-loader-container">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <div className="projects-grid github-repos-grid">
                                            {visibleGithub.map((repo, index) => (
                                                <a
                                                    key={repo.id}
                                                    className="github-repo-card"
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ '--card-index': index % CARDS_PER_PAGE }}
                                                >
                                                    <div className="repo-card-top">
                                                        <div className="repo-icon">
                                                            <i className='bx bx-git-repo-forked'></i>
                                                        </div>
                                                        <span className="repo-updated">{formatDate(repo.updated_at)}</span>
                                                    </div>
                                                    <h4 className="repo-name">{repo.name}</h4>
                                                    <p className="repo-desc">
                                                        {repo.description || 'No description provided.'}
                                                    </p>
                                                    <div className="repo-meta">
                                                        {repo.language && (
                                                            <span className="repo-lang">
                                                                <span
                                                                    className="lang-dot"
                                                                    style={{ background: langColors[repo.language] || '#8b949e' }}
                                                                ></span>
                                                                {repo.language}
                                                            </span>
                                                        )}
                                                        <span className="repo-stat">
                                                            <i className='bx bx-star'></i> {repo.stargazers_count}
                                                        </span>
                                                        <span className="repo-stat">
                                                            <i className='bx bx-git-repo-forked'></i> {repo.forks_count}
                                                        </span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* GitHub Show More / View All on GitHub */}
                                    {!isTabSwitching && (
                                        <div className="panel-expand-wrapper">
                                            {showViewAllGithub ? (
                                                <a
                                                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="github-view-all-btn"
                                                >
                                                    <i className='bx bxl-github'></i>
                                                    <span>View Complete on GitHub</span>
                                                    <i className='bx bx-link-external'></i>
                                                </a>
                                            ) : hasMoreGithub ? (
                                                githubExpanding ? (
                                                    <Loader />
                                                ) : (
                                                    <button className="panel-expand-btn" onClick={handleGithubShowMore}>
                                                        <span>Show More</span>
                                                        <i className='bx bx-chevron-down'></i>
                                                    </button>
                                                )
                                            ) : null}
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
