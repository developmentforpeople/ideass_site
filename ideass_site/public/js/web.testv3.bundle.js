
// // Register a global custom directive called `v-focus`
// Vue.directive('focus', {
// 	// When the bound element is inserted into the DOM...
// 	inserted: el => {
// 		el.focus()
// 	}
// })

// import Vue from 'rollup-plugin-vue'
// vue(.runtime).esm-bundler.js
// import vue from 'vue/dist/vue.esm-bundler.js'
// vue.runtime.global.js
// import Vue from 'vue/dist/vue.runtime.esm-bundler'
// import Vue from 'vue/dist/vue.runtime.esm-browser'
// import Vue from 'vue/dist/vue.esm-browser'
// import Vue from 'vue/dist/vue.global'

// import Vue from 'vue/dist/vue.js'
// import VueRouter from 'vue-router/dist/vue-router.js'
// import * from 'vue'
// import Vue from "vue/dist/vue.esm-bundler.js";
// import Vue from "vue/dist/vue.esm.js"


// import Vue from 'vue' 
// /node_modules/vue/dist/vue.runtime.global.js
// import Vue from 'vue/dist/vue.runtime.global'
// vue.esm-bundler.js
// import Vue from 'vue/dist/vue.esm-bundler'

// import IMask from '../node_modules/imask'
// import { DFP } from '../../../../ae_site/ae_site/public/js/DFP'

// import Vue from 'vue'
// import Vue from '../../../../ideass_site/node_modules/vue'
// import Vue from '@vue/dist/vue.esm.js'
// import Vue from '@vue'
// import Vue from 'vue/dist/vue.esm-bundler.js'
// import Vue from 'vue/dist/vue.js'
// import Vue from "vue/dist/vue.esm.js"


// import { createApp } from 'vue'
import { createApp, configureCompat } from '@vue/compat'
// import { createApp } from 'vue/dist/vue.esm-bundler';
configureCompat({ RENDER_FUNCTION: false })


// // import Vue from 'vue/dist/vue.js'
// import VueRouter from 'vue-router/dist/vue-router.js'
// // Vue.use(VueRouter) 
// console.log('pepe')
// // if you are using library directly from CDN
// // just don't forget to access default prop
// // https://unpkg.com/vue-draggable@1.0.9/lib/vue-draggable.js
// // Vue.use(VueDraggable.default)
// import VueDraggable from 'vue-draggable'
// // Vue.use(VueDraggable)

// import User from './app/components/User.vue'
// // Vue.component('User', User)

// import User2 from './app/components/User2.vue'
// // Vue.component('User2', User2)

// // import Buefy from 'buefy'
// // Vue.use(Buefy)
// import List from './List.vue'
// // Vue.component('List', List)
// import List2 from './List2.vue'
// // Vue.component('List2', List2)
// import RelationshipsGratis from './RelationshipsGratis.vue'
// // Vue.component('RelationshipsGratis', RelationshipsGratis)

import Test from './Test.vue'

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

// const router = new VueRouter({
// 	scrollBehavior: (to, from, savedPosition) => false
// })
// const edp_app = createApp({
// 	// data() {
// 	// 	return {
// 	// 		message: 'Hello Vue!'
// 	// 	}
// 	// }
// 	}) 
// 	// .use([router, VueDraggable])
// 	.use(router)
// 	.use(VueDraggable)
// 	.component('User', User)
// 	.component('User2', User2)
// 	.component('Test', Test)
// 	.component('List', List)
// 	.component('List2', List2)
// 	.component('RelationshipsGratis', RelationshipsGratis)
// 	.directive('focus', {
// 		// When the bound element is inserted into the DOM...
// 		inserted: function (el) {
// 			// Focus the element
// 			el.focus()
// 		}
// 	})
// 	.mount('#vue2-app')

// // Instantiate Vue app
// const app_v2 = new Vue({
// 	el: '#app',
// 	// vuetify: new Vuetify(),
// 	components: {
// 		List,
// 		List2,
// 		RelationshipsGratis,
// 	},
// })


import App from './App.vue'

const app_v3 = createApp(App)
.component('Test', Test)
.mount('#app')
// app.config.errorHandler = (err) => {
// 	/* handle error */
// 	console.log('ERROR CAPTURADO: ', err)
// }
