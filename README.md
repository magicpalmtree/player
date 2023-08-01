# PDQ Player 
## Pretty Damn Quick Player for Interactr

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Testing out projects
To test and debug a project we need to ensure the dataSource and projectId are set in the index.html page
```
window.dataSource = 'api'; // Get the project data from the api
window.projectId = 16625; // Enter project ID here to get
```
Then start up the app server 
````
npm run serve
````
This allows us to debug inside the video player iFrame and gives us better access to the Vue components and state props. However as we're working 
inside the iframe sometimes it maybe required to debug from the top level to manage iframe issues. This can be done using endpoints in the api and can be
found in the api repo api.php.

Because when the player is built we only build and push the JS and CSS to s3 the index.html file is never actually used in production so we can leave the dataSource and projectId's
set when building for production and it wont affect the production build.

