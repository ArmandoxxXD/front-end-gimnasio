// Importar los scripts de Firebase necesarios
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js');

// Inicializar la aplicación Firebase usando tu configuración
firebase.initializeApp({
    apiKey: "AIzaSyDtRPsD502knR9IjeqIeGp-BJo6LpqyScY",
    authDomain: "sga-gimnasio.firebaseapp.com",
    projectId: "sga-gimnasio",
    storageBucket: "sga-gimnasio.appspot.com",
    messagingSenderId: "314789229704",
    appId: "1:314789229704:web:f65a5965610b5446565b3d",
    measurementId: "G-EY48GCR5KT"
});

// Recuperar una instancia de Firebase Messaging para que pueda manejar los eventos en segundo plano
const messaging = firebase.messaging();