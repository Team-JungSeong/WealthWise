export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    light: string;
    dark: string;
    background: string;
    text: string;
    border: string;
  };
  fonts: {
    primary: string;
    heading: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    circle: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

const theme: Theme = {
  colors: {
    primary: "#3A7A41",
    secondary: "#82D878",
    success: "#2E7D32",
    warning: "#FFC107",
    danger: "#E64A19",
    info: "#2196F3",
    light: "#F5F5F5",
    dark: "#333333",
    background: "#FFFFFF",
    text: "#333333",
    border: "#E0E0E0",
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    circle: "50%",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    md: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    lg: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    xl: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
};

export default theme; 