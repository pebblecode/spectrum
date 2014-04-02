# Spectrum

A sound spectrum visualiser.

By [Mark Durrant](https://twitter.com/m6_d6) and [Tak Tran](https://twitter.com/zlog).

* * *

## Getting started

Install [node](http://nodejs.org/) & [gulp](http://gulpjs.com/)

`brew install node`, `npm install -g gulp`

Install packages

`npm i`

Build assets (only required once)

`gulp build`

Run Gulp
(Starts local server, LiveReload, SASS compilation, JS hinting & minification, image minification)

`gulp`

## Deployment

The site is deployed to heroku at: http://sound-spectrum.herokuapp.com/

To set up deployment

    git remote add production git@heroku.com:sound-spectrum.git

To deploy the master branch

    git push production master

To deploy another branch

    git push production [branch]:master

## Credits

* Heavily based on [arirusso/d3-audio-spectru](https://github.com/arirusso/d3-audio-spectrum)