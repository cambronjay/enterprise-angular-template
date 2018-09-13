# Angular Application Template for Enterprise

This project uses ngrx for state management and as a functional programming approach to Angular. Also, Angular best practices are baked into the template.

This template has been setup with:

`NGRX DB for offline state persistance`   

`Authentication\Loading guards`

`Angular Material service`

`Lazy loaded components`

`Routing animations`

`Angular Flex-layout`

`Angular Material` 

`Google authentication`

`Custom component generator`

`Responsive design layout for mobile and desktop`

## Helpful resources 

[NGRX Platform](https://github.com/ngrx/platform)

[Angular Material](https://material.angular.io/components/categories)

[Angular Material Icons](https://material.io/icons/)

[Angular Flex-Layout](https://github.com/angular/flex-layout)

[Angular Docs and Setup](https://angular.io/guide/quickstart)

## Custom screen component generator

This generator allows you to create a new screen for your application with its own managed state:

Do not put dashes in the screen name. The generator will add those for you. 

`ng g screen MyScreenName --collection enterprise-angular-generator` 

Next add the navigation item for your new screen to `app/app.component.html`

Next add the route to your lazy loaded module in `app/app.router.ts`

Finally add an interface for your screen state within the interface folder. You should name it `IMyScreenName.interface.ts`

## Working with data

An example utilizing post and get to work with data can be found in `src/common/services/data/enterprise-data.service.ts` and `src/screens/home/state/home.effects.ts`

## Working with Google login

The google login will prompt login and then continue with the normal login flow.

## Serving for development

By default `npm start` will run the development server using the development environment. Other environments can be targeted using:

`npm run serveLocal`

`npm run serveTest`

`npm run serveProd`

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Angular Generators

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` to generate the files you need.

## Component pattern

Every component uses a Observable based pattern to control the flow of data into and out of each component.

The pattern relies on NgRX to manage the state of data within the application and not necessarily the state of each component.

Follow the pattern in `src/screens/home/home.component.ts` or in a newly generated screen to produce a performant application.

## Building for deployment

To build the project for deployment and target environments use these commands:

`npm run buildLocal`

`npm run buildDev`

`npm run buildTest`

`npm run buildProd`

The build artifacts will be stored in the `dist/` directory.

## Project setup

The template allows for a quick and easy project setup.

Navigate to `src/environments` and edit the following environment files:

`environment.local.ts`

`environment.dev.ts`

`environment.test.ts`

`environment.prod.ts`

You only need to edit these properties on those files:

`MVC_URL, API_URL, APP_NAME, APPLICATION_ID, OFFLINE_DATABASE_NAME, EXTERNAL_APP`

Navigate to `config/config.ts` and add object stores to the offline database scheme for use with application state persistance. 

Do not edit the authentication store configuration!

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
