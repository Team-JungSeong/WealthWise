import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const NavLinksContainer = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(RouterLink)<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.text
  };
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  transition: all 0.2s ease-in-out;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ isActive }) => (isActive ? '20px' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in-out;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &:after {
      width: 20px;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavLink = styled(RouterLink)<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.text
  };
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  padding: ${({ theme }) => theme.spacing.md};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

const ActionButton = styled(RouterLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin-left: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: '홈', path: '/' },
    { name: '대시보드', path: '/dashboard' },
    { name: '학습', path: '/learning' },
    { name: '시뮬레이션', path: '/simulations' },
    { name: '커뮤니티', path: '/community' },
    { name: '전문가', path: '/experts' },
  ];
  
  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <HeaderContainer>
      <Logo>WealthWise</Logo>
      
      <NavLinksContainer>
        {navLinks.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            isActive={isActivePath(link.path)}
          >
            {link.name}
          </NavLink>
        ))}
        <ActionButton to="/profile">내 프로필</ActionButton>
      </NavLinksContainer>
      
      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        {navLinks.map((link) => (
          <MobileNavLink 
            key={link.path} 
            to={link.path} 
            isActive={isActivePath(link.path)}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </MobileNavLink>
        ))}
        <MobileNavLink 
          to="/profile" 
          isActive={isActivePath('/profile')}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          내 프로필
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 