<template>
	<div class="edp-component-app">
		APP LOADED!<br>
		<button @click="count++">{{ count }}</button>

		<hr>
		Test: <test></test>
		<hr>

	</div>
</template>

<script>

const methods = {
}

const data = function() {
	let data = {}
	data.count = 1

	return data
}

const mounted = function() {
}

const created = function() {
}

const components = {
}

// module.exports = {
export default {
	name: 'App',
	data,
	methods,
	mounted,
	created,
	components,
}
</script>

<style scoped>
/* local styles */
	.edp-component-app{
		border: 1px solid red;
	}
</style>

<style lang="scss" scoped>
	/* global styles */
 	// @import "../../scss/variables.scss";

</style>
