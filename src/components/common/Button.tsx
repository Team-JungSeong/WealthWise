import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const getButtonStyles = ($variant: ButtonVariant, theme: any) => {
  const styles = {
    primary: css`
      background-color: ${theme.colors.primary};
      color: white;
      &:hover {
        background-color: ${theme.colors.primary}dd;
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary};
      color: white;
      &:hover {
        background-color: ${theme.colors.secondary}dd;
      }
    `,
    success: css`
      background-color: ${theme.colors.success};
      color: white;
      &:hover {
        background-color: ${theme.colors.success}dd;
      }
    `,
    danger: css`
      background-color: ${theme.colors.danger};
      color: white;
      &:hover {
        background-color: ${theme.colors.danger}dd;
      }
    `,
    warning: css`
      background-color: ${theme.colors.warning};
      color: #333;
      &:hover {
        background-color: ${theme.colors.warning}dd;
      }
    `,
    info: css`
      background-color: ${theme.colors.info};
      color: white;
      &:hover {
        background-color: ${theme.colors.info}dd;
      }
    `,
    light: css`
      background-color: ${theme.colors.light};
      color: #333;
      &:hover {
        background-color: ${theme.colors.light}dd;
      }
    `,
    dark: css`
      background-color: ${theme.colors.dark};
      color: white;
      &:hover {
        background-color: ${theme.colors.dark}dd;
      }
    `,
    link: css`
      background-color: transparent;
      color: ${theme.colors.primary};
      padding: 0;
      &:hover {
        text-decoration: underline;
      }
    `,
  };

  return styles[$variant];
};

const getButtonSize = ($size: ButtonSize, theme: any) => {
  const sizes = {
    sm: css`
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: 0.875rem;
    `,
    md: css`
      padding: ${theme.spacing.sm} ${theme.spacing.md};
      font-size: 1rem;
    `,
    lg: css`
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      font-size: 1.125rem;
    `,
  };

  return sizes[$size];
};

const StyledButton = styled.button<{
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $isFullWidth?: boolean;
  $isLoading?: boolean;
  $icon?: React.ReactNode;
  $iconPosition?: 'left' | 'right';
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${({ $variant = 'primary', theme }) => getButtonStyles($variant, theme)}
  ${({ $size = 'md', theme }) => getButtonSize($size, theme)}
  ${({ $isFullWidth }) => $isFullWidth && css`width: 100%;`}
`;

const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ $position }) => $position === 'right' ? '8px' : '0'};
  margin-right: ${({ $position }) => $position === 'left' ? '8px' : '0'};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isFullWidth={isFullWidth}
      $isLoading={isLoading}
      $icon={icon}
      $iconPosition={iconPosition}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && icon && iconPosition === 'left' && (
        <IconWrapper $position="left">{icon}</IconWrapper>
      )}
      {children}
      {!isLoading && icon && iconPosition === 'right' && (
        <IconWrapper $position="right">{icon}</IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button; 