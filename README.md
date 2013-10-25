# Save the NBN

- Enter postcode
- See the details of your local member
- Get an example draft of an email to send to the local member

# Developing

Save the NBN scripts use [browserify](http://browserify.org/) and [gel-transform](https://npmjs.org/package/gel-transform)

- NPM install in the scripts folder

    ````
    npm i
    
- NPM install browserifyer

    ````
    npm i -g browserifyer

- Browserify application.js

    ````
    browserify application.js > application.browser.js -t gel-transform

- Compile *.scss using [sass](http://sass-lang.com/)
