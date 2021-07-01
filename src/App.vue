<template>
  <div class="main">
    <navigation />
    <router-view  v-bind:cities="cities"/>
  </div>
</template>

<script>
import axios from 'axios'
import dB from './firebase/firebaseinit'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      APIkey: 'f05769f10f6b590cd6bc26e2df3d315c',
      cities: []
    }
  },

  created () {
    this.getCityWeather()
  },
  methods: {
    getCityWeather () {
      const firebaseDB = dB.collection('cities')

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&APPID=${this.APIkey}`
              )
              const data = response.data
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data
                })
                .then(() => {
                  this.cities.push(doc.doc.data())
                })
            } catch (err) {
              console.log(err)
            }
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
.main {
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  .container {
    padding: 20px;
  }
}
</style>
