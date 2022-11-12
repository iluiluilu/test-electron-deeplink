<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-logo">
        <img style="max-width: 100%;" src="~assets/electron-nuxt.png">
      </div>
      <div class="e-nuxt-system-info">
        <system-information />
      </div>
    </div>
    <div class="e-nuxt-links">
      <div class="e-nuxt-button" @click="openURL('https://github.com/michalzaq12/electron-nuxt')">
        Github
      </div>
      <div class="e-nuxt-button" @click="openURL('https://nuxtjs.org/guide')">
        Nuxt.js
      </div>
      <div class="e-nuxt-button" @click="openURL('https://electronjs.org/docs')">
        Electron.js
      </div>
      <div class="e-nuxt-button" @click="initWs()">
        Init ws
      </div>
    </div>
  </div>
</template>

<script>
import SystemInformation from '@/components/SystemInformation.vue'

export default {
  name: 'IndexPage',
  components: {
    SystemInformation
  },
  data () {
    return {
      externalContent: ''
    }
  },
  mounted() {
    this.$axios.get('https://api.locker.io/v3/cystack_platform/pm/users/me')
  },
  methods: {
    openURL (url) {
      window.open(url)
    },
    initWs () {
      const token ='cs.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibGluaG50NDExKzIyMkBnbWFpbC5jb20iLCJjcmVhdGVkX3RpbWUiOjE2NjU0Nzc4MDEsImV4cGlyZWRfdGltZSI6MTY2NTQ5MjIwMSwidG9rZW5fdHlwZSI6ImF1dGhlbnRpY2F0aW9uIiwic2NvcGUiOiJwd2RtYW5hZ2VyIn0.74Qt7jOQ38EmZ6DSEtD6wN0Y2A08f-oCrKIxi_I_qqk'
      this.$connect(`wss://api.locker.io/ws/cystack_platform/pm/sync?token=${token}`, {
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 60,
        reconnectionDelay: 3000
      })
      this.$options.sockets.onmessage = message => {
        const data = JSON.parse(message.data)
        console.log('data', data)
        switch (data.event) {
          case 'sync':
            console.log('socket sync')
            // this.getSyncData()
            // this.getShareInvitations()
            // this.getMyShares()
            break
          // case 'members':
          //   this.getInvitations()
          //   break
          case 'emergency_access':
            console.log('socket emergency_access')
            // this.getEmergencyAccessInvitations()
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo{
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 100px 0;
  display: flex;
  justify-content: center;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15px;
  font-size: 1rem;
}

.e-nuxt-button:hover{
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
