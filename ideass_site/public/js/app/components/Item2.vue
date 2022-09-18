<template>
<div class="edp-list-item card position-relative mb-3"
	:class="{
		'dragged': is_dragged,
		'droppable': is_droppable,
		'hovered-top': drag_area_top_hovered,
		'hovered-bottom': drag_area_bottom_hovered,
	}"
	:draggable="true"
	@dragstart="dragStart(item)"
	@dragend="dragEnd()"
	v-bind:style="{ marginLeft: `${parent_deep_level*15}px` }"
	>

	<div class="drop-here-bar"
		v-show="drag_area_top_hovered"
		></div>

	<div class="drop-area drop-area-above"
		v-show="is_droppable"
		@dragover.prevent
		@drop.prevent="drop(item, 'above')"
		@dragenter.prevent="drag_area_top_hovered=true"
		@dragleave.prevent="drag_area_top_hovered=false"
		></div>

	<div class="card-body py-3">
		<div class="row">
			<div class="col-12">

				<textarea class="form-control" rows="1" placeholder="Título"
					ref="textarea"
					@input="textareaAutoResize()"
					v-model="i.title"></textarea>

				<button class="btn btn-secondary btn-sm" title="Enviar a la papelera"
					v-if="!i.trashed"
					@click.prevent="trash()"
					><i class="fas fa-trash-alt"></i>
				</button>

				parent_deep_level: {{ parent_deep_level }}

				<div class="small text-muted">{{ i }}</div>

			</div>
		</div>
	</div>

	<div class="drop-area drop-area-below"
		v-show="is_droppable"
		@dragover.prevent
		@drop.prevent="drop(item, 'below')"
		@dragenter.prevent="drag_area_bottom_hovered=true"
		@dragleave.prevent="drag_area_bottom_hovered=false"
		></div>

	<div class="drop-here-bar"
		v-show="drag_area_bottom_hovered"
		></div>

</div>
</template>

<script>


// Props
const props = {
	item: Object,
	items_manager: Object,
}


const data = function() {
	let data = {}
	data.i = this.item
	data.drag_area_top_hovered = false
	data.drag_area_bottom_hovered = false
	return data
}


const watch = {
}


const computed = {
	is_dragged() {
		return Boolean(this.items_manager._item_dragged && this.items_manager._item_dragged._id == this.i._id)
	},
	is_droppable() {
		return Boolean(this.items_manager._item_dragged && this.items_manager._item_dragged._id != this.i._id)
	},
	parent_deep_level() {
		return this.items_manager.getParentIdDeepLevels(this.item.parent_id)
	},
}


const methods = {
	trash() {
		this.item.trashed = true
	},

	drop(item, place) {
		this.items_manager.moveItem(this.items_manager._item_dragged, item, place)
		this.items_manager._item_dragged = null
		this.drag_area_top_hovered = false
		this.drag_area_bottom_hovered = false
	},

	dragStart(item) {
		this.items_manager._item_dragged = item
	},

	dragEnd() {
		this.items_manager._item_dragged = null
	},

	textareaAutoResize() {
		this.$refs.textarea.style.height = 'auto'
		this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`
	},

}


const created = function() {
}


const mounted = function() {
	this.textareaAutoResize()
}


const components = {
}


// module.exports = {
export default {
	name: 'Item2',
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
	.edp-list-item {
		.drop-here-bar {
			position: absolute;
			right: 0;
			left: 0;
			border-top: 5px solid #dd05ae;
			transition: border-top 0.5s;
		}
		&.hovered-top {
			.drop-here-bar {
				top: -12px;
			}
		}
		&.hovered-bottom {
			.drop-here-bar {
				bottom: -12px;
			}
		}
		&.dragged {
			border: 1px solid rgb(42, 57, 199);
			opacity: 0.5;
		}
		&.droppable {
			.drop-area {
				z-index: 1;
			}
		}
		.drop-area {
			$middle: 50%;
			z-index: 0;
			// background-color: #6ac8ff;
			border: 1px solid red;
			opacity: 0.2;
			position: absolute;
			right: 0;
			left: 0;
			&.drop-area-above {
				background-color: #6aff8a;
				right: -10px;
				left: 10px;
				top: -5px;
				bottom: $middle;
			}
			&.drop-area-below {
				background-color: #6ac8ff;
				left: -10px;
				right: 10px;
				top: $middle;
				bottom: -5px;
			}
		}

		textarea {
			overflow: hidden;
			resize: none;
		}
	}
</style>
