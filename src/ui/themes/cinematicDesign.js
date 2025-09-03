// 🎬 AURA AI - CINEMATIC DESIGN SYSTEM
// Modern design system with glass morphism and 3D depth effects

export const CINEMATIC_COLORS = {
  // Core Dark Theme - Deep Space Aesthetic
  dark: {
    // Background layers - Multiple depth levels
    bg: {
      primary: '#0a0a0a',      // Deepest black
      secondary: '#111111',    // Card backgrounds  
      tertiary: '#1a1a1a',    // Elevated surfaces
      glass: 'rgba(17, 17, 17, 0.8)', // Glass morphism
      glassBright: 'rgba(255, 255, 255, 0.05)', // Light glass
    },
    
    // Text hierarchy
    text: {
      primary: '#ffffff',      // Pure white
      secondary: '#a1a1aa',    // Muted white
      tertiary: '#71717a',     // Subtle text
      accent: '#14b8a6',       // Teal accent
      gold: '#fbbf24',         // Premium gold
    },
    
    // Accent colors - Sophisticated palette
    accent: {
      primary: '#14b8a6',      // Electric teal
      secondary: '#22c55e',    // Sophisticated green
      tertiary: '#64748b',     // Elegant slate
      danger: '#ef4444',       // Critical red
      warning: '#f59e0b',      // Amber warning
      success: '#10b981',      // Success green
    },
    
    // Border system
    border: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      strong: 'rgba(255, 255, 255, 0.3)',
      accent: 'rgba(20, 184, 166, 0.5)',
    }
  }
};

export const CINEMATIC_GRADIENTS = {
  // Glass morphism gradients
  glass: {
    primary: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    secondary: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(34,197,94,0.05) 100%)',
    tertiary: 'linear-gradient(135deg, rgba(100,116,139,0.1) 0%, rgba(71,85,105,0.05) 100%)',
  },
  
  // Accent gradients - Ultra modern
  accent: {
    primary: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)',
    secondary: 'linear-gradient(135deg, #64748b 0%, #14b8a6 100%)',
    tertiary: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
    gold: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  },
  
  // Background gradients - Cinematic depth
  background: {
    primary: 'radial-gradient(ellipse at center, rgba(20,184,166,0.1) 0%, rgba(10,10,10,1) 70%)',
    secondary: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
    mesh: `
      radial-gradient(at 40% 20%, rgba(20,184,166,0.3) 0px, transparent 50%),
      radial-gradient(at 80% 0%, rgba(34,197,94,0.2) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(100,116,139,0.2) 0px, transparent 50%),
      radial-gradient(at 80% 50%, rgba(20,184,166,0.1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(34,197,94,0.2) 0px, transparent 50%),
      radial-gradient(at 80% 100%, rgba(20,184,166,0.1) 0px, transparent 50%),
      radial-gradient(at 0% 0%, rgba(100,116,139,0.2) 0px, transparent 50%)
    `,
  }
};

export const CINEMATIC_SHADOWS = {
  // Glass morphism shadows
  glass: {
    sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  
  // Neon glows - Cyberpunk aesthetic
  glow: {
    teal: '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3), 0 0 60px rgba(20, 184, 166, 0.1)',
    green: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1)',
    gold: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)',
    white: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.1)',
  },
  
  // Depth shadows
  depth: {
    floating: '0 32px 64px rgba(0, 0, 0, 0.5), 0 16px 32px rgba(0, 0, 0, 0.3)',
    elevated: '0 16px 32px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)',
    raised: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.15)',
  }
};

export const CINEMATIC_TYPOGRAPHY = {
  fonts: {
    display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", monospace',
    accent: '"Orbitron", "SF Pro Display", system-ui, sans-serif', // Futuristic font
  },
  
  scale: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  }
};

export const CINEMATIC_ANIMATIONS = {
  // Micro-interactions
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  
  // Easing curves - Premium feel
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    apple: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)', // Signature easing
  },
  
  // Signature animations
  float: {
    keyframes: {
      '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
      '50%': { transform: 'translateY(-10px) rotateX(5deg)' },
    },
    duration: '6s',
    iterationCount: 'infinite',
    easing: 'ease-in-out',
  },
  
  pulse: {
    keyframes: {
      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
      '50%': { opacity: 0.8, transform: 'scale(1.05)' },
    },
    duration: '2s',
    iterationCount: 'infinite',
    easing: 'ease-in-out',
  },
  
  glow: {
    keyframes: {
      '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(20, 184, 166, 0.5))' },
      '50%': { filter: 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.8))' },
    },
    duration: '3s',
    iterationCount: 'infinite',
    easing: 'ease-in-out',
  },
  
  shimmer: {
    keyframes: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    duration: '2s',
    iterationCount: 'infinite',
    easing: 'linear',
  }
};

export const CINEMATIC_SPACING = {
  // 4px grid system for precision
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
};

export const CINEMATIC_BORDERS = {
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    '4xl': '2rem',    // 32px
    full: '9999px',
  }
};

// Cinematic Theme Creator - The main function
export const createCinematicTheme = (mode = 'dark', variant = 'default') => {
  const colors = CINEMATIC_COLORS[mode];
  
  return {
    // Core theme data
    mode,
    variant,
    
    // Color system
    colors,
    gradients: CINEMATIC_GRADIENTS,
    shadows: CINEMATIC_SHADOWS,
    
    // Typography
    typography: CINEMATIC_TYPOGRAPHY,
    
    // Layout
    spacing: CINEMATIC_SPACING,
    borders: CINEMATIC_BORDERS,
    
    // Motion
    animations: CINEMATIC_ANIMATIONS,
    
    // Component styles - Glass morphism system
    components: {
      card: {
        primary: `
          background: ${CINEMATIC_GRADIENTS.glass.primary};
          backdrop-filter: blur(20px);
          border: 1px solid ${colors.border.subtle};
          box-shadow: ${CINEMATIC_SHADOWS.glass.md};
        `,
        secondary: `
          background: ${CINEMATIC_GRADIENTS.glass.secondary};
          backdrop-filter: blur(16px);
          border: 1px solid ${colors.border.subtle};
          box-shadow: ${CINEMATIC_SHADOWS.glass.sm};
        `,
        elevated: `
          background: ${CINEMATIC_GRADIENTS.glass.primary};
          backdrop-filter: blur(24px);
          border: 1px solid ${colors.border.medium};
          box-shadow: ${CINEMATIC_SHADOWS.glass.lg};
        `,
      },
      
      button: {
        primary: `
          background: ${CINEMATIC_GRADIENTS.accent.primary};
          color: white;
          border: none;
          box-shadow: ${CINEMATIC_SHADOWS.glow.teal};
          backdrop-filter: blur(8px);
        `,
        secondary: `
          background: ${CINEMATIC_GRADIENTS.glass.primary};
          color: ${colors.text.primary};
          border: 1px solid ${colors.border.medium};
          backdrop-filter: blur(16px);
        `,
        ghost: `
          background: transparent;
          color: ${colors.text.secondary};
          border: 1px solid ${colors.border.subtle};
          backdrop-filter: blur(8px);
        `,
      },
      
      input: {
        primary: `
          background: ${CINEMATIC_GRADIENTS.glass.primary};
          color: ${colors.text.primary};
          border: 1px solid ${colors.border.subtle};
          backdrop-filter: blur(16px);
        `,
        focused: `
          background: ${CINEMATIC_GRADIENTS.glass.secondary};
          border: 1px solid ${colors.accent.primary};
          box-shadow: ${CINEMATIC_SHADOWS.glow.teal};
        `,
      }
    },
    
    // Utility classes for easy usage
    utils: {
      glassMorphism: 'backdrop-blur-xl bg-white/10 border border-white/20',
      textGradient: 'bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent',
      neonGlow: 'shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70 transition-shadow duration-300',
      floating: 'animate-float transform-gpu',
      shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]',
    }
  };
}

// Export default cinematic theme
export default createCinematicTheme();
