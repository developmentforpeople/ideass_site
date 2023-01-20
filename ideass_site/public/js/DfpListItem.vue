<template>
	<div class="dfp-list-item-component item"
		:class="{

		}"
		>
		<div class="bullet">- ({{ index }})</div>
		<div class="editable"
			ref="editable"
			contenteditable="true"
			@input="kbInput"
			@keydown.ctrl.enter="kbCtrlEnter"
			@keydown.ctrl.v="kbCtrlV"
			@keydown.enter.prevent="kbEnter"
			@keydown.tab.prevent="kbTab"
			@keydown.up="kbUp"
			@keydown.down="kbDown"
			@keydown.left="kbLeft"
			@keydown.right="kbRight"
			@keydown.delete="kbDel"
			@blur="blur"
		>{{ item.content }}</div>
		<!--
			@keydown="kbKeydown"
			@keyup="kbKeyup"
		-->
	</div>
</template>


<!-- <script lang="ts"> -->
<script>
import { Item } from './classes/Item'
// import {
// 	ref,
// 	computed,
// 	onBeforeMount,
// 	onMounted,
// 	// onBeforeUpdateReactive,
// 	onUpdated,
// 	onBeforeUnmount,
// 	onUnmounted,
// } from '@vue/compat'

// function getIdxByPropertyValue() {}

export default {
	name: 'DfpListItem',
	props: {
		index: {
			type: Number,
		},
		item: {
			type: Item, // String, Number, Boolean, Array, Object, Date, Function, Symbol
			required: true,
			// default() {
			// 	return new Item()
			// },
			// validator(value) {
			// 	return true
			// },
		},
	},
	// components: { },
	data() {
		return {
			count: 0,
			items: [],
		}
	},
	methods: {
		focus() {
			// alert('focus!!! pocus!!!')
			this.$refs.editable.focus()
		},
		kbCtrlEnter(e) {
			console.log('kbCtrlEnter', e)
			e.stopImmediatePropagation()
			// console.log('this.$refs.item', this.$refs.item)
			// this.item.content += '\n'
		},
		kbCtrlV(e) {
			console.log('kbCtrlV', e)
			// e.stopImmediatePropagation()
		},
		kbEnter(e) {
			console.log('kbEnter', e)
			this.$emit('fromItemCreateAfter', this.index)
		},
		kbInput(e) {
			console.log('kbInput', e)
			// save new value!!!
			this.item.content = e.target.innerHTML
			this.$emit('fromItemUpdate', this.index, this.item)
		},
		kbTab(e) {
			console.log('kbTab', e)
		},
		kbUp(e) {
			console.log('kbUp', e)
			this.$emit('fromItemCursorUp', this.index)
		},
		kbDown(e) {
			console.log('kbDown', e)
			this.$emit('fromItemCursorDown', this.index)
		},
		kbLeft(e) {
			console.log('kbLeft', e)
		},
		kbRight(e) {
			console.log('kbRight', e)
		},
		kbDel(e) {
			console.log('kbDel', e)
		},
		// kbKeydown(e) {
		// 	console.log('kbKeydown', e)
		// },
		// kbKeyup(e) {
		// 	console.log('kbKeyup', e)
		// },
		blur(e) {
			console.log('blur', e)
		},
	},
	beforeCreate() {

	},
	created() {

	},
	beforeMount() {

	},
	mounted() {
		console.log('mounted this.items', this.items)
		this.$refs.editable.focus()
	},
	beforeUpdate() {

	},
	updated() {

	},
	beforeUnmount() {

	},
	unmounted() {

	},
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
}
</script>


<style lang="scss" scoped>
/* local styles */
	/* [contenteditable]:focus {
		outline: 0px solid transparent;
	} */
	.item {
		clear: both;
	}
	.bullet {
		float: left;
		width: 1%;
		white-space: nowrap;
		opacity: 0.4;
	}
	.editable {
		float: left;
		width: 99%;
		border-bottom: 1px solid transparent;
		&:focus {
			outline: 0px solid transparent;
			border-bottom: 1px solid rgb(158, 158, 158);
		}
	}
</style>

<style lang="scss">
/* global styles */
	// @import "../../scss/variables.scss";
	// body {
	// 	.dfp-list-item-component {
	// 		.editable:focus {
	// 			border-bottom: 1px solid rgb(158, 158, 158);
	// 		}
	// 	}
	// }
</style>
