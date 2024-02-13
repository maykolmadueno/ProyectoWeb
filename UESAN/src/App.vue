<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

import emailjs from 'emailjs-com';
emailjs.init('PmuKtwr3ZVQyknhyR');

export default defineComponent({
  name: 'App'
})
</script>
