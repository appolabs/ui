import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

export const appolabsUIPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Appo brand colors
        appo: {
          accent: {
            DEFAULT: 'var(--appo-accent)',
            light: 'var(--appo-accent-light)',
            dark: 'var(--appo-accent-dark)',
          },
          purple: {
            400: 'var(--appo-purple-400)',
            500: 'var(--appo-purple-500)',
            600: 'var(--appo-purple-600)',
            700: 'var(--appo-purple-700)',
          },
        },
        // Glass colors
        glass: {
          DEFAULT: 'var(--glass-bg)',
          subtle: 'var(--glass-bg-subtle)',
          elevated: 'var(--glass-bg-elevated)',
          border: 'var(--glass-border)',
          'border-subtle': 'var(--glass-border-subtle)',
          foreground: 'hsl(var(--glass-foreground))',
          'foreground-muted': 'hsl(var(--glass-foreground-muted))',
        },
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
        'glass-strong': 'var(--glass-blur-strong)',
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        'glass-elevated': 'var(--glass-shadow-elevated)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(138, 158, 255, 0.3), 0 0 40px rgba(167, 139, 250, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(138, 158, 255, 0.5), 0 0 80px rgba(167, 139, 250, 0.3)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        gradient: 'gradient-shift 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default appolabsUIPreset;
