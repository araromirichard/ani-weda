<template>
  <v-app>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import dB from './firebase/firebaseinit'

export default {
  name: 'App',

  data () {
    return {
      APIkey: 'f05769f10f6b590cd6bc26e2df3d315c'
    }
  },

  created () {
    this.getCityWeather()
  },
  methods: {
    getCityWeather () {
      const firebaseDB = dB.collection('cities')

      firebaseDB.onSnapshot(snap => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metrics&APPID=${this.APIkey}`)
              const data = response.data
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data
              }).then(() => {
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
