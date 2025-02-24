

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1372px',
            '2xl': '1372px',
        },
        extend: {
            colors: {
                main: "#e95211"
            }
        }
    },
    plugins: [
        // require('daisyui'),
    ],
}