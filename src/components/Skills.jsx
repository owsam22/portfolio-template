import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const Skills = () => {
    const [sectionRef, isSectionVisible] = useScrollReveal({ threshold: 0.1 });
    const [selectedSkill, setSelectedSkill] = useState(null);

    const marqueeRows = [
        {
            direction: 'forward',
            skills: [
                { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', level: 'Expert', experience: '3+ Years', description: 'Advanced knowledge of React hooks, context API, and performance optimization. Built numerous complex SPAs.' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend', level: 'Expert', experience: '4+ Years', description: 'Deep understanding of ES6+, asynchronous programming, and functional paradigms.' },
                { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', level: 'Expert', experience: '5+ Years', description: 'Expertise in semantic HTML, accessibility (A11y), and SEO best practices.' },
                { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend', level: 'Advanced', experience: '2+ Years', description: 'Proficient in building rapid, responsive, and modern UIs using utility-first CSS.' },
                { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', category: 'Frontend', level: 'Advanced', experience: '2+ Years', description: 'State management for large-scale applications using Redux Toolkit and Saga.' },
                { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', level: 'Expert', experience: '5+ Years', description: 'Advanced layout techniques (Flexbox, Grid), animations, and modern CSS features.' },
            ]
        },
        {
            direction: 'reverse',
            skills: [
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', level: 'Advanced', experience: '3+ Years', description: 'Server-side development using Express and NestJS. Scalable microservices architecture.' },
                { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'Backend', level: 'Advanced', experience: '3+ Years', description: 'Building RESTful and GraphQL APIs with robust error handling and middleware.' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', level: 'Advanced', experience: '3+ Years', description: 'NoSQL database design, aggregation pipelines, and performance tuning.' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Database', level: 'Intermediate', experience: '2+ Years', description: 'Relational database management, complex joins, and query optimization.' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Languages', level: 'Intermediate', experience: '2+ Years', description: 'Automation scripts, data analysis, and backend development with Flask/Django.' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Database', level: 'Intermediate', experience: '2+ Years', description: 'Advanced relational data modeling and full-text search capabilities.' },
            ]
        },
        {
            direction: 'forward',
            skills: [
                { name: 'OpenAI API', icon: 'https://img.icons8.com/color/48/chatgpt.png', category: 'AI/ML', level: 'Advanced', experience: '1+ Year', description: 'Integrating LLMs, prompt engineering, and building AI-driven features.' },
                { name: 'NLP', icon: 'https://img.icons8.com/color/48/artificial-intelligence.png', category: 'AI/ML', level: 'Intermediate', experience: '1+ Year', description: 'Natural Language Processing basics, sentiment analysis, and text classification.' },
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'Languages', level: 'Intermediate', experience: '2+ Years', description: 'Object-oriented programming, Spring Boot basics, and enterprise application logic.' },
                { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'Languages', level: 'Intermediate', experience: '2+ Years', description: 'Systems programming, data structures, and algorithmic problem solving.' },
                { name: 'SQL', icon: 'https://img.icons8.com/color/48/sql.png', category: 'Database', level: 'Advanced', experience: '4+ Years', description: 'Expertise in complex queries, indexing, and database schema design.' },
            ]
        },
        {
            direction: 'reverse',
            skills: [
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'DevOps', level: 'Expert', experience: '4+ Years', description: 'Version control mastery, branching strategies (Gitflow), and collaborative workflows.' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'DevOps', level: 'Intermediate', experience: '1+ Year', description: 'Containerization, Docker Compose for local environments, and image optimization.' },
                { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'Design', level: 'Advanced', experience: '2+ Years', description: 'UI/UX design, prototyping, and design system creation.' },
                { name: 'Postman', icon: 'https://img.icons8.com/dusk/48/postman-api.png', category: 'Tools', level: 'Expert', experience: '3+ Years', description: 'API testing, documentation, and automated collection runs.' },
                { name: 'Photoshop', icon: 'https://img.icons8.com/color/48/adobe-photoshop--v1.png', category: 'Creative', level: 'Intermediate', experience: '3+ Years', description: 'Image editing, asset creation, and visual design.' },
            ]
        }
    ];

    const MarqueeRow = ({ skills, direction }) => {
        // Double the skills for seamless loop
        const doubledSkills = [...skills, ...skills];

        return (
            <div className={`marquee-row ${direction === 'reverse' ? 'reverse' : ''}`}>
                <div className="marquee-track">
                    {doubledSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-bubble"
                            onClick={() => setSelectedSkill(skill)}
                        >
                            <img src={skill.icon} alt={skill.name} />
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section
            id="skills"
            className={`section skills-section reveal ${isSectionVisible ? 'active' : ''}`}
            ref={sectionRef}
        >
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>

                <div className="skills-layout-wrapper">
                    <div className="skills-visual">
                        <div className="visual-card glass-card">
                            <img
                                src="https://i.pinimg.com/originals/54/1f/1c/541f1c2e739aac67a89026fe0def22eb.gif"
                                alt="Creative Visual"
                                className="pinterest-gif"
                            />
                            <div className="visual-overlay"></div>
                        </div>
                    </div>

                    <div className="skills-marquee-container">
                        {marqueeRows.map((row, index) => (
                            <MarqueeRow
                                key={index}
                                skills={row.skills}
                                direction={row.direction}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reactive Detail Overlay */}
            <div
                className={`reactive-detail-overlay ${selectedSkill ? 'active' : ''}`}
                onClick={() => setSelectedSkill(null)}
            >
                {selectedSkill && (
                    <div className="detail-content" onClick={(e) => e.stopPropagation()}>
                        <i
                            className="bx bx-x close-detail"
                            onClick={() => setSelectedSkill(null)}
                        ></i>

                        <div className="detail-header">
                            <img src={selectedSkill.icon} alt={selectedSkill.name} className="detail-icon" />
                            <div className="detail-info">
                                <span className="detail-category">{selectedSkill.category}</span>
                                <h2>{selectedSkill.name}</h2>
                            </div>
                        </div>

                        <div className="detail-body">
                            <p>{selectedSkill.description}</p>

                            <div className="skill-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Proficiency</span>
                                    <span className="stat-value">{selectedSkill.level}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Experience</span>
                                    <span className="stat-value">{selectedSkill.experience}</span>
                                </div>
                            </div>

                            <div className="detail-actions">
                                <a 
                                    href="#projects" 
                                    className="see-projects-btn" 
                                    onClick={() => setSelectedSkill(null)}
                                >
                                    <span>Explore Projects</span>
                                    <i className='bx bx-right-arrow-alt'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;

