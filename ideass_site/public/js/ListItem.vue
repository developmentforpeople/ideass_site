<template>
	<div class="dfp-component-list-item item">
		<div class="bullet">-</div>
		<div class="editable"
			ref="item"
			contenteditable="true"
			@input="input"
			@keydown.tab.prevent="tab"
			@keydown.enter.prevent="enter"
			@keydown.up="up"
			@keydown.down="down"
			@keydown.left="left"
			@keydown.right="right"
			@keydown.delete="del"
			@keydown="keydown"
			@keyup="keyup"
			@blur="blur"
		>{{ initial_content }}</div>
	</div>
</template>

<script>

import { Tools } from './classes/Tools'

const methods = {
	input(event) {
		console.log('ListItem.input', event)
		if (event.inputType.substring(0, 6) == 'format' || event.inputType == 'insertFromPaste') {
			// Avoid item content formatting like bold, italic, etc.
			console.info('ListItem.input: format not allowed')
			this.$refs.item.innerHTML = this.$refs.item.innerText || this.$refs.item.textContent || ''
			Tools.caretPositionSet(this.$refs.item, -1)
		} else if (event.inputType == 'deleteContentBackward' && !this.item.content) {
			this.$emit('itemRemove', this.item)
		} else if (event.inputType == 'insertParagraph') {
			event.srcElement.innerText = this.item.content
		} else {
			this.$refs.item
			this.item.content = event.srcElement.innerText || event.srcElement.textContent || ''
		}
	},
	tab(event) {
		console.log('ListItem.tab', event)
		this.$emit('tab', this.item)
		if (this.shift_pressed) {
			this.$emit('shifttab', this.item)
		}
	},
	keyup(event) {
		console.log('ListItem.keyup', event)
		if (event.key == 'Shift') {
			this.shift_pressed = false
		}
	},
	keydown(event) {
		console.log('ListItem.keydown', event)
		if (event.key == 'Shift') {
			this.shift_pressed = true
		}
	},
	enter(event) {
		console.log('ListItem.enter', event)
		this.$emit('enter', this.item, Tools.caretPositionGet(this.$refs.item))
	},
	del(event) {
		console.log('ListItem.del', event)
		if (event.key == 'Backspace' && Tools.caretPositionGet(this.$refs.item) == 0) {
			event.preventDefault()
			this.$emit('itemRemove', this.item)
		} else if (event.key == 'Delete' && Tools.caretPositionGet(this.$refs.item) == this.item.content.length) {
			console.log('Tools.caretPositionGet(this.$refs.item) == this.item.content.length', [Tools.caretPositionGet(this.$refs.item), this.item.content.length])
			event.preventDefault()
			this.$emit('itemRemoveBelowOne', this.item)
		}
	},
	up(event) {
		console.log('ListItem.up', event)
		console.log('ListItem.up', [Tools.caretPositionGet(this.$refs.item), this.item.content.length])
		if (Tools.caretPositionGet(this.$refs.item) == 0) {
			this.$emit('up', this.item)
		}
	},
	down(event) {
		console.log('ListItem.down', event)
		console.log('ListItem.down', [Tools.caretPositionGet(this.$refs.item), this.item.content.length])
		if (Tools.caretPositionGet(this.$refs.item) == this.item.content.length) {
			this.$emit('down', this.item)
		}
	},
	left(event) {
		console.log('ListItem.left', event)
		console.log('caretPositionGet:', Tools.caretPositionGet(this.$refs.item))
		if (Tools.caretPositionGet(this.$refs.item) == 0) {
			event.preventDefault()
			this.$emit('left', this.item)
		}
	},
	right(event) {
		console.log('ListItem.right', event)
		console.log('caretPositionGet:', Tools.caretPositionGet(this.$refs.item))
		if (Tools.caretPositionGet(this.$refs.item) == this.item.content.length) {
			event.preventDefault()
			this.$emit('right', this.item)
		}
	},
	focus(position = 0) {
		console.log(`ListItem.focus(${position})`)
		Tools.caretPositionSet(this.$refs.item, position)
	},
	blur() {
		console.log('ListItem.blur')
		this.contentSet(this.item.content.trim())
	},
	contentSet(content = '') {
		console.log('ListItem.contentSet', content)
		this.item.content = content
		this.$refs.item.innerText = content
	},
	contentAppend(content = '') {
		if (content.length) {
			console.log('ListItem.contentAppend', content)
			this.item.content = this.item.content + content
			this.$refs.item.innerText = this.item.content
		}
	},
	contentPrepend(content = '') {
		if (content.length) {
			console.log('ListItem.contentPrepend', content)
			this.item.content = content + this.item.content
			this.$refs.item.innerText = this.item.content
		}
	}
}
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

const data = function() {
	let data = {}
	data.initial_content = ''
	data.shift_pressed = false
	return data
}


const mounted = function() {
	console.log('ListItem.mounted')
	this.initial_content = this.item.content
	this.focus()
}


const created = function() {
	console.log('ListItem.created')
}


const props = {
	item: {
		type: Object,
	},
}

// module.exports = {
export default {
	name: 'ListItem',
	props,
	data,
	methods,
	mounted,
	created,
}
</script>

<style scoped>
/* local styles */
	[contenteditable]:focus {
		outline: 0px solid transparent;
	}
	.item {
		clear: both;
	}
	.bullet {
		float: left;
		width: 1%;
	}
	.editable {
		float: left;
		width: 99%;
	}
</style>

<style lang="scss" scoped>
/* global styles */
	// @import "../../scss/variables.scss";

	.item:focus {
		border-bottom: 1px solid rgb(158, 158, 158);
	}

</style>
