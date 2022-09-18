<template>
<div class="component-item"
	v-bind:class="{
		'trashed': i._meta.trashed,
		'encrypted': i._meta.encrypted,
		'dragged': i._session.dragged,
	}"
	>
	<!-- 'dragged': dragged, -->
	<!-- <div>dragged: {{ dragged }}</div> -->
	<!-- @drag="drag(i._id, 'drag')" -->
	<div class="card mb-3">
		<div class="card-body py-3">
			<div class="row">
				<div class="col-3">
					<div class="custom-control custom-switch"
						v-show="user.crypt_key">
						<input type="checkbox" class="custom-control-input" 
							v-model="encrypted_switcher"
							:id="`item_encrypt_${i._id}`"
							>
						<label class="custom-control-label" :for="`item_encrypt_${i._id}`">
							encriptado
						</label>
						<hr>
					</div>
					<button class="btn btn-secondary btn-sm" title="Eliminar definitivamente"
						@click.prevent="remove()"
						>
						<i class="fas fa-times-circle"></i>
					</button>
					<button class="btn btn-secondary btn-sm" title="Enviar a la papelera"
						v-if="!i._meta.trashed"
						@click.prevent="trash()"
						>
						<i class="fas fa-trash-alt"></i>
					</button>
					<button class="btn btn-secondary btn-sm" title="Sacar de la papelera"
						v-if="i._meta.trashed"
						@click.prevent="untrash()"
						>
						<i class="fas fa-trash-restore-alt"></i>
					</button>
				</div>
				<div class="col-9">
					<div class="mb-1">
						<input class="form-control" type="text" v-model="i.title" placeholder="Título">
					</div>

					<div class="input-group"
						v-show="i.isEncrypted() && i.isSessionDecrypted()">
						<input type="text" class="form-control" placeholder="Contenido" aria-label="Contenido"
							:aria-describedby="`item_encrypted_${i._id}`"
							v-model="i.content">
						<div class="input-group-append"
							v-show="user.crypt_key">
							<button class="btn btn-outline-primary btn-sm" type="button"
								:id="`item_encrypted_${i._id}`"
								@click="i.sessionEncryptedUnview()"
								>
								<i class="fas fa-eye-slash"></i>
							</button>
						</div>
					</div>

					<div class="input-group"
						v-show="i.isEncrypted() && !i.isSessionDecrypted()">
						<input type="text" class="form-control" placeholder="Contenido" aria-label="Contenido"
							:aria-describedby="`item_encrypted_ns_${i._id}`"
							value="**************"
							disabled="disabled">
						<div class="input-group-append"
							v-show="user.crypt_key">
							<button class="btn btn-outline-primary btn-sm" type="button"
								:id="`item_encrypted_ns_${i._id}`"
								@click="i.sessionEncryptedView()"
								>
								<i class="fas fa-eye"></i>
							</button>
						</div>
					</div>

					<div v-if="!i.isEncrypted()">
						<input class="form-control" type="text" v-model="i.content" placeholder="Contenido">
					</div>
				</div>
			</div>
		</div>
		<!-- <div 
			@dragenter.prevent="drag(i._id, 'enter', 'inside')"
			@dragleave.prevent="drag(i._id, 'leave', 'inside')"
			@dragover.prevent="drag(i._id, 'over', 'inside')"
			@drop.prevent="drag(i._id, 'drop', 'inside')"
			>
			INSIDE: 
		</div> -->
	</div>
	<!-- <div 
		@dragenter.prevent="drag(i._id, 'enter', 'below')"
		@dragleave.prevent="drag(i._id, 'leave', 'below')"
		@dragover.prevent="drag(i._id, 'over', 'below')"
		@drop.prevent="drag(i._id, 'drop', 'below')"
		>
		BELOW: 
	</div> -->
</div>
</template>

<script>


// Props
const props = {
	item: Object,
	user: Object,
}


// Emitters:
// @updated-by-user
// @removed-by-user


const data = function() {
	let data = {}
	data.i = this.item
	data.encrypted_switcher = this.item.isEncrypted()
	// data.dragged = false
	// data.draging_over = false
	// data.dragged_id = null
	return data
}


const watch = {
	i: {
		deep: true,
		handler() {
			console.log('cambio!')
			this.updated()
		},
	},
	encrypted_switcher: function(to, from) {
		if (to === false) {
			this.decrypt()
			this.encrypted_switcher = false
		} else if (to === true) {
			this.encrypt()
			this.encrypted_switcher = true
		}
	},
}


const computed = {
}


const methods = {
	remove() {
		this.$emit('removed-by-user', this.i)
	},
	trash() {
		this.$emit('trashed-by-user', this.i)
	},
	untrash() {
		this.$emit('untrashed-by-user', this.i)
	},
	updated() {
		this.$emit('updated-by-user', this.i)
	},
	encrypt() {
		this.$emit('encrypt-by-user', this.i)
	},
	decrypt() {
		this.$emit('decrypt-by-user', this.i)
	},
	cryptedView() {
		alert('implementar!')
	},
	cryptedCopy() {
		alert('implementar!')
	},
}


const created = function() {
}


const mounted = function() {
}


const components = {
}


// module.exports = {
export default {
	name: 'Item',
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
	.encrypted {
		// .card {
		// 	background-color: rgb(245, 245, 245);
		// }
	}
	.trashed {
		.card {
			border: 1px solid #ff0000;
		}
	}
	.dragged {
		.card {
			// background-color: aquamarine;
			// border: 2px solid blue;
			opacity: 50%;
		}
	}
</style>

<style lang="scss">
	// @import "../../../scss/variables.scss";
</style>
