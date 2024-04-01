// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiRestURL:'http://localhost:8080',
  apiRestURLPagos:'http://localhost:3001/api',
  firebaseConfig : {
    apiKey: "AIzaSyDtRPsD502knR9IjeqIeGp-BJo6LpqyScY",
    authDomain: "sga-gimnasio.firebaseapp.com",
    projectId: "sga-gimnasio",
    storageBucket: "sga-gimnasio.appspot.com",
    messagingSenderId: "314789229704",
    appId: "1:314789229704:web:f65a5965610b5446565b3d",
    measurementId: "G-EY48GCR5KT"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.