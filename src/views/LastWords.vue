<template>
  <div class="container">
    <a-input
      style="width: auto; flex: 1;"
      v-model="secret"
      type="text"
      placeholder="Please input secret"
    />

    <a-button @click="decrypt">Go</a-button>
    <div class="info">{{ decrpyted }}</div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

function decrypt({ content, secret }) {
  try {
    const decipher = CryptoJS.AES.decrypt(content, secret)
    console.log('decipher', decipher.toString(CryptoJS.enc.Utf8))
    return decipher.toString(CryptoJS.enc.Utf8)
  } catch (err) {
    console.log(err)
    return 'wrong secret'
  }
}
export default {
  data() {
    return {
      secret: '',
      decrpyted: ''
    }
  },
  methods: {
    decrypt() {
      const { decrpyted } = this.$route.query
      if (!decrpyted || !this.secret) {
        return 'decrpyted and secret is required'
      }
      this.decrpyted = decrypt({
        content: CryptoJS.enc.Base64.parse(
          decodeURIComponent(decrpyted)
        ).toString(CryptoJS.enc.Utf8),
        secret: this.secret
      })
    }
  }
}
</script>
