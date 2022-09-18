<template>
	<li
		:class="{
			'has-children': hasChildren,
			'is-open': isOpen,
			'dragged': dragged,
			'dragged-on': dragged_on,
			'is-droppable': is_dropable,
			'is-focused': is_focused,
		}"
		:draggable="!isRoot"
		@dragstart="mouseDragStart"
		@dragover="mouseDragOver"
		@dragend="mouseDragEnd"
		@drop="mouseDrop"
		>
		<div class="line">
			<div class="actions" v-show="!isRoot">
				<a href="#" @click.prevent="removeItem" class="remove" title="Remove">
					<i class="fas fa-trash"></i>
				</a>
				<a href="#" @click.prevent="duplicateItem" class="duplicate" title="Duplicate">
					<i class="far fa-clone"></i>
				</a>
			</div>
			<div class="actions-right" v-show="!isRoot">
				<a v-show="hasChildren" href="#" @click.prevent="toggleOpenClose()" class="opener" :title="isOpen ? 'Close' : 'Open'">
					<i v-show="!isOpen" class="fas fa-angle-right"></i>
					<i v-show="isOpen" class="fas fa-angle-down"></i>
				</a>
				<a v-show="!hasChildren" href="#" @click.prevent="actionAnchor" class="anchor">•</a>
			</div>
			<div class="content">
				<div v-show="isRoot">{{ item.content }}</div>
				<!-- <div class="read-only" ref="item_read_only">{{ item.content }}</div> -->
				<textarea v-show="!isRoot"
					ref="item"
					v-model="item.content"
					v-bind:rows="textarea_rows"
					@keydown.up="keyboardUp"
					@keydown.down="keyboardDown"
					@keydown.left="keyboardLeft"
					@keydown.right="keyboardRight"
					@keydown.enter.prevent="keyboardEnter"
					@keydown.tab.prevent="keyboardTab"
					@keydown.delete="keyboardDelete"
					@keydown="keyboardKeyDown"
					@keyup ="keyboardKeyUp"
					@input="keyboardInput"
					@focus="focus"
					@blur="blur"
					></textarea>
			</div>
		</div>
		<ul
			v-show="isOpen"
			v-if="hasChildren"
			>
			<list-item2
				v-for="(child, index) in item.children"
				:key="index"
				:item="child"
				:index="index"
				:global="global"
				@parent-add-item="parentAddItem"
				@parent-parent-add-item="parentParentAddItem"
				@parent-delete-item="parentDeleteItem"
				@parent-go-up="parentGoUp"
				@parent-go-down="parentGoDown"
				@toggle-open-close="toggleOpenClose"
				></list-item2>
		</ul>
	</li>
</template>


<script>

// Vue2 to Vue3 polyfills
let Vue = {
	// Vue.set(item_vue, property_name, value)
	set: (object, property_name, value) => {
		object[property_name] = value
	},
	// Vue.delete(vueItem.$parent.item.children, vueItem.index)
	// delete: (obj, key) => {
	delete: (array, index) => {
		// delete obj[key]
		array.splice(index, 1)
	}
}

// VUE KEYBOARD EVENTS
// -------------------
// .enter
// .tab
// .delete (captures both “Delete” and “Backspace” keys)
// .esc
// .space
// .up
// .down
// .left
// .right
// Custom aliases: https://vuejs.org/v2/api/#keyCodes
// .ctrl
// .alt
// .shift
// .meta
// @keydown.ctrl.86="noPaste" (prevents paste via Ctrl+V)
// @keydown.shift.45="noPaste" (prevents paste via Shift+Insert)

const _setPropertyDown = function(property_name, value=null, items_vue=[]) {
	if (items_vue) {
		console.log(`_setPropertyDown(${property_name}, ${value}`)
		items_vue.forEach(item_vue => {
			Vue.set(item_vue, property_name, value)
			_setPropertyDown(property_name, value, item_vue.$children)
		})
	}
}

const props = {
	item: Object,
	index: Number,
	global: Object,
}

const data = function() {
	let data = {}
	data.mounted = false
	data.textarea_rows = 1
	data.dragged = false
	data.dragged_on = false
	data.is_dropable = true
	data.is_focused = false
	return data
}

const watch = {
}

const computed = {
	hasChildren() {
		if (this.mounted) {
			this._resizeTextareaToContent()
		}
		return (this.item.children && this.item.children.length) || 0
	},
	isLastItem() {
		return this.$parent.item.children && this.$parent.item.children.length === this.index + 1
	},
	isOpen() {
		return !this.item._closed
	},
	isRoot() {
		return typeof this.index === 'undefined'
	},
	isMultiline() {
		return this.item.content.indexOf("\n") < 0 ? false : true
	},
}


const methods = {
	toggleOpenClose(action = null) {
		console.log(`toggleOpenClose(${action})`)
		if (this.isRoot) {
			return
		} else if (!this.hasChildren || action === true && !this.isOpen) {
			this.$emit('toggle-open-close', action)
		} else {
			Vue.set(this.item, '_closed', action === null ? this.isOpen : action)
			this._setCaretPosition()
		}
	},

	duplicateItem() {
		console.log(`duplicateItem()`)
		if (!this.isRoot) {
			// Clone/duplicate items
			const deep_cloned_item = JSON.parse(JSON.stringify(this.item))
			// insert below "this" adding 1 to index
			this.$parent.item.children.splice(this.index + 1, 0, deep_cloned_item)
		}
	},

	removeItem() {
		console.log(`removeItem()`)
		if (!this.isRoot) {
			this.$parent.item.children.splice(this.index, 1)
			// If root "children" leave at least one "item"
			if (this.$parent.isRoot && !this.$parent.item.children.length) {
				this.$parent.item.children.push({ content: '' })
			}
		}
	},

	removeFromThisItemToEndSameLevel() {
		console.log(`removeFromThisToEndSameLevel()`)
		this.$parent.item.children.splice(this.index, this.$parent.item.children.length - this.index)
	},

	removeFromStartToThisItemSameLevel() {
		console.log(`removeFromStartToThisSameLevel()`)
		this.$parent.item.children.splice(0, this.index + 1)
	},

	actionAnchor() {
		console.log(`actionAnchor()`)
	},

	deleteVueItem(vueItem) {
		console.log('deleteVueItem()', vueItem)
		Vue.delete(vueItem.$parent.item.children, vueItem.index)
	},

	mouseDragStart(event) {
		console.log(`mouseDragStart(event)`, event)
		event.stopPropagation()
		if (!this.global.drag_from) {
			this.dragged = true
			this.global.drag_from = this
			if (this.hasChildren) {
				_setPropertyDown('is_dropable', false, this.$children)
			}
		}
	},

	mouseDragOver(event) {
		event.preventDefault()
		event.stopPropagation()
		console.log(`mouseDragOver(event) this.item.content`, this.item.content)
		console.log(`mouseDragOver(event) this.is_dropable`, this.is_dropable)
		if (this.is_dropable) {
			if (!this.global.drag_to || this.global.drag_to.item !== this.item) {
				if (this.global.drag_to) {
					this.global.drag_to.dragged_on = false
				}
				this.global.drag_to = this
				this.dragged_on = true
			}
		}
	},

	mouseDragEnd(event) {
		event.preventDefault()
		event.stopPropagation()
		console.log(`mouseDragEnd(event)`, this.item.content)
		this.global.drag_from.dragged = false
		this.global.drag_to.dragged_on = false
		this.global.drag_from = null
		this.global.drag_to = null
	},

	mouseDrop(event) {
		event.preventDefault()
		event.stopPropagation()
		console.log(`mouseDrop(event)`, this.item.content)
		const item_vue_from = this.global.drag_from
		const item_vue_to = this
		console.log('DRAG: from ', { isMultiline: item_vue_from.isMultiline, idx: item_vue_from.index, content: item_vue_from.item.content })
		console.log('DROP: to ', { isMultiline: item_vue_to.isMultiline, idx: item_vue_to.index, content: item_vue_to.item.content })
		// Drop down ;)
		if (item_vue_to.is_dropable && item_vue_to !== item_vue_from) {
			let delete_index_correction = 0
			// If no isRoot, and "from" and "to" are in same list level and "from" is below "to"
			// we need to sum its place when deleting "from" from list
			if (!item_vue_to.isRoot && item_vue_to.$parent == item_vue_from.$parent && item_vue_from.index > item_vue_to.index) {
				delete_index_correction = 1
			}
			// Restore "is_dropable" value
			_setPropertyDown('is_dropable', true, item_vue_from.$children)
			// If is Root, we place at the end of "children"
			if (item_vue_to.isRoot) {
				item_vue_to.item.children.push(Object.assign({}, item_vue_from.item))
			} else {
				item_vue_to.$parent.item.children.splice(item_vue_to.index, 0, Object.assign({}, item_vue_from.item))
			}
			Vue.delete(item_vue_from.$parent.item.children, item_vue_from.index + delete_index_correction)
		// Nothing to drop!
		} else {
			// Make dragged subitems as droppables again 
			_setPropertyDown('is_dropable', true, item_vue_from.$children)
		}
	},

	// args = { index, item }
	parentParentAddItem(args = {}) {
		console.log(`parentParentAddItem(args)`, args)
		this.$emit('parent-add-item', args)
	},

	// args = { index, item, itemContent }
	parentAddItem(args = {}) {
		console.log(`parentAddItem()`, args)
		const newIndex = args.index + 1
		if (args.item && '_userOpened' in args.item) {
			console.error('ZZZZ', [args, this])
		}
		this.item.children.splice(newIndex, 0, args.item ? args.item : { content: args.itemContent || '' })
		// Focus when rendered
		this.$nextTick(() => {
			if (this.$children[newIndex]) {
				this._setCaretPosition(0, this.$children[newIndex].$refs.item)
			} else {
				alert('error, mirar pq no hay $children. es el último?')
			}
		})
	},

	parentDeleteItem(index) {
		console.log(`parentDeleteItem(${index})`)
		this.item.children.splice(index, 1)
	},

	deleteItem(index) {
		console.log(`deleteItem(${index})`)
		if (this.$parent.item) {
			Vue.delete(this.$parent.item.children, index)
		} else {
			console.warn('Nothing to delete')
		}
	},

	// TODO: REVIEW THIS CODE AND TEST WITH GLOBAL isOpen AS FALSE
	keyboardTab(event) {
		console.log('KEYBOARD: keyboardTab', event)
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardTab + ctrl')
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardTab + alt')
		} else if (event.shiftKey) {
			console.log('KEYBOARD: keyboardTab + shift')
			if (this.$parent.$parent.item && !this.$parent.isRoot) {
				// Delete this item
				this.$emit('parent-delete-item', this.index)
				// Create item into parent's parent
				this.$emit('parent-parent-add-item', { index: this.$parent.index, item: Object.assign({}, this.item) })
			}
		} else {
			console.log('KEYBOARD: keyboardTab')
			if (this.index > 0) {
				// let avobeItem = this.$parent.item.children[this.index - 1]
				let avobeItemVue = this.$parent.$children[this.index - 1]
				if (!avobeItemVue.hasChildren) {
					Vue.set(avobeItemVue.item, 'children', [])
				}
				if (!avobeItemVue.isOpen) {
					Vue.set(avobeItemVue.item, '_closed', false)
				}
				// Create item's copy into above item children
				avobeItemVue.item.children.push(Object.assign({}, JSON.parse(JSON.stringify(this.item))))
				// Delete this item
				this.deleteItem(this.index)
				// Focus when rendered
				debugger
				this.$nextTick(() => {
					debugger
					this._setCaretPosition(-1, avobeItemVue.$children[avobeItemVue.$children.length - 1].$refs.item)
				})
			}
		}
	},

	keyboardKeyDown(event) {
		// console.log('KEYBOARD: keyboardKeyDown', event)
	// 	switch (event.key) {
	// 		case 'Down': // IE/Edge specific value
	// 		case 'ArrowDown':
	// 			break;
	// 		case 'Up': // IE/Edge specific value
	// 		case 'ArrowUp':
	// 			break;
	// 		case 'Left': // IE/Edge specific value
	// 		case 'ArrowLeft':
	// 			break;
	// 		case 'Right': // IE/Edge specific value
	// 		case 'ArrowRight':
	// 			break;
	// 		case 'Enter':
	// 			break;
	// 		case 'Esc': // IE/Edge specific value
	// 		case 'Escape':
	// 			break;
	// 		default:
	// 			return; // Quit when this doesn't handle the key event.
	// 	}
	// 	// event.srcElement.style.height = (element.scrollHeight)+"px";

	// 	event.srcElement.style.height = "5px";
	// 	event.srcElement.style.height = (event.srcElement.scrollHeight)+"px";

	// 	if (event.ctrlKey) {
	// 		console.log('KEYBOARD: keyboardKeyDown + ctrl')
	// 	} else if (event.altKey) {
	// 		console.log('KEYBOARD: keyboardKeyDown + alt')
	// 	} else if (event.shiftKey) {
	// 		console.log('KEYBOARD: keyboardKeyDown + shift')
	// 	} else {
	// 		console.log('KEYBOARD: keyboardKeyDown')
	// 	}
	},

	keyboardKeyUp(event) {
		console.log('KEYBOARD: keyboardKeyUp', event)
		this._resizeTextareaToContent()
	},

	_resizeTextareaToContent() {
		console.log('_resizeTextareaToContent()')
		function domTextareaHeightToContent(dom_item) {
			if (dom_item) {
				dom_item.style.height = '1px'
				dom_item.style.height = dom_item.scrollHeight + 'px'
			} else {
				console.error('NO DEBERÍA PASAR POR AQUÍ!')
			}
		}
		this.$nextTick(() => {
			if (this.$parent.isOpen && this.isMultiline) {
				console.log('Only "this"')
				console.log('...recalculate: ' + this.item.content)
				domTextareaHeightToContent(this.$refs.item)
			// None
			} else {
				console.log('None')
				if (this.$refs.item) {
					this.$refs.item.style.height = ''
				} else {
					console.error('NO DEBERÍA PASAR POR AQUÍ!')
				}
			}
		})
	},

	keyboardEnter(event) {
		// console.log('KEYBOARD: keyboardEnter')
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardEnter + ctrl')
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardEnter + alt')
		} else if (event.shiftKey) {
			const caretPosition = this._getCaretPosition()
			console.log('KEYBOARD: keyboardEnter + shift')
			let postNewLineContent = this.item.content.substring(caretPosition)
			Vue.set(this.item, 'content', this.item.content.substring(0, caretPosition) + "\n" + postNewLineContent)
			this.$nextTick(() => {
				this._setCaretPosition(caretPosition + 1, event.srcElement)
			})
		} else {
			console.log('KEYBOARD: keyboardEnter')
			const caretPosition = this._getCaretPosition()
			const selected_text = window.getSelection().toString()
			let content = this.item.content
			if (selected_text) {
				content = content.slice(0, caretPosition) + content.slice(caretPosition + selected_text.length)
			}
			let args = { index: this.index }
			if (caretPosition != content.length || selected_text) {
				Vue.set(this.item, 'content', content.substring(0, caretPosition))
				args.itemContent = content.substring(caretPosition)
			}
			this.$emit('parent-add-item', args)
		}
		this._resizeTextareaToContent()
	},

	keyboardDelete(event) {
		console.log('KEYBOARD: keyboardDelete')
		const selected_text = window.getSelection().toString()
		if (selected_text) {
			return
		} else if (event.key === 'Backspace' && this._getCaretPosition() === 0) {
			event.preventDefault()
			if (this.index === 0 && this.$parent.isRoot) {
				return
			} else {
				this.deleteItem(this.index)
				this.goUp({ fromItem: this.item })
			}
		} else if (event.key === 'Delete' && this._getCaretPosition() === this.item.content.length) {
			event.preventDefault()
			if (this.hasChildren) {
				console.error('has children...')
				// TODO: finish
			} else if (this.isLastItem) {
				console.log(' is last item...')
				return
			} else {
				console.log(' is middle item...')
				const belowItem = this.$parent.item.children[this.index + 1]
				const contentLength = this.item.content.length
				this.item.content += belowItem.content
				this.$nextTick(() => {
					this._setCaretPosition(contentLength)
				})
				if ('children' in belowItem && belowItem.children.length) {
					Vue.set(this.item, 'children', belowItem.children)
				}
				this.deleteItem(this.index + 1)
			}
		}
	},

	keyboardUp(event) {
		// console.log('KEYBOARD: event:', event)
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardUp + ctrl')
			this.toggleOpenClose(true)
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardUp + alt')
		} else if (event.shiftKey) {
			console.log('KEYBOARD: keyboardUp + shift')
		} else {
			console.log('KEYBOARD: keyboardUp')
			if (!this.isMultiline) {
				event.preventDefault()
			}
			this.goUp()
		}
	},

	// args = { fromIndex = 0, fromItem = {}, caretTo = null }
	goUp(args = {}) {
		console.log(`goUp()`, args)
		// If multiline we leave arrow keys move between lines until the start
		if (this.isMultiline && this._getCaretPosition() !== 0) {
			return
		}
		let fromIndex = 'fromIndex' in args ? args.fromIndex : this.index
		let fromItem = args.fromItem || null
		let caretTo = args.caretTo || null
		this.$emit('parent-go-up', { fromIndex, fromItem, caretTo })
	},

	// args = { fromIndex = 0, fromItem = {} }
	parentGoUp(args = {}) {
		console.log(`parentGoUp()`, args)
		let fromIndex = 'fromIndex' in args ? args.fromIndex : this.index
		let fromItem = args.fromItem || null
		let caretTo = args.caretTo || null
		let item = null
		if (fromIndex === 0) {
			// First item so goes to parent
			item = this
		} else {
			fromIndex--
			if (this.$children[fromIndex]) {
				// Item above has children so go to last children from children
				if (this.$children[fromIndex].isOpen && this.$children[fromIndex].$children.length) {
					item = this._goDownToLastChildrenItem(this.$children[fromIndex].$children)
				} else {
					// Item above into same level
					item = this.$children[fromIndex]
				}
			}
		}
		if (item) {
			if (fromItem) {
				if (fromItem.content) {
					caretTo = item.item.content.length
					item.item.content += fromItem.content
				}
				if ('children' in fromItem && fromItem.children.length > 0 && !item.hasChildren) {
					Vue.set(item.item, 'children', fromItem.children)
				}
			}
			item.$nextTick(function() {
				item._setCaretPosition(caretTo || -1, item.$refs.item)
			})
		}
	},

	_goDownToLastChildrenItem(children) {
		console.log(`_goDownToLastChildrenItem(children)`, children)
		const length = children.length
		const lastItem = children[length - 1]
		if (lastItem.isOpen && lastItem.$children.length > 0) {
			return this._goDownToLastChildrenItem(lastItem.$children)
		} else {
			return lastItem
		}
	},

	_getCaretPosition(element = null) {
		console.log(`_getCaretPosition(element)`, element)
		return element === null ? this.$refs.item.selectionStart : element.selectionStart
	},

	_setCaretPosition(position, element = null) {
		console.log(`_setCaretPosition(position, element)`, [position, element])
		element = element || this.$refs.item
		element.focus()
		if (position > -1) {
			// For input fields:
			// element.setSelectionRange(position, position)
			// For textareas:
			element.selectionEnd = position;
		}
	},

	keyboardDown(event) {
		// console.log('KEYBOARD: event:', event)
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardDown + ctrl')
			this.toggleOpenClose(false)
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardDown + alt')
		} else if (event.shiftKey) {
			console.log('KEYBOARD: keyboardDown + shift')
		} else {
			console.log('KEYBOARD: keyboardDown')
			if (!this.isMultiline) {
				event.preventDefault()
			}
			this.goDown()
		}
	},

	// args = { fromIndex = 0, fromItem = {} }
	goDown(args = {}) {
		console.log(`goDown()`, args)
		// If multiline we leave arrow keys move between lines until the end
		if (this.isMultiline && this._getCaretPosition() < this.item.content.length) {
			return
		}
		// Item has children so go to first child
		if (this.isOpen && this.hasChildren) {
			this._setCaretPosition(0, this.$children[0].$refs.item)
		// Last item so go to parent
		} else if (this.isLastItem) {
			this.$emit('parent-go-down')
		// Middle item so specify actual index move below it
		} else {
			this.$emit('parent-go-down', { fromIndex: this.index })
		}
	},

	// args = { fromIndex = 0, fromItem = {} }
	parentGoDown(args = {}) {
		console.log(`parentGoDown()`, args)
		let fromIndex = 'fromIndex' in args ? args.fromIndex : null
		if (fromIndex === null) {
			this.$emit('parent-go-down', { fromIndex: this.index })
		} else {
			const newIndex = fromIndex + 1
			if (this.$children[newIndex]) {
				this._setCaretPosition(0, this.$children[newIndex].$refs.item)
			} else {
				// There are no more items below
				this.$emit('parent-go-down', { fromIndex: this.index })
			}
		}
	},

	keyboardLeft(event) {
		// console.log('KEYBOARD: event:', event)
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardLeft + ctrl')
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardLeft + alt')
		} else if (event.shiftKey) {
			console.log('KEYBOARD: keyboardLeft + shift')
		} else {
			console.log('KEYBOARD: keyboardLeft')
			if (this._getCaretPosition() === 0) {
				event.preventDefault()
				this.goUp()
			}
		}
	},
	keyboardRight(event) {
		// console.log('KEYBOARD: event:', event)
		if (event.ctrlKey) {
			console.log('KEYBOARD: keyboardRight + ctrl')
		} else if (event.altKey) {
			console.log('KEYBOARD: keyboardRight + alt')
		} else if (event.shiftKey) {
			console.log('KEYBOARD: keyboardRight + shift')
		} else {
			console.log('KEYBOARD: keyboardRight')
			if (this._getCaretPosition() === this.item.content.length) {
				event.preventDefault()
				this.goDown()
			}

		}
	},

	keyboardInput(event) {
		console.log('KEYBOARD: keyboardInput', event)
		if (event.inputType.substring(0, 6) === 'format' || event.inputType === 'insertFromPaste') {
			// Avoid item content formatting like bold, italic, etc.
			console.info('ListItem.input: format not allowed')
			// TODO: TERMINAR
		} else if (event.inputType === 'deleteContentBackward' && !this.item.content) {
			console.log('KEYBOARD: keyboardInput: deleteContentBackward')
			// this.$emit('itemRemove', this.item)
			// TODO: TERMINAR
		} else if (event.inputType === 'insertParagraph') {
			console.log('KEYBOARD: keyboardInput: insertParagraph')
			// event.srcElement.innerText = this.item.content
			// TODO: TERMINAR
		} else {
			console.log('KEYBOARD: keyboardInput: else')
		}
	},

	focus(event) {
		console.log('KEYBOARD: focus')
		this.is_focused = true
	},

	blur(event) {
		console.log('KEYBOARD: blur')
		this.is_focused = false
	},

}

// const beforeCreate = function() {
// 	console.log('beforeCreate')
// }

// const created = function() {
// 	console.log('created', { item: this.item, items: his.items })
// 	Vue.set(this.item, 'id', this.global.counter++)
// }

// const beforeMount = function() {
// 	console.log('beforeMount')
// }

const mounted = function() {
	this.mounted = true
	this._resizeTextareaToContent()
}

// const destroyed = function() {
// 	console.log('destroyed')
// }

// module.exports = {
export default {
	name: 'ListItem2',
	props,
	data,
	watch,
	methods,
	computed,
	// beforeCreate,
	// created,
	// beforeMount,
	mounted,
	// destroyed,
}
</script>

<style scoped>
/* local styles */

</style>

<style lang="scss" scoped>
/* global styles */
	// @import "../../scss/variables.scss";

</style>
