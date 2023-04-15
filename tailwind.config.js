/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                black: "#121212",
                darkGrey: "#1a1a1a",
                grey: "#383838",
                fadedGrey: "#636363",
                darkBlue: "#196bde",
                white: "#ffffff",
                searchBarGray: "#464748",
                pullDownGray: "#ebebeb"
            },
            text: {
                sm: "14"
            },
            fontFamily: {
                avantGarde: ["AvantGarde"],
                avantGardeBold: ["AvantGardeBold"]
            }
        }
    },
    plugins: []
};
