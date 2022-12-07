# React Exchange calculator 🚀

![App preview](https://i.imgur.com/ykxy81Z.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before start

The app should build without errors using `node v14`.

The app uses [https://openexchangerates.org/](https://openexchangerates.org/) api in order to fetch real time currency exchange rates.
In order to make it work you have to create an account @openexchangerates.org and obtain free API key `APP_ID` and use it as environment variable:

1. In root directory copy `.env` file and rename it to: `.env.local`
2. Save your api key as `REACT_APP_APP_ID` environment variable

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

_(you can also use `npm run start` command to start the app)_
