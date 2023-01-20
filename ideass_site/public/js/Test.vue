
<script>

import {
	ref,
	// // computed,
	// onBeforeMount,
	// onMounted,
	// // onBeforeUpdateReactive,
	// onUpdated,
	// onBeforeUnmount,
	// onUnmounted
} from '@vue/compat'

export default {
	expose: [], // No not expose anything to parents via ref()
	props: {
		title: String,
		default: 'Un título por defecto'
	},

	setup(props) {
		const count = ref(0)

		console.log('setup() props.title', props.title)

		// expose to template and other options API hooks
		return {
			count
		}
	},

	mounted() {
		console.log('mounted')
		console.log('this.title', this.title)
		console.log('this.count', this.count)
	}
}
</script>


<template>
	<button @click="count++">{{ count }}</button>
</template>


<style lang="scss" scoped>
/* local styles */

</style>

<style lang="scss" scoped>
	/* global styles */
 	// @import "../../scss/variables.scss";

</style>
