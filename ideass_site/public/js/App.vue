<template>
	<div class="edp-component-app">
		<div class="row">
			<div class="col-6">
				<DfpList :items="items"></DfpList>
			</div>
			<div class="col-6">
				<Test title="mi título"></Test>
				<pre>{{ items }}</pre>
			</div>
		</div>
	</div>
</template>

<script>

import DfpList from './DfpList.vue'

const methods = {
}

const data = function() {
	let data = {}
	data.items = []
	return data
}

const mounted = function() {
}

const created = function() {
}

const components = {
	DfpList,
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
