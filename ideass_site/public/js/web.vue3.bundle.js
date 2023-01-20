
// // Register a global custom directive called `v-focus`
// Vue.directive('focus', {
// 	// When the bound element is inserted into the DOM...
// 	inserted: el => {
// 		el.focus()
// 	}
// })

// import Vue from 'vue/dist/vue.js'
// import VueRouter from 'vue-router/dist/vue-router.js'
// Vue.use(VueRouter) 
// console.log('pepe')
// // if you are using library directly from CDN
// // just don't forget to access default prop
// // https://unpkg.com/vue-draggable@1.0.9/lib/vue-draggable.js
// // Vue.use(VueDraggable.default)
// import VueDraggable from 'vue-draggable'
// Vue.use(VueDraggable)

// import User from './app/components/User.vue'
// Vue.component('User', User)

// import User2 from './app/components/User2.vue'
// Vue.component('User2', User2)

// import Buefy from 'buefy'
// Vue.use(Buefy)
// import List from './List.vue'
// Vue.component('List', List)
// import List2 from './List2.vue'
// Vue.component('List2', List2)
// import RelationshipsGratis from './RelationshipsGratis.vue'
// Vue.component('RelationshipsGratis', RelationshipsGratis)

// // Register a global custom directive called `v-focus`
// Vue.directive('focus', {
// 	// When the bound element is inserted into the DOM...
// 	inserted: function (el) {
// 		// Focus the element
// 		el.focus()
// 	}
// })

// // window.frappe.ready(() => {
// // Vue.prototype.DFP = window.DFP
// // Vue.prototype.__ = window.__
// // Vue.prototype.frappe = window.frappe
// // Vue.prototype.Tools = Tools
// let vueapp = new Vue({ router: new VueRouter({
// 	scrollBehavior: (to, from, savedPosition) => false
// })}).$mount('#vue2-app')
// console.log('inicializada?!', vueapp)
// // new Vue({ el: '#aef-app' })
// // })


// // // Instantiate Vue app
// // const app = new Vue({
// // 	el: '#vue2-app',
// // 	// vuetify: new Vuetify(),
// // 	components: {
// // 		List,
// // 		List2,
// // 		RelationshipsGratis,
// // 	},
// // })

// VUE 3

// import { createApp } from 'vue'
import { createApp, configureCompat } from '@vue/compat'
configureCompat({ RENDER_FUNCTION: false })

import Test from './Test.vue'

import App from './App.vue'

const app_v3 = createApp(App)
.component('Test', Test)
.mount('#app')

// app_v3.config.errorHandler = (err, instance, info) => {
// 	// handle error, e.g. report to a service
// 	alert('error config override!')
// }
