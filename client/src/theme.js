// Color tokens for grey and primary shades
export const colorTokens = {
  grey: {
    // Grey shades from 0 to 1000
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    // Primary shades from 50 to 900
    50: "#FFE9D5",
    100: "#FFD1AB",
    200: "#FFB97F",
    300: "#FFA154",
    400: "#FF8A28",
    500: "#FFA500",
    600: "#DB7C00",
    700: "#B75500",
    800: "#933E00",
    900: "#701700",
  },
};

// Function to generate theme settings based on the mode (light or dark)
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Dark mode color settings
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // Light mode color settings
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      // Font family and size settings
      fontFamily: ["Playfair", "serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Playfair Display", "serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
