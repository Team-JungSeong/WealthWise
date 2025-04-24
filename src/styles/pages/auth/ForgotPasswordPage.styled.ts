import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FormSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Logo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    cursor: pointer;
  }
`;

export const AuthForm = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const FormActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const FormFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const FormLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  flex: 1;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text
  };
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-align: center;
  min-width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : 'transparent'
    };
    transition: background-color 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.success}22;
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

export const ImageSide = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const AuthImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`; 