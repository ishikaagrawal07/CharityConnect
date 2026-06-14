import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "error": "#ba1a1a",
                "secondary-container": "#aeeecb",
                "surface-container": "#eceeed",
                "surface-tint": "#3f6653",
                "surface-variant": "#e1e3e2",
                "on-tertiary-fixed": "#092012",
                "on-secondary-container": "#316e52",
                "on-surface": "#191c1c",
                "on-error-container": "#93000a",
                "tertiary": "#152b1c",
                "background": "#f8faf9",
                "tertiary-fixed-dim": "#b3cdb7",
                "secondary-fixed": "#b1f0ce",
                "on-error": "#ffffff",
                "outline-variant": "#c1c8c2",
                "on-secondary-fixed-variant": "#0e5138",
                "surface-container-lowest": "#ffffff",
                "primary-container": "#1b4332",
                "inverse-on-surface": "#eff1f0",
                "outline": "#717973",
                "primary-fixed": "#c1ecd4",
                "on-surface-variant": "#414844",
                "inverse-primary": "#a5d0b9",
                "on-primary": "#ffffff",
                "on-background": "#191c1c",
                "on-primary-container": "#86af99",
                "surface-container-low": "#f2f4f3",
                "tertiary-container": "#2a4131",
                "on-tertiary-fixed-variant": "#354c3b",
                "tertiary-fixed": "#cee9d3",
                "on-primary-fixed-variant": "#274e3d",
                "inverse-surface": "#2e3131",
                "on-secondary-fixed": "#002114",
                "surface-container-highest": "#e1e3e2",
                "surface-dim": "#d8dada",
                "on-tertiary": "#ffffff",
                "secondary-fixed-dim": "#95d4b3",
                "on-secondary": "#ffffff",
                "primary": "#012d1d",
                "surface": "#f8faf9",
                "error-container": "#ffdad6",
                "surface-bright": "#f8faf9",
                "primary-fixed-dim": "#a5d0b9",
                "on-primary-fixed": "#002114",
                "on-tertiary-container": "#93ad98",
                "secondary": "#2c694e",
                "surface-container-high": "#e6e9e8"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "lg": "48px",
                "container-max": "1200px",
                "gutter": "24px",
                "xl": "80px",
                "xs": "4px",
                "base": "8px",
                "sm": "12px",
                "md": "24px"
            },
            "fontFamily": {
                "headline-md": ["Playfair Display"],
                "label-md": ["Inter"],
                "headline-lg": ["Playfair Display"],
                "display-lg": ["Playfair Display"],
                "body-md": ["Inter"],
                "headline-lg-mobile": ["Playfair Display"],
                "label-sm": ["Inter"],
                "body-lg": ["Inter"]
            },
            "fontSize": {
                "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
                "label-md": ["14px", { "lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "600" }],
                "headline-lg": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
                "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "headline-lg-mobile": ["28px", { "lineHeight": "1.2", "fontWeight": "700" }],
                "label-sm": ["12px", { "lineHeight": "1.4", "fontWeight": "500" }],
                "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
            }
        }
    },
    plugins: [
        forms,
        containerQueries,
    ],
}
