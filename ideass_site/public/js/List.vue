<template>
	<div>
		<list-item
			v-for="item in items"
			v-bind:key="item.id"
			v-bind:item="item"
			v-on:enter="itemAdd"
			v-on:tab="tab"
			v-on:shifttab="shifttab"
			v-on:itemRemove="itemRemove"
			v-on:itemRemoveBelow="itemRemoveBelow"
			v-on:up="up"
			v-on:down="down"
			v-on:right="right"
			v-on:left="left"
			ref="items"
			></list-item>
		<p><a href="#" @click.prevent="itemAdd">+</a></p>
		<pre>{{ items }}</pre>
	</div>
</template>

<script>

import ListItem from './ListItem.vue'
import { Item } from './classes/Item'

const methods = {
	getItemAbove(item, index) {
		const idx = index || this.getItemIndex(item)
		if (idx !== null && this.items[idx - 1]) {
			return this.items[idx - 1]
		}
		return null
	},
	getItemBelow(item, index) {
		const idx = index || this.getItemIndex(item)
		if (idx !== null && this.items[idx + 1]) {
			return this.items[idx + 1]
		}
		return null
	},
	getVueItem(item) {
		if (item instanceof Item && item.id && this.$refs.items.length > 0) {
			for (let i = 0; i < this.$refs.items.length; ++i) {
				if (this.$refs.items[i]['item']['id'] == item.id) {
					return this.$refs.items[i]
				}
			}
		}
		return null
	},
	getItemIndex(item) {
		if (item instanceof Item && item.id && this.items.length > 0) {
			for (let i = 0; i < this.items.length; ++i) {
				if (this.items[i]['id'] == item.id) {
					return i
				}
			}
		}
		return null
	},
	itemAdd(above_item, caret_position) {
		console.log('List.itemAdd', [above_item, caret_position])
		const index = this.getItemIndex(above_item)
		const item = new Item
		if (index !== null) {
			// Add item below avobeItem
			if (above_item.content.length > caret_position) {
				const new_item_content = above_item.content.substring(caret_position)
				const vue_above_item = this.getVueItem(above_item)
				vue_above_item.contentSet(above_item.content.substring(0, caret_position))
				item.content = new_item_content
			}
			this.items.splice(index + 1, 0, item)
		} else {
			// Add new item
			this.items.push(item)
		}
	},
	itemRemoveBelow(item) {
		console.log('List.itemRemoveBelow', item)
		if (this.items.length > 1) {
			const index = this.getItemIndex(item)
			if (index !== null && typeof this.items[index + 1] !== 'undefined') {
				const vue_item = this.getVueItem(item)
				const below_item = this.items[index + 1]
				vue_item.contentAppend(below_item.content.length ? below_item.content : '')
				// Remove item
				this.items.splice(index + 1, 1)
			}
		}
	},
	itemRemove(item) {
		console.log('List.itemRemove', item)
		if (this.items.length > 1) {
			const index = this.getItemIndex(item)
			if (index !== null) {
				const vue_above_item = this.getVueItem(this.items[index - 1])
				if (vue_above_item) {
					const caret_position = vue_above_item.item.content.length
					vue_above_item.contentAppend(item.content.length ? item.content : '')
					// Remove item
					this.items.splice(index, 1)
					// Set focus to previous item
					vue_above_item.focus(caret_position)
				}
			}
		}
	},
	up(item, caret_to_end = true) {
		console.log('List.up', item)
		const index = this.getItemIndex(item)
		const vue_above_item = this.getVueItem(this.items[index - 1])
		if (vue_above_item) {
			vue_above_item.focus(caret_to_end ? -1 : 0)
		}
	},
	down(item, caret_to_end = true) {
		console.log('List.down', item)
		const index = this.getItemIndex(item)
		const vue_below_item = this.getVueItem(this.items[index + 1])
		if (vue_below_item) {
			vue_below_item.focus(caret_to_end ? -1 : 0)
		} else {
			this.itemAdd()
		}
	},
	left(item) {
		console.log('List.left', item)
		this.up(item)
	},
	right(item) {
		console.log('List.right', item)
		this.down(item, false)
	},
	tab(item) {
		console.log('List.tab')
		const index = this.getItemIndex(item)
		const above_item = this.getItemAbove(item, index)
		if (above_item && !item.parent_id) {
			item.parent_id = above_item.id
			const above_vue_item = this.getVueItem(above_item)
			if (above_vue_item) {
				const above_item_style = window.getComputedStyle(above_vue_item.$el)
				const margin_left = parseInt(above_item_style.marginLeft)
				console.log("margin_left: ", margin_left)
				const vue_item = this.getVueItem(item)
				vue_item.$el.style.marginLeft = margin_left + 10 + 'px'
			}
		}
	},
	shifttab(item) {
		console.log('List.shifttab')
		if (item.parent_id) {
			item.parent_id = ''
			const vue_item = this.getVueItem(item)
			const item_style = window.getComputedStyle(vue_item.$el)
			const margin_left = parseInt(item_style.marginLeft)
			vue_item.$el.style.marginLeft = margin_left - 10 + 'px'
		}
	},
}

const data = function() {
	let data = {}
	data.items = []
	return data
}

const mounted = function() {
}

const created = function() {
	if (!this.items.length) {
		this.itemAdd()
	}
}

const components = {
	ListItem
}

// module.exports = {
export default {
	name: 'List',
	data,
	methods,
	mounted,
	created,
	components,
}
</script>

<style scoped>
/* local styles */
	pre {
		position: fixed;
		top: 0;
		right: 0;
		width: 480px;
		height: 100%;
		overflow: visible;
		border: 1px solid rgb(37, 66, 85);
		z-index: 2000;
		background-color: white;
		padding: 4px;
	}

</style>

<style lang="scss" scoped>
	/* global styles */
 	// @import "../../scss/variables.scss";


</style>
