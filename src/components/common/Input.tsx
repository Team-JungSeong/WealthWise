import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "outlined" | "filled" | "underlined";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isFullWidth?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const getInputSize = ($size: InputSize, theme: any) => {
  const sizes = {
    sm: css`
      height: 32px;
      padding: 0 ${theme.spacing.sm};
      font-size: 0.875rem;
    `,
    md: css`
      height: 40px;
      padding: 0 ${theme.spacing.md};
      font-size: 1rem;
    `,

    lg: css`
      height: 48px;
      padding: 0 ${theme.spacing.lg};
      font-size: 1.125rem;
    `,
  };

  return sizes[$size];
};

const getInputVariant = (
  $variant: InputVariant,
  theme: any,
  $hasError: boolean
) => {
  const errorColor = theme.colors.danger;
  const borderColor = $hasError ? errorColor : theme.colors.border;
  const focusBorderColor = $hasError ? errorColor : theme.colors.primary;

  const variants = {
    outlined: css`
      border: 1px solid ${borderColor};
      background-color: transparent;

      &:focus {
        border-color: ${focusBorderColor};
        box-shadow: 0 0 0 1px ${focusBorderColor};
      }
    `,
    filled: css`
      border: none;
      background-color: ${$hasError ? `${errorColor}11` : theme.colors.light};

      &:focus {
        box-shadow: 0 0 0 1px ${focusBorderColor};
      }
    `,
    underlined: css`
      border: none;
      border-bottom: 1px solid ${borderColor};
      border-radius: 0;
      background-color: transparent;

      &:focus {
        border-bottom-color: ${focusBorderColor};
      }
    `,
  };

  return variants[$variant];
};

const Container = styled.div<{ $isFullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "auto")};
`;

const Label = styled.label<{ $size: InputSize }>`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ $size }) =>
    $size === "sm" ? "0.75rem" : $size === "md" ? "0.875rem" : "1rem"};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
`;

const StyledInput = styled.input<{
  $size: InputSize;
  $variant: InputVariant;
  $hasError: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease-in-out;
  outline: none;
  // width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text}88;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $size, theme }) => getInputSize($size, theme)}
  ${({ $variant, theme, $hasError }) =>
    getInputVariant($variant, theme, $hasError)}

  ${({ $hasLeftIcon }) =>
    $hasLeftIcon &&
    css`
      padding-left: 40px;
    `}

  ${({ $hasRightIcon }) =>
    $hasRightIcon &&
    css`
      padding-right: 40px;
    `}
`;

const HelperText = styled.p<{ $isError: boolean }>`
  margin: ${({ theme }) => `${theme.spacing.xs} 0 0`};
  font-size: 0.75rem;
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : `${theme.colors.text}88`};
`;

const IconWrapper = styled.div<{ $position: "left" | "right" }>`
  position: absolute;
  top: 0;
  ${({ $position }) => ($position === "left" ? "left: 12px;" : "right: 12px;")}
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => `${theme.colors.text}88`};
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      isFullWidth = false,
      size = "md",
      variant = "outlined",
      leftIcon,
      rightIcon,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const hasError = !!errorText;
    const helpText = errorText || helperText;

    return (
      <Container $isFullWidth={isFullWidth}>
        {label && <Label $size={size}>{label}</Label>}

        {leftIcon && <IconWrapper $position="left">{leftIcon}</IconWrapper>}

        <StyledInput
          ref={ref}
          $size={size}
          $variant={variant}
          $hasError={hasError}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon || isLoading}
          aria-invalid={hasError}
          {...props}
        />

        {(rightIcon || isLoading) && (
          <IconWrapper $position="right">
            {isLoading ? <LoadingSpinner /> : rightIcon}
          </IconWrapper>
        )}

        {helpText && <HelperText $isError={hasError}>{helpText}</HelperText>}
      </Container>
    );
  }
);

Input.displayName = "Input";

export default Input;
