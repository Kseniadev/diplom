const presets = [
    [
        "@babel/preset-env",
        {
            targets: { // версии браузеров которые нужно поддерживать
                edge: "15",
                firefox: "60",
                chrome: "64", // yandex browser на базе chrome
                safari: "11.1",
                chromeAndroid: "64"

            },
            useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали выше.
            corejs: "3.1.4", // явно проставить версию corejs
            "targets": { // указать цели, для полифилов
                "esmodules": true, // es модули
                "ie": "11" // Internet Expolrer 11
            }
        },
    ],
];

module.exports = { presets };