import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import firebase from 'firebase';
import router from '@/router';
import { vuexfireMutations, firestoreAction } from 'vuexfire'
//import db from '@/firebase/db';


firebase.initializeApp({ //неправильно конечно, потом перенести
    apiKey: "AIzaSyDPn36eJJsBMs9OPcoOT3skEPvHReUtFHA",
    projectId: "sounod-9d7de",
  });
  
  const db = firebase.firestore();


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    videos: [], // это буду использовать для заполнения базы
    userVideos: [], // избранные видео пользователя, возможно не буду использовать
    apiUrl: 'https://www.googleapis.com/youtube/v3/search', // перенести в БД / отдельный файл
    user: null,
    isAuthenticated: false,
    isAdmin: false, // возможно компонент с карточками будем использовать два раза,
                    // видео будут монтироваться (v-if), только если true
    documents: [], // отсюда буду брать для отображения, тупо, но да.
    isUpdated: true, // здесь была идея разгрузить YouTube API, но для этого нужно
                      // использовать FireBase функции, изучение которых отложено
                      // до следующего проекта, либо ближайшего будущего
                      // так что реализация в данном проекте отложена на неопределенный
                      // срок
    flag: true,
  },
  mutations: {
    setUser(state, payload) {
        state.user = payload;
    },
    setIsAuthenticated(state, payload) {
        state.isAuthenticated = payload;
    },
    setVideos(state, payload) {
      state.videos = payload.map(function(obj) { //получаем id видео из объекта, вроде работает
        return {                                    //стоит возвращать объект с нужными нам свойствами: ид, описание, название канала
          videoId: obj.id.videoId,
          videoTitle: obj.snippet.title,
          videoDescription: obj.snippet.description,
          videoThumbnailUrl: obj.snippet.thumbnails.high.url,
        }                       
      });
    },
    setUserVideos(state, payload) {
      state.userVideos = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setDocuments(state, payload){
      state.documents.push( payload );
    },
    setFlag(state) {
      state.flag = false;
    },
    ...vuexfireMutations,
  },
  actions: {
    async getVideos({ state, commit }) { // получаем через YouTube API
      try {
        if (!state.isUpdated){
          let response = await axios.get(`${state.apiUrl}`, {
            params: {
              part: "snippet",
              maxResults: 20,
              order: "relevance",
              q: "Rammstein",
              type: "video",
              key: "AIzaSyAEAfF8AkbxALpBBUmvuGjWl9SJge2Jea0",
            }
          });
        commit('setVideos', response.data.items);
        }
      } catch (error) {
        commit('setVideos', []);
      }
    },
    getDocument( {commit} ) { // получаем инфу из БД
      db.collection('videos')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            commit('setDocuments', doc.data());
        });
    })

    },
    setDocument( {state} ) { // обновляем БД результатми из YouTube API
                             // можно конечно апдейтить документы, а не перезаписывать
                             // но пока это решение подходит
                             // возможно есть вариант обновить сразу всю коллекцию?
      if (!state.isUpdated){
        for (let videoNumber = 0; videoNumber < 20; videoNumber++) {
          db.collection("videos").doc(`video${videoNumber}`).set({
            id: videoNumber,
            videoId: state.videosTest[videoNumber].videoId,
            videoTitle: state.videosTest[videoNumber].videoTitle,
            videoDescription: state.videosTest[videoNumber].videoDescription,
            videoThumbnailUrl: state.videosTest[videoNumber].videoThumbnailUrl,
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        }
      }
    },
    deleteDocument( {}, { delVideo } ) {
      db.collection("videos").doc(`video${delVideo}`).delete().then(function() {
          console.log("Document successfully deleted!");
          console.log(delVideo);
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    },
    userJoin({ commit }, { email, password }) {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
              commit('setUser', user);
              commit('setIsAuthenticated', true);
              router.push('/profile');
          })
          .catch(() => {
              commit('setUser', null);
              commit('setIsAuthenticated', false);
              //router.push('/');
          });
  },
  userLogin({ commit }, { email, password }) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(user => {
        commit('setUser', user);
        commit('setIsAuthenticated', true);
        router.push('/profile');
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(() => {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
        //router.push('/');
      });
      // firebase
      //     .auth()
      //     .signInWithEmailAndPassword(email, password)
      //     .then(user => {
      //         commit('setUser', user);
      //         commit('setIsAuthenticated', true);
      //         router.push('/profile');
      //     })
      //     .catch(() => {
      //         commit('setUser', null);
      //         commit('setIsAuthenticated', false);
      //         //router.push('/');
      //     });
  },
  userSignOut({ commit }) {
      firebase
          .auth()
          .signOut()
          .then(() => {
              commit('setUser', null);
              commit('setIsAuthenticated', false);
              router.push('/');
          })
          .catch(() => {
              commit('setUser', null);
              commit('setIsAuthenticated', false);
              //router.push('/');
          });
  },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
  }    
  }
})