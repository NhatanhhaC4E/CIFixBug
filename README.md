# Nano React App Default Javascript Template

The default template project for [nano-react-app](https://github.com/nano-react-app/nano-react-app).

``````
## Adding styles

npm install --save styled-components

``````

"scripts": {
  "start": "vite",
  "build": "vite build",
  "predeploy": "rm -rf dist && vite build",
  "deploy": "gh-pages -d dist"
},
``````

Then follow the normal procedure in GitHub Pages and select the `gh-pages` branch.
