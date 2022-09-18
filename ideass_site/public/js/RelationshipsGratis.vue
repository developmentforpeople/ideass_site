<template>
	<div class="dfp-component-relationships-gratis">
		<h2>RelationshipsGratis</h2>
		<p>Las relaciones sociales son la base de la sociedad humana. Necesitamos relacionarnos (y aceptar nuestras diferencias (Saber decir no, discrepar))</p>
		<p>Una relación es una o más conexiónes entre dos o más partes que intercambian (objetos, pensamientos, sentimientos,...)</p>
		<p>Se sustentan en: protocolos, normas o características</p>
		<p>Las relaciones sociales pueden ser:</p>
		<ul>
			<li>- Materiales: Involucran algún tipo de intercambio de objetos</li>
			<li>- Ideológicas: Son relaciones abstractas que se vinculan a lo moral, espiritual, político, etc.</li>
		</ul>

		<p>[ explorar ] [ crear una relación ]</p>


		<pre>{{ relationship }}</pre>

		<div>
			<b-field label="¿Quién eres?">
				<b-button @click="relationshipPartASet('person')" :type="relationship.part_a=='person'?'is-primary':''">una persona</b-button>
				&nbsp;
				<b-button @click="relationshipPartASet('group')" :type="relationship.part_a=='group'?'is-primary':''">un grupo de personas (equipo, empresa,...)</b-button>
			</b-field>

			<b-field label="que" v-if="relationship.part_a">
				<b-button @click="relationshipTypeSet('seeking')" :type="relationship.type=='seeking'?'is-primary':''">busco</b-button>
				&nbsp;
				<b-button @click="relationshipTypeSet('offering')" :type="relationship.type=='offering'?'is-primary':''">ofrezco</b-button>
			</b-field>

			<b-field label="a ¿quién o quiénes?" v-if="relationship.type">
				<b-button @click="relationshipPartBSet('person')" :type="relationship.part_b=='person'?'is-primary':''">otra persona</b-button>
				&nbsp;
				<b-button @click="relationshipPartBSet('group')" :type="relationship.part_b=='group'?'is-primary':''">un grupo de personas</b-button>
				&nbsp;
				<b-button @click="relationshipPartBSet('any')" :type="relationship.part_b=='any'?'is-primary':''">me da lo mismo</b-button>
			</b-field>


			<b-field label="¿para qué?" v-if="relationship.part_b">
				<b-button>ocio</b-button>
				&nbsp;
				<b-button>intercambio de bienes o servicios (comprar/vender/...)</b-button>
				&nbsp;
				<b-button>laboral o trabajo</b-button>
				&nbsp;
			</b-field>

		</div>

<pre>

</pre>

	</div>
</template>

<script>


// import Element from 'element-ui/lib/index.js'
// import locale from 'element-ui/lib/locale/lang/es'
// Vue.use(Element, { locale })


class Relationship {
	// amistad <> | compra < | venta > | intercambio <> |
	// iniciada por

	constructor() {
		this.part_a = '' // person | group 
		this.part_b = '' // person | group | any
		this.type = '' // seeking | offering (receiving | sending | )
	}
}


const props = {
}


const data = function() {
	let data = {}
	data.relationship = new Relationship()
	return data
}


const watch = {
}


const computed = {
}


const methods = {
	relationshipPartASet(type='') {
		this.relationship.part_a = type
	},
	relationshipPartBSet(type='') {
		this.relationship.part_b = type
	},
	relationshipTypeSet(type='') {
		this.relationship.type = type
	},
}


const created = function() {
}


const mounted = function() {
}


const components = {
}


export default {
	name: 'RelationshipsGratis',
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
