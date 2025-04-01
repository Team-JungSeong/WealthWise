import React from 'react';
import styled, { css } from 'styled-components';

type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  isHoverable?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
}

const getCardVariantStyles = ($variant: CardVariant, theme: any) => {
  const variants = {
    default: css`
      background-color: ${theme.colors.background};
    `,
    outlined: css`
      background-color: ${theme.colors.background};
      border: 1px solid ${theme.colors.border};
    `,
    elevated: css`
      background-color: ${theme.colors.background};
      box-shadow: ${theme.shadows.md};
    `,
  };

  return variants[$variant];
};

const CardContainer = styled.div<{
  $variant: CardVariant;
  $isHoverable: boolean;
  $isFullWidth: boolean;
  $isClickable: boolean;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  ${({ $variant, theme }) => getCardVariantStyles($variant, theme)}
  ${({ $isFullWidth }) => $isFullWidth && css`width: 100%;`}
  ${({ $isHoverable, theme }) => $isHoverable && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
  ${({ $isClickable }) => $isClickable && css`
    cursor: pointer;
  `}
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} 0`};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const CardSubtitle = styled.p`
  margin: ${({ theme }) => `${theme.spacing.xs} 0 0`};
  color: ${({ theme }) => theme.colors.text}aa;
  font-size: 0.875rem;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.md} ${theme.spacing.md}`};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  variant = 'default',
  className,
  isHoverable = false,
  isFullWidth = false,
  onClick,
}) => {
  const hasHeader = title || subtitle;

  return (
    <CardContainer
      $variant={variant}
      $isHoverable={isHoverable}
      $isFullWidth={isFullWidth}
      $isClickable={!!onClick}
      className={className}
      onClick={onClick}
    >
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card; 