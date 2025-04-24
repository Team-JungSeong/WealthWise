import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

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
const LogoLink = styled(RouterLink)`
  text-decoration: none;
  cursor: pointer;
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

const NavLink = styled(RouterLink)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  transition: all 0.2s ease-in-out;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? "70px" : "0")};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    &:after {
      width: 70px;
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

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
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

const MobileNavLink = styled(RouterLink)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
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

const SecondaryButton = styled(RouterLink)`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin-left: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}11;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin-left: ${({ theme }) => theme.spacing.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger}11;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: "대시보드", path: "/dashboard", requiresAuth: true },
    { name: "학습", path: "/learning", requiresAuth: false },
    { name: "시뮬레이션", path: "/simulations", requiresAuth: false },
    { name: "커뮤니티", path: "/community", requiresAuth: false },
    { name: "전문가", path: "/experts", requiresAuth: false },
  ];

  // 로그인 상태에 따라 표시할 링크 필터링
  const filteredNavLinks = navLinks.filter(link => 
    !link.requiresAuth || (link.requiresAuth && isAuthenticated)
  );

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navigateTo = (path: string) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      window.location.href = path;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigateTo('/');
  };

  return (
    <HeaderContainer>
      <LogoLink to="/" onClick={(e) => {
        e.preventDefault();
        navigateTo("/");
      }}>
        <Logo>WealthWise</Logo>
      </LogoLink>

      <NavLinksContainer>
        {filteredNavLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            $isActive={isActivePath(link.path)}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(link.path);
            }}
          >
            {link.name}
          </NavLink>
        ))}
        
        {isAuthenticated ? (
          <>
            <ActionButton 
              to="/profile" 
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/profile");
              }}
            >
              내 프로필
            </ActionButton>
            <LogoutButton onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          </>
        ) : (
          <>
            <ActionButton 
              to="/login" 
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/login");
              }}
            >
              로그인
            </ActionButton>
            <SecondaryButton 
              to="/signup" 
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/signup");
              }}
            >
              회원가입
            </SecondaryButton>
          </>
        )}
      </NavLinksContainer>

      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </MobileMenuButton>

      <MobileMenu $isOpen={isMobileMenuOpen}>
        {filteredNavLinks.map((link) => (
          <MobileNavLink
            key={link.path}
            to={link.path}
            $isActive={isActivePath(link.path)}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(link.path);
              setIsMobileMenuOpen(false);
            }}
          >
            {link.name}
          </MobileNavLink>
        ))}
        
        {isAuthenticated ? (
          <>
            <MobileNavLink
              to="/profile"
              $isActive={isActivePath("/profile")}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/profile");
                setIsMobileMenuOpen(false);
              }}
            >
              내 프로필
            </MobileNavLink>
            <MobileNavLink
              to="/"
              $isActive={false}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
            >
              로그아웃
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink
              to="/login"
              $isActive={isActivePath("/login")}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              로그인
            </MobileNavLink>
            <MobileNavLink
              to="/signup"
              $isActive={isActivePath("/signup")}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/signup");
                setIsMobileMenuOpen(false);
              }}
            >
              회원가입
            </MobileNavLink>
          </>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
