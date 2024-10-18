const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ["./src/**/*.{js,mjs,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-none': {
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        'display': 'none'
                    }
                }
            })
        })
    ],
}
