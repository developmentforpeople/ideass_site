<template>
<div class="component-route-user-home" >
	<h1>route-user-home</h1>
	<div>dragging_id: {{dragging_id}}</div>
	<div>dragging_over: {{dragging_over}}</div>
	<div>dragging_over_id: {{dragging_over_id}}</div>
	<div class="row">
		<div class="col-6">
			<div class="mb-3">
				<button class="btn btn-primary" @click.prevent="list.add()">Nuevo</button>
				<!-- <button v-if="list.trashed.length" class="btn btn-primary" @click.prevent="list.trashEmpty()"> -->
				<button v-if="list.trashed_counter" class="btn btn-primary" @click.prevent="list.trashed_visible=!list.trashed_visible">
					<span v-show="list.trashed_visible">ocultar eliminados</span>
					<span v-show="!list.trashed_visible">visualizar eliminados</span>
					({{ list.trashed_counter }})
				</button>
				<button v-if="list.trashed_counter" class="btn btn-primary" @click.prevent="list.trashEmpty()">
					Vaciar papelera ({{ list.trashed_counter }})
				</button>
			</div>
			<!-- v-if="!i._meta.trashed" -->
			<!-- <div @drop="drag(i, 'drop 3', '')" :dropzone="true">
				ZZZ
			</div> -->

			<template v-for="i in list.items">
				<div class="item_wrapper"
					v-bind:key="`${i._id}_item_wrapper`"
					v-if="list.trashed_visible || (!list.trashed_visible && !i._meta.trashed)"
					:draggable="true"
					@dragstart="drag(i, 'start', '')"
					@dragend.prevent="drag(i, 'end', '')"
					>
					<!-- @drop.prevent="drag(i, 'drop 2', '')" -->
					<item :item="i"
						:user="user"
						@updated-by-user="itemUpdatedByUser(i)"
						@trashed-by-user="itemTrashedByUser(i)"
						@untrashed-by-user="itemUntrashedByUser(i)"
						@removed-by-user="itemRemovedByUser(i)"
						@encrypt-by-user="itemEncryptedByUser(i)"
						@decrypt-by-user="itemDecryptedByUser(i)"
						></item>
					<div 
						@dragenter.prevent="drag(i, 'enter', 'inside')"
						@dragleave.prevent="drag(i, 'leave', 'inside')"
						>
						<!-- @dragover.prevent="drag(i, 'over', 'inside')" -->
						<!-- @drop="drag(i, 'drop', 'inside')" -->
						INSIDE: 
					</div>
					<div 
						@dragenter.prevent="drag(i, 'enter', 'below')"
						@dragleave.prevent="drag(i, 'leave', 'below')"
						>
						<!-- @drop="drag(i, 'drop', 'below')" -->
						<!-- @dragover.prevent="drag(i, 'over', 'below')" -->
						BELOW: 
					</div>
				</div>
				<hr class="trashed" v-bind:key="`${i._id}_item_trashed`"
					v-if="!list.trashed_visible && i._meta.trashed">
			</template>
		</div>
		<div class="col-6">
			<h5>raw list</h5>
			<pre style="font-size:11px">{{list}}</pre>
		</div>
	</div>
	<ul>
		<li>que dure un tiempo el desencriptado temporal</li>
		<li>Modos: Encription for new items: disabled | enabled | only if parent</li>
		<li>ordenar como si fueran líneas de texto (cada item debe ser siempre una línea de texto</li>
		<li>pensar en "zoom" para el ordenado</li>
		<li>parent_id: el id del padre...?? y debería ser siempre el inmediatamente superior??</li>
		<li>pegar texto / líneas</li>
	</ul>
</div>
</template>

<script>


import Item from './Item.vue'


const props = {
	user: Object,
	list: Object,
}


const data = function() {
	let data = {}
	data.dragging_id = null
	data.dragging_over = null
	data.dragging_over_id = null
	return data
}


const watch = {
}


const computed = {
}


const methods = {
	itemUpdatedByUser(i) {
		console.log('itemUpdatedByUser')
		this.list.update(i)
	},
	// No recuperable / shred
	itemRemovedByUser(i) {
		console.log('itemRemovedByUser')
		this.list.remove(i)
	},
	// recuperable!
	itemTrashedByUser(i) {
		console.log('itemTrashedByUser')
		this.list.trash(i)
	},
	itemUntrashedByUser(i) {
		console.log('itemUntrashedByUser')
		this.list.untrash(i)
	},
	itemEncryptedByUser(i) {
		console.log('itemEncryptedByUser')
		this.list.encrypt(i)
	},
	itemDecryptedByUser(i) {
		console.log('itemDecryptedByUser')
		this.list.decrypt(i)
	},
	drag(i, event, where) {
		console.log('drag: id: ', i._id)
		console.log('drag: event: ', event)
		console.log('drag: where: ', where)
		if (event == 'start') {
			i._session.dragged = true
			this.dragging_id = i._id
		} else if (event == 'end') {
			// delete(i._session.dragged)
			// this.dragging_id = null
			// this.dragging_over_id = null
			// this.dragging_over = null
		} else if (event == 'enter' && this.dragging_id != i._id) {
			this.dragging_over_id = i._id
			this.dragging_over = where
		} else if (event == 'leave' && this.dragging_id != i._id) {
			this.dragging_over_id = null
			this.dragging_over = null
		} else if (event == 'drop') {
			console.log(`DROPPED OVER ${i._id}`) 
		}
	}
}


const beforeCreate = function() {
}


const created = function() {
}


const mounted = function() {
}


const components = {
	Item,
}


export default {
	name: 'RouteUserHome',
	props,
	data,
	watch,
	computed,
	methods,
	beforeCreate,
	created,
	mounted,
	components,
}

</script>

<style lang="scss" scoped>
	// @import "../../../scss/variables.scss";
	hr {
		&.trashed {
			border: 0;
			border-bottom: 1px solid red !important;
			height: 0;
		}
	}
	.item_wrapper {
		border: 1px solid red;
	}
</style>

<style lang="scss">
	// @import "../../../scss/variables.scss";
</style>
