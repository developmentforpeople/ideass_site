
export {
	Item,
}

class Item {
	constructor() {
		// this.id = 'id' + Math.random().toString(16).slice(2)
		this.id = Date.now().toString(36) + '.' + Math.random().toString(36).substr(2) + '.' + Math.random().toString(16).slice(2)
		this._index = null
		this._content = ''
		this._parent_id = null
	}
	set index(value) {
		this._index = value
	}
	get index() {
		return this._index
	}
	set content(value) {
		this._content = value
	}
	get content() {
		return this._content
	}
	set parent_id(value) {
		this._parent_id = value
	}
	get parent_id() {
		return this._parent_id
	}
}
