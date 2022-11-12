/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'test1',
    meta: [{ charset: "utf-8" }]
  },
  loading: false,
  plugins: [
    { ssr: false, src: '@/plugins/vue-native-socket.js' }


  ],
  buildModules: [

  ],
  modules: [
    '@nuxtjs/axios'
  ],
};
