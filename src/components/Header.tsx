import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import logo from './CHARTlogo.jpg';

const HeaderContainer = styled(motion.header)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-bottom: 1px solid ${props => props.theme.border};
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px ${props => props.theme.shadow};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)<{ theme: any }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-decoration: none;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  display: block;
`;

const NavLinks = styled.div<{ isOpen?: boolean; theme?: any }>`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${props => props.theme.surface};
    padding: 2rem;
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px ${props => props.theme.shadow};
  }
`;

const NavLink = styled(Link)<{ theme: any }>`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ThemeToggle = styled.button<{ theme: any }>`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadowHover};
    background: ${props => props.theme.primaryHover};
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <HeaderContainer theme={theme} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <Nav>
        <Logo to="/" theme={theme} aria-label="CHART homepage" onClick={closeMenu}>
          <LogoImage src={logo} alt="CHART logo" />
        </Logo>
        <NavLinks isOpen={isOpen} theme={theme}>
          <NavLink to="/" theme={theme} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/fullchecklist" theme={theme} onClick={closeMenu}>CHART Checklist</NavLink>
          <NavLink to="/abstractchecklist" theme={theme} onClick={closeMenu}>Abstract Checklist</NavLink>
          <NavLink to="/diagram" theme={theme} onClick={closeMenu}>Methodological Diagram</NavLink>
          <NavLink to="/citation" theme={theme} onClick={closeMenu}>Citation</NavLink>
        </NavLinks>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ThemeToggle onClick={toggleTheme} theme={theme}>
            {isDark ? '☀️' : '🌙'}
          </ThemeToggle>
          <MobileToggle onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </MobileToggle>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
