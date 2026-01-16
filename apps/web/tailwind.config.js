/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - modernes et configurables
        primary: {
          DEFAULT: '#2563EB',  // Bleu profond
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF'
        },
        // Secondary colors
        secondary: {
          DEFAULT: '#475569',  // Gris ardoise
          50: '#F8FAFC',
          100: '#F1F5F9',
          500: '#475569',
          600: '#334155',
          700: '#1E293B'
        },
        // Validation states
        valid: {
          DEFAULT: '#10B981',  // Vert émeraude
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669'
        },
        invalid: {
          DEFAULT: '#EF4444',  // Rouge corail
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626'
        },
        // Canvas backgrounds
        canvas: {
          light: '#F8FAFC',    // Blanc cassé
          dark: '#0F172A',     // Charbon
          gridLight: '#E2E8F0', // Grille gris clair
          gridDark: '#1E293B'   // Grille gris foncé
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],           // Interface UI
        mono: ['JetBrains Mono', 'monospace']    // Contenu logique
      }
    }
  },
  plugins: []
}
