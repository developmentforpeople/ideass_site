<template>
<div class="component-user2 m-3">
	<div>
		<a href="#" @click.prevent="add()">add</a> | 
		<a href="#" @click.prevent="items_manager.save()">save</a> | 
		<a href="#" @click.prevent="items_manager.trashEmpty()">im.trashEmpty</a> | 
		<a href="#" @click.prevent="items_manager.deleteAll()">im.deleteAll (Warning!)</a> | 
	</div>
	<div class="row">
		<div class="col-12">
			<template v-for="item in items_manager.items">
				<item2 
					:item="item"
					:items_manager="items_manager"
					:key="item._id"
					></item2>
			</template>
		</div>
	</div>
</div>
</template>

<script>


import Item2 from './Item2.vue'


class Tools {
	static uniqueId() {
		return Date.now().toString(36) + Math.random().toString(36).substr(2)
	}

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

	static arrayMoveElement(arr, from_index, to_index) {
		let element = arr[from_index]
		arr.splice(from_index, 1)
		arr.splice(to_index, 0, element)
	}
}


class Persistence {
	constructor(id) {
		this._id = id
		this._data = []
	}

	load() {
		// Desencriptar?!
		this.setJSON(localStorage ? localStorage.getItem(this._id) : null)
	}
	save() {
		// Encriptar?!
		localStorage && localStorage.setItem(this._id, this.getJSON())
	}
	setArray(array) {
		this._data = array
	}
	setJSON(json) {
		this._data = json ? JSON.parse(json) : []
	}
	getArray() {
		return this._data
	}
	getJSON() {
		return JSON.stringify(this._data)
	}
}


class ItemsManager {
	constructor(persistence) {
		this._items = []
		this._item_dragged = null
		this._persistence = persistence
		this._autosave_execute = false
		this._loaded_successfully = false

		window.addEventListener('keyup', () => {
			this._autosave_execute = true
		})
		window.addEventListener('focusout', () => {
			console.log('window.focusout')
		})
		setInterval(() => {
			if (this._autosave_execute) {
				this.save()
				this._autosave_execute = false
			}
		}, 5000)
	}

	get items() {
		console.log('ItemsManager() get items')
		return this._items
	}

	getParentIdDeepLevels(parent_id) {
		let deep_level = 0
		let _checkParentIdDeep = parent_id => {
			let idx = Tools.getIndexByPropertyValue(this._items, '_id', parent_id)
			return idx > -1 ? this._items[idx].parent_id : null
		}
		while (parent_id) {
			deep_level++
			parent_id = _checkParentIdDeep(parent_id)
		}
		return deep_level
	}

	// Items "movement"
	push(item, trigger_save=true) {
		this._items.push(item)
		if (trigger_save) {
			this._autosave_execute = true
		}
	}
	splice(...args) {
		this._items.splice(...args)
		this._autosave_execute = true
	}

	load() {
		console.log('ItemsManager.load()')
		try {
			this._persistence.load()
			let original = this._persistence.getArray()
			original.forEach(element => {
				let obj = new Item()
				obj.assignData(element)
				this.push(obj, false)
			})
			this._loaded_successfully = true
		} catch (error) {
			console.log(error)
			throw('Error cargando!')
		}
	}

	save() {
		console.log('ItemsManager.save()')
		if (!this._loaded_successfully) {
			throw('Not saved because it was not loaded properly')
		}
		this._persistence.setArray(this._items)
		this._persistence.save()
	}

	deleteAll() {
		this._items = []
	}

	trashEmpty() {
		for (let i = 0; i < this._items.length; i++) {
			if (this._items[i].trashed) {
				this.splice(i, 1)
				i--
			}
		}
	}

	removeItemById(id) {
		let idx = Tools.getIndexByPropertyValue(this._items, '_id', id)
		this.splice(idx, 1)
		// TODO: check parent_ids?
	}

	moveItem(item1, item2, place='below') {
		let from_index = Tools.getIndexByPropertyValue(this._items, '_id', item1._id)
		let to_index = Tools.getIndexByPropertyValue(this._items, '_id', item2._id)
		if (from_index < to_index) {
			if (place == 'above') {
				to_index = to_index > 0 ? to_index - 1 : 0
			}
		} else if (from_index > to_index) {
			if (place == 'below') {
				to_index = to_index < this._items.length ? to_index + 1 : this._items.length
			}
		}
		if (from_index != to_index) {
			this.splice(from_index, 1)
			this.splice(to_index, 0, item1)
		}
		// TODO: check parent_ids?
	}

	get autosave_execute() {
		return this._autosave_execute
	}
	set autosave_execute(value) {
		// Only if data loaded successfully
		this._autosave_execute = this._loaded_successfully ? value : false
	}
}


class Item {
	constructor() {
		this._id = Tools.uniqueId()
		this._title = ''
		this._parent_id = ''
		this._trashed = false
	}
	get id() {
		return this._id
	}
	set id(value) {
		this._id = value
	}
	get parent_id() {
		return this._parent_id
	}
	set parent_id(value) {
		this._parent_id = value
	}
	get title() {
		return this._title
	}
	set title(value) {
		this._title = value
	}
	get trashed() {
		return this._trashed
	}
	set trashed(value) {
		this._trashed = value
	}
	assignData(data) {
		console.log('Item.assignData(data)', data)
		Object.assign(this, data)
	}
}


const DATA_KEY = 'JBDATA'
const persistence = new Persistence(DATA_KEY)
const items_manager = new ItemsManager(persistence)
items_manager.load()


const props = {
}


const data = function() {
	let data = {}
	data.items_manager = items_manager
	return data
}


const watch = {
}


const computed = {
}


const methods = {
	add() {
		let item = new Item()
		this.items_manager.push(item)
	},
}


const beforeCreate = function() {
}


const created = function() {
}


const mounted = function() {
}


const components = {
	Item2,
}


// module.exports = {
export default {
	name: 'User2',
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
