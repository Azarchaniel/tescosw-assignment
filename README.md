# TescoSW assignment - Weather forecast application

Weather forecast application create as an assignment for a JavaScript developer role in TescoSW.\
Allow user to see weather forecast for the five days (min/avg/max temperature, humidity, wind speed and direction, sunrise, sunset).\
The city for the forecast can be chosen either with autocomplete or with geolocation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run lint`

Apply ESLint rules on the whole project, or use flag `--fix` to fix the issues.

## Folder structure
```
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── Autocomplete.tsx
│   │   ├── SingleDayWeatherCard.tsx
│   │   ├── Spinner.tsx         //loading spinner
│   │   └── WeatherChart.tsx
│   ├── data
│   │   └── city.list.json      //data
│   ├── pages                           
│   │   └── MainWeather.tsx     //main page of app
│   ├── types
│   │   └── types.tsx           //global types and interfaces
│   ├── utils
│   │   └── utils.tsx           //functions used in app
│   ├── App.scss                //main CSS file
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .env
├── .env.example
├── .env.local
├── .eslintrc.json              //ESLint rules and settings
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

### Supported browsers
Chrome 64+\
Firefox 63+\
Safari 12+\
Edge 79+ (Chromium-based)

## Author
[Lubos Csonka](https://www.linkedin.com/in/%C4%BEubo%C5%A1-csonka-1443aa136/)
