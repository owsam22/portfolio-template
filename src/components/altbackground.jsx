import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
    return (
        <StyledWrapper className="section-pattern-bg">
            <div className="pattern-container">
                <div className="pattern-bg">
                    <svg preserveAspectRatio="xMidYMid slice" height="100%" width="100%" className="cube-svg" viewBox="0 0 120 104">
                        <defs>
                            <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="cube-dark">
                                <stop stopColor="#232526" offset="0%" />
                                <stop stopColor="#414345" offset="100%" />
                            </linearGradient>
                            <linearGradient y2="0%" x2="100%" y1="100%" x1="0%" id="cube-mid">
                                <stop stopColor="#4b6cb7" offset="0%" />
                                <stop stopColor="#182848" offset="100%" />
                            </linearGradient>
                            <linearGradient y2="100%" x2="0%" y1="0%" x1="100%" id="cube-light">
                                <stop stopColor="#a8edea" offset="0%" />
                                <stop stopColor="#fed6e3" offset="100%" />
                            </linearGradient>
                        </defs>
                        {/* Adding the isometric cube structure to make the pattern visible */}
                        <g className="cube">
                            <path d="M 60 70 L 0 35 L 60 0 L 120 35 Z" fill="url(#cube-light)" />
                            <path d="M 60 70 L 60 104 L 0 69 L 0 35 Z" fill="url(#cube-dark)" />
                            <path d="M 60 70 L 120 35 L 120 69 L 60 104 Z" fill="url(#cube-mid)" />
                        </g>
                    </svg>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .pattern-container {
    background: #111827; /* Deep professional slate */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }

  .pattern-bg {
    width: 100%;
    height: 100%;
    position: relative;
    background: repeating-linear-gradient(
      135deg,
      #0f172a 0px,
      #0f172a 60px,
      rgba(15, 23, 42, 0.6) 70px,
      #1e293b 130px
    );
  }

  .cube-svg {
    position: absolute;
    width: 151px; /* Scaled up for better presence */
    height: 131px;
    left: 10%;
    top: 20%;
    opacity: 0.4;
    animation: cubeMove 15s ease-in-out infinite alternate;
  }

  @keyframes cubeMove {
    from {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    to {
      transform: translate(2vw, 5vh) rotate(5deg) scale(1.1);
    }
  }`;

export default Pattern;
