<template>
	<div class="dfp-list-component">
		<DfpListItem
			v-for="(item, index) in items"
			:item="item"
			:index="index"
			:ref="`item_index_${index}`"
			@fromItemUpdate="itemUpdate"
			@fromItemCreateAfter="itemCreate"
			@fromItemCursorUp="cursorUp"
			@fromItemCursorDown="cursorDown"
			></DfpListItem>
		<div>
			<a href="#" @click.prevent="itemCreate(items.length)">Nuevo</a>
		</div>
		<pre>{{ items }}</pre>
	</div>
</template>


<!-- <script lang="ts"> -->
<script>

import { Item } from './classes/Item'
import DfpListItem from './DfpListItem.vue'

// import { PropType } from 'vue'


export default {
	name: 'DfpList',
	props: {
		items: {
			// type: Array as PropType<Array<Item>>,
			type: Array,
			default: [],
		},
	},
	components: { DfpListItem },
	watch: {
		items(val_old, val_new) {
			console.log('whatched items! REINDEX!??!', [val_old, val_new])
		},
	},
	data() {
		return {
			count: 0,
			items: [],
		}
	},
	methods: {
		increment() {
			this.count++
		},
		itemUpdate(index, item) {
			console.log(`DfpList() itemUpdate ${index}:`, item)
			this.items[index] = item
		},
		itemCreate(after_index=null) {
			console.log('DfpList() itemCreate', after_index)
			new_index = 0
			if (Number.isInteger(after_index) && after_index >= 0) {
				new_index = after_index + 1
			}
			let item = new Item()
			// item.index = new_index
			// debugger
			if (new_index > this.items.length || !this.items.length) {
				this.items.push(item)
			} else if (new_index === 0 && this.items.length) {
				this.items.unshift(item)
			} else {
				console.log('resto...')
				this.items.splice(item.index, 0, item)
			}
			// let new_list = this.items.splice(item.index, 0, item)
			// let test = [].concat(this.items.slice(0), arr3)
		},
		cursorUp(index) {
			console.log('DfpList() cursorUp', index)
			let index_new = index - 1
			if (index_new < 0) { return }
			this.$refs[`item_index_${index_new}`].focus()
		},
		cursorDown(index) {
			console.log('DfpList() cursorDown', index)
			let index_new = index + 1
			if (index_new >= this.items.length) { return }
			this.$refs[`item_index_${index_new}`].focus()
		},
	},
	beforeCreate() {

	},
	created() {
		if (!this.items.length) {
			this.itemCreate()
		}
	},
	beforeMount() {

	},
	mounted() {
		console.log('mounted this.items', this.items)
	},
	beforeUpdate() {

	},
	updated() {

	},
	beforeUnmount() {

	},
	unmounted() {

	},
}
</script>


<style lang="scss" scoped>
/* local styles */

</style>

<style lang="scss">
	/* global styles */
 	// @import "../../scss/variables.scss";
	// body {
	// 	.dfp-list-component {
	// 	}
	// }
</style>
