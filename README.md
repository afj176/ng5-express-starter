### About

Angular setup loosely based on [Angular Quickstart](https://github.com/angular/quickstart)

Included in `./public/vendor/`:

* Pre-built ES5 from Angular 2.0.0-alpha.20
  * angular2
  * rtts_assert
  * rx.all.js

* es6-shim (from angular quick start) includes:
  * Traceur
  * ES6 Module Loader
  * System
  * Zone
  * Traceur options for meta-data annotations

### Instructions

install dependencies:

```bash
npm install
``` 

run the app:

```bash
DEBUG=ng2-express-starter:* ./bin/www
``` 

preview app:

```
http://localhost:3000/
```

### Screenshot
=================

![screenshot](https://raw.githubusercontent.com/afj176/ng2-express-starter/master/screenshot.png "Screenshot")