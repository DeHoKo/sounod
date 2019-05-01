// // Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: 'MY PROJECT ID' })
//   .firestore()

// // Export types that exists in Firestore
// export { TimeStamp, GeoPoint } = firebase.firestore

// // if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })

// это пока не надо конечо, потом отсюда в index.js перекинуть, и импортировать в store
// import firebase from 'firebase';

// firebase.initializeApp({ //неправильно конечно, потом перенести
//     apiKey: "AIzaSyDPn36eJJsBMs9OPcoOT3skEPvHReUtFHA",
//     authDomain: "sounod-9d7de.firebaseapp.com",
//     projectId: "sounod-9d7de",
//   });
  
//   var db = firebase.firestore();