<template>
<div class="component-user m-3">
	<div class="row">
		<div class="col-md-8">
			<div class="fade-wrapper">
				<transition name="fade">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</transition>
			</div>
		</div>
		<div class="col-md-4">
			<user-side :user="user" :list="list"></user-side>
		</div>
	</div>
	<!-- <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;"> -->
		<!-- Position it -->
		<div style="position: fixed; top: 10px; right: 10px;">

			<!-- Then put toasts within -->
			<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
				<!-- <div class="toast-header">
					<img src="..." class="rounded mr-2" alt="...">
					<strong class="mr-auto">Bootstrap</strong>
					<small class="text-muted">just now</small>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div> -->
				<div class="toast-body">
					See? Just like this.
				</div>
			</div>

			<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
				<!-- <div class="toast-header">
					<img src="..." class="rounded mr-2" alt="...">
					<strong class="mr-auto">Bootstrap</strong>
					<small class="text-muted">2 seconds ago</small>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div> -->
				<div class="toast-body">
					Heads up, toasts will stack automatically
				</div>
			</div>
		</div>
	<!-- </div> -->
</div>
</template>

<script>

import Route404 from './Route404.vue'
import UserSide from './UserSide.vue'
import RouteUserHome from './RouteUserHome.vue'
import RouteUserOther from './RouteUserOther.vue'

import Nedb from 'nedb/browser-version/out/nedb'

import { Observable } from '../../classes/Observers'


function afterSerialization(a) {
	// console.log('afterSerialization: ', a)
	return a
}
function beforeDeserialization(a) {
	// console.log('beforeDeserialization: ', a)
	return a
}

const DB = new Nedb({
	filename: 'jaime_a',
	afterSerialization: afterSerialization,
	beforeDeserialization: beforeDeserialization,
})

// You need to load each database (here we do it asynchronously)
DB.loadDatabase(() => { console.log('loaded jaime_A')})



// import sjcl from 'sjcl/sjcl'
// console.log(sjcl)
// // http://bitwiseshiftleft.github.io/sjcl/
// // http://bitwiseshiftleft.github.io/sjcl/demo/


import { default as CryptoJS } from 'crypto-js/index.js' 
// console.log(CryptoJS.HmacSHA1("Message", "Key"));

// // Encrypt
// let ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString()
 
// // Decrypt
// let bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123')
// let originalText = bytes.toString(CryptoJS.enc.Utf8)

// console.log(originalText)


// DB.find({planeta: 'Tierra'}, function (err, doc) {
// 	if (doc == null) {
// 		console.log('NO existe aún')
// 		DB.insert({ planeta: 'Tierra' }, function (err) {
// 			console.log('insertado')
// 		})
// 	} else {
// 		console.log('existía!!')
// 	}
// 	// console.log(err, doc)
// 	// docs contains the two planets Earth and Mars
// })

class Tools {

	/**
	 * @param {Object[]} objects_array Objects array
	 * @param {string} field_name Field name
	 * @param {any} field_value Field value
	 */
	static getIndexByPropertyValue(objects_array, field_name, field_value) {
		for (let i=0; i < objects_array.length ; ++i) {
			if (objects_array[i][field_name] == field_value) {
				return i
			}
		}
		return -1
	}
}


class User {
	constructor() {
		this._crypt_key = 'hola'
		this._crypt_key_1 = ''
	}

	set crypt_key(value) {
		this._crypt_key = value
	}
	get crypt_key() {
		return this._crypt_key
	}
	set crypt_key_1(value) {
		this._crypt_key_1 = value
	}
	get crypt_key_1() {
		return this._crypt_key_1
	}

	encrypt(content) {
		let encrypted = ''
		if (this.crypt_key && content) {
			encrypted = CryptoJS.AES.encrypt(content, this.crypt_key).toString()
			// TODO: si hay contenido y no devuelve encriptado notificar como error y guardar el contenido original
		}
		return encrypted
	}

	decrypt(content) {
		let decrypted = ''
		if (this.crypt_key && content) {
			let bytes = CryptoJS.AES.decrypt(content, this.crypt_key)
			decrypted = bytes.toString(CryptoJS.enc.Utf8)
		}
		return decrypted
	}
}


const ITEM_META = {
	encrypted: false,
	trashed: false,
	// type: 'text', //
	// geo: null,
	// tags: [],
	version: 0,
}


class Item {
	constructor(data) {
		this._observableOnChange = new Observable()
		this._meta = Object.assign({}, ITEM_META, data._meta || {})
		this._session = {
			decrypted: false,
			content_decrypted: null,
		}
		this._id = data._id || null
		this._title = data.title || ''
		this._content = data.content || ''
		this._observableOnChange.setState('*')
	}

	/**
	 * 	new Observer(this.pledge.observableOnChange).subscribe(changed => {
			if (changed === 'months_frequency' || changed === 'programs') {
				tax_relief_recalculate()
			}
		})
		...
		this._observableOnChange.setState('*')
	*/
	get observableOnChange() {
		return this._observableOnChange
	}

	set title(value) {
		console.log('set title: ', value)
		this._title = value
		this._observableOnChange.setState('title', value)
	}
	get title() {
		return this._title
	}

	set content(value) {
		console.log('set content: ', value)
		// debugger
		if (value && this.isEncrypted() && this.isSessionDecrypted() && USER && USER._crypt_key) {
			console.log('ENCRIPTAR!!!')
			this._content = USER.encrypt(value)
			this._session.content_decrypted = value
		} else {
			this._content = value
		}
		this._meta.version += 1
		this._observableOnChange.setState('content', value)
	}
	get content() {
		// debugger
		if (this._content && this.isEncrypted() && this.isSessionDecrypted() && this._session.content_decrypted != null) {
			console.log('DECRYPT-ED!!!')
			return this._session.content_decrypted
		} else 
		if (this._content && this.isEncrypted() && this.isSessionDecrypted() && this._session.content_decrypted == null && USER && USER._crypt_key) {
			console.log('DECRYPT!!!')
			const decrypted = USER.decrypt(this._content)
			this._session.content_decrypted = decrypted
			return decrypted
		} else {
			return this._content
		}
	}

	isEncrypted() {
		return Boolean(this._meta.encrypted)
	}

	isSessionDecrypted() {
		return Boolean(this._session.decrypted)
	}

	sessionEncryptedView() {
		if (this.isEncrypted()) {
			this._session.decrypted = true
		}
	}

	sessionEncryptedUnview() {
		if (this.isEncrypted() && this.isSessionDecrypted()) {
			this._session.decrypted = false
			this._session.content_decrypted = null
		}
	}

	getObjectToSave() {
		return {
			title: this._title,
			content: this._content,
			_meta: this._meta,
		}
	}
}


class List {
	constructor() {
		// super()
		this.items = []
		this.trashed_counter = 0
		this.session_decrypted_all = false
		this._trashed_visible = false
		this.load()
	}

	get trashed_visible() {
		return this._trashed_visible
	}
	set trashed_visible(value) {
		this._trashed_visible = value
	}

	add(data={}) {
		let item = new Item(data)
		DB.insert(item.getObjectToSave(), (err, doc_inserted) => {
			console.log('insertado', doc_inserted)
			let item = new Item(doc_inserted)
			this.items.unshift(item)
			// this.items.push(item)
		})
	}

	update(item) {
		DB.update({ _id: item._id }, item.getObjectToSave(), {}, function() {
			console.log('item actualizado en bd')
		})
	}

	encrypt(item) {
		let encrypted = USER.encrypt(item.content)
		item.content = encrypted
		item._meta.encrypted = true
		this.update(item)
		this.session_decrypted_all = false
	}

	decrypt(item) {
		if (!item.isEncrypted()) {
			return false
		}
		if (item.isSessionDecrypted() && item._session.content_decrypted != null) {
			item._session.decrypted = false
			item._session.content_decrypted = null
		}
		let decrypted = USER.decrypt(item.content)
		if (decrypted) {
			item.content = decrypted
		}
		item._meta.encrypted = false
		this.update(item)
	}

	remove(item) {
		this.removeById(item._id)
	}

	trash(item) {
		item._meta.trashed = true
		this.trashed_counter += 1
		this.update(item)
	}

	untrash(item) {
		item._meta.trashed = false
		this.trashed_counter -= 1
		this.update(item)
	}

	trashEmpty() {
		function notDeleted(item) {
			return !item._meta.trashed
		}
		this.items = this.items.filter(notDeleted)
		DB.remove({ '_meta.trashed': true }, { multi: true }, (err, number_removed) => {
			this.trashed_counter = 0
			alert(`removed ${number_removed} items!`)
		})
	}

	removeById(id) {
		let idx = Tools.getIndexByPropertyValue(this.items, '_id', id)
		DB.remove({ _id: id }, {}, (err, numRemoved) => {
			this.items.splice(idx, 1)
		})
	}

	load() {
		DB.find({}, (err, docs) => {
			for (let idx in docs) {
				let item = new Item(docs[idx])
				if (docs[idx]._meta.trashed) {
					this.trashed_counter += 1
				}
				this.items.push(item)
			}
		})
	}

	compactList() {
		DB.persistence.compactDatafile()
	}

	sessionEncryptedViewAll() {
		for (let idx in this.items) {
			this.items[idx].sessionEncryptedView()
		}
		this.session_decrypted_all = true
	}

	sessionEncryptedUnviewAll() {
		for (let idx in this.items) {
			this.items[idx].sessionEncryptedUnview()
		}
		this.session_decrypted_all = false
	}

}


const USER = new User()
const LIST  = new List()


const props = {
}


const data = function() {
	let data = {}
	data.user = USER
	data.list = LIST
	return data
}


const watch = {
	$route(to, from) {
		// Update top menu active option for new route
		// frappe.make_navbar_active()
	}
}


const computed = {
}


const methods = {
}


const beforeCreate = function() {
}


const created = function() {
	// this.user.dataLoad()
	const routes = [
		{ name: 'home', path: '/', component: RouteUserHome, props: { user: this.user, list: this.list } },
		{ name: 'other', path: '/other', component: RouteUserOther, props: { user: this.user, list: this.list } },
		{ name: '404', path: '*', component: Route404 },
	]
	this.$router.addRoutes(routes)
}


const mounted = function() {
}


const components = {
	UserSide,
}


// module.exports = {
export default {
	name: 'User',
	props,
	data,
	watch,
	computed,
	methods,
	beforeCreate,
	created,
	mounted,
	components,
}

</script>

<style lang="scss" scoped>
	// @import "../../../scss/variables.scss";
</style>

<style lang="scss">
	// @import "../../../scss/variables.scss";
</style>
