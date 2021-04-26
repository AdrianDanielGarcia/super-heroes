# SuperHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Github Pages running app

[click here to open the Github pages working app](https://adriandanielgarcia.github.io/super-heroes/)

## Running the app using Docker

* Clone the repo
* Run `docker build -t super-heroes-multistage-image . ` to generate the image
* Run `❯ docker run --name super-heroes-multistage-container -d -p 8888:80 super-heroes-multistage-image` to generate and run the container
* Navigate to `http://localhost:8888`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
