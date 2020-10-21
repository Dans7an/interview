This project was built, using software specifications from a code challenge posted by the host of the "Frontend Developers of North NJ" Meetup.com group, in September 2020.

Submitted to the host's GitHub repo: https://github.com/bellagrunt/interview/tree/master/Frontend/mconcepcion

This project was started using the [Create React App](https://github.com/facebook/create-react-app) Node.js package.

## Overview

The "MovieCheck" app loads a list of popular movies from the [Movie Database API](https://www.themoviedb.org/) for users to interact with.

Clicking on a movie poster in the list will bring up the selected movie's details in a modal window. Clicking anywhere in the viewport will close the modal for the user to view the movie list.

Users are also able to click on the "<" (previous page) and ">" (next page) on the top and the bottom of the list to refresh the list with the previous or next 20 movies in the list. Users cannot click on the "previous page" button if the movie list is currently showing the first page of hits. The "next page" button is disabled if the user is viewing the last page in the list (the default page limit is set to 500).

## Original Project Requirements

Taken from the "README.md" file from the code challenge repo:

### Project

Build a small web app using the Movie Database API (https://developers.themoviedb.org).

### Minimum viable product

When first loaded, the user should see a list of the most popular movies (see https://developers.themoviedb.org/3/movies/get-popular-movies). A user can click on any movie in the list and view more details for the movie.

### Requirements

This app should query the Movie DB API and return the results to the user. Develop your UI using your frontend technologies of choice. UX Polish. This is not a design exercise, but your app should demonstrate mastery of your frontend toolset. Include a README.md with step-by-step instructions for running the app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
