<template>
<div class="component-user-side">

	<div class="card mb-3">
		<div class="card-body py-3">
			<h3>User</h3>
			<div class="mb-3">
				Crypt Key: <input class="form-control" type="password" v-model="user.crypt_key">
			</div>
			<div class="mb-3">
				Crypt Key 1: <input class="form-control" type="password" v-model="user.crypt_key_1">
			</div>
			<div class="mb-3" v-show="user.crypt_key">
				<hr>
				<button class="btn btn-primary"
					:disabled="!user.crypt_key || list.session_decrypted_all"
					@click.prevent="list.sessionEncryptedViewAll()"
					>
					<i class="fas fa-eye"></i> todos
				</button>
				<button class="btn btn-primary"
					:disabled="!user.crypt_key"
					@click.prevent="list.sessionEncryptedUnviewAll()"
					>
					<i class="fas fa-eye-slash"></i> todos
				</button>
			</div>
			<hr>
			<div class="mb-3">
				<button class="btn btn-primary"
					@click.prevent="list.compactList()"
					>Compactar DB</button>
			</div>
		</div>
	</div>

	<div class="card mb-3">
		<div class="card-body py-3">
			<h3>side</h3>
			<ul class="mb-0 list-unstyled">
				<li>
					<span v-if="$route.name=='home'" class="text-muted">Home</span>
					<router-link v-if="$route.name!='home'" :to="{ name: 'home' }">Home</router-link>
				</li>
				<li>
					<span v-if="$route.name=='other'" class="text-muted">Otra</span>
					<router-link v-if="$route.name!='other'" :to="{ name: 'other' }">Otra</router-link>
				</li>
			</ul>
		</div>
	</div>

</div>
</template>

<script>

const props = {
	user: Object,
	list: Object,
}


const data = function() {
	let data = {}
	return data
}


const watch = {
}


const computed = {
}


const methods = {
}


const created = function() {
}


const mounted = function() {
}


const components = {
}


// module.exports = {
export default {
	name: 'UserSide',
	props,
	data,
	watch,
	computed,
	methods,
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
