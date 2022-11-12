<template>
	<div class="dfp-component-list2">
		<h2>Intro</h2>
		<p>
			You can write, <code>Supr</code>, <code>← Backspace</code>, <code>Enter</code> & <code>←</code> <code>↑</code> <code>↓</code> <code>→</code><br>
			Manage identation with <code>Tab</code> and <code>Shift</code> + <code>Tab</code><br>
			 <!-- Indent/Outdent line: <code>Tab</code> / <code>Shift</code> + <code>Tab</code> -->
			Open & close trees with <code>Ctrl</code> + <code>↓</code> and <code>Ctrl</code> + <code>↑</code><br>
			Drag & drop items!<br>
			Add new lines inside item with <code>Shift</code> + <code>Enter</code>
		</p>
		<h2>Example</h2>
		<div class="row my-5">
			<div class="col-md-4">
				<ul>
					<list-item2 :item="item" :global="global"></list-item2>
				</ul>
				<h2>Import</h2>
				<textarea class="export" v-model="source"></textarea>
				<button @click="importSource">Importar</button>
				<h2>Export</h2>
				<textarea class="export">{{minify(item)}}</textarea>
			</div>
			<div class="col-md-4">
				<ul>
					<list-item2 :item="item2" :global="global"></list-item2>
				</ul>
				<h2>Export</h2>
				<textarea class="export">{{minify(item2)}}</textarea>
			</div>
			<div class="col-md-4">
				<ul>
					<list-item2 :item="item3" :global="global"></list-item2>
				</ul>
				<h2>Export</h2>
				<textarea class="export">{{minify(item3)}}</textarea>
			</div>
		</div>
		<h2>Functionalities</h2>
		<ul>
			<li>Item are keyboard editable: write, delete, enter, arrow keys, tab, shift + tab,...</li>
			<li>Arrow keys, Del, Supr, Enter, tab, shift+tab,... acts and moves cursor as expected with multiple lines text.</li>
			<li>Items can be duplicated, deleted, dragged & dropped (even between lists)</li>
			<li>Trees can be opened or closed</li>
			<li>Tree open/close status can be saved (exported)</li>
			<li>Item supports multiple lines (shift + enter)</li>
			<li>Implement UNDO Ctrl + Z</li>
			<li>TODO: export/import (ul>lis, html, json,...)</li>
			<li>TODO: import html on the fly using css selector into actual document</li>
			<li>TODO: Import/load from url</li>
			<li>TODO: select one or several, copy, paste</li>
			<li>TODO: search / filter</li>
			<!-- <li>TODO: item styling (code, small, image, etc.)</li> -->
			<li>TODO: item "type": code, small, image, video, encrypted, iframe, etc.</li>
			<li>TODO: long words showed into several lines!!! (now text is hidden inside textarea)</li>
			<li>TODO: Version history</li>
			<li>TODO: Enable in menu: removeFromThisItemToEndSameLevel, removeFromStartToThisItemSameLevel</li>
</ul>
	</div>
</template>

<script>

// TODO: make an "item" prototype
// const item = {
// 	content: '',
// } 

class Global {
	constructor() {
		console.log('Global.constructor()')
		this.counter = 0
		this._drag_from = null
		this._drag_to = null
	}

	get drag_from() {
		return this._drag_from
	}
	set drag_from(value) {
		this._drag_from = value
	}

	get drag_to() {
		return this._drag_to
	}
	set drag_to(value) {
		this._drag_to = value
	}
}
let global = new Global()

let items = [{
  "content": "Main Title",
  "children": [
    {
      "content": "Y estos caracteres!¿!¿!¿ ❤️ 📈 🎨"
    },
    {
      "content": "333"
    },
    {
      "content": "444"
    },
    {
      "content": "555"
    },
    {
      "content": "666\n  SEGUNDA LÍNEA\n  TERCERA LÍNEA\n  CUARTA LÍNEA"
    },
    {
      "content": "BBB",
      "children": [
        {
          "content": "CCC"
        },
        {
          "content": "DDD"
        },
        {
          "content": "EEE"
        },
        {
          "content": "FFF"
        }
      ],
    },
    {
      "content": "GGG"
    },
    {
      "content": "222"
    },
    {
      "content": "hello",
      "children": [
        {
          "content": "child folder",
          "children": [
            {
              "content": "hello",
              "children": [
                {
                  "content": "pepe",
                  "children": [
                    {
                      "content": "pepe",
                      "children": [
                        {
                          "content": "pepe",
                          "children": [
                            {
                              "content": "pepe"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              "_closed": true
            },
            {
              "content": "wat"
            }
          ]
        }
      ]
    },
    {
      "content": "wat"
    },
    {
      "content": "child folder",
      "children": [
        {
          "content": "child folder",
          "children": [
            {
              "content": "hello"
            },
            {
              "content": "wat"
            }
          ],
          "_closed": true
        },
        {
          "content": "hello"
        },
        {
          "content": "wat"
        },
        {
          "content": "child folder",
          "children": [
            {
              "content": "hello"
            },
            {
              "content": "wat"
            }
          ]
        }
      ]
    }
  ]
}]

let items2 = [
	{
		"content": "111"
	},
	{
		"content": "222",
		"children": [
			{
				"content": "Y estos caracteres!¿!¿!¿ ❤️ 📈 🎨\nY estos caracteres!¿!¿!¿ ❤️ 📈 🎨\nY estos caracteres!¿!¿!¿ ❤️ 📈 🎨\nY estos caracteres!¿!¿!¿ ❤️ 📈 🎨\nY estos caracteres!¿!¿!¿ ❤️ 📈 🎨"
			}
		]
	},
	{
		"content": "333",
		"children": [
		{
			"content": "333 - 111"
		},
		{
			"content": "333 - 222"
		},
		{
			"content": "333 - 333"
		},
		]
	}
]

let items3 = []



import ListItem2 from './ListItem2.vue'


const methods = {
	importSource() {
		console.log('IMPORT SOURCE!!!', this.source)
		let parsed = null
		try {
			parsed = JSON.parse(this.source)
		} catch (e) {
			console.error('ERROR PARSEANDO!', e)
		}
		if (parsed && 'children' in parsed) {
			this.item.children.push(...parsed.children)
			this.source = ''
		} else {
			let items_raw = this.source.split('\n')
			if (items_raw) {
				items_raw.forEach(item_raw => {
					let item = {
						content: item_raw,
					}
					this.item.children.push(item)
				})
			}
			this.source = ''
		}
	},
	minify(object) {
		return JSON.stringify(object, null, 0)
	},

}


const data = function() {
	let data = {}
	data.global = global
	data.source = ''
	// data.field_content = 'content'
	// data.field_children = 'children'
	data.item = { content: 'ROOT', children: items }
	data.item2 = { content: 'ROOT', children: items2 }
	data.item3 = { content: 'ROOT', children: items3 }
	return data
}


const components = {
	ListItem2,
}


const mounted = function() {
}


// module.exports = {
export default {
	name: 'List2',
	data,
	methods,
	components,
	mounted,
}
</script>

<style scoped>
/* local styles */

</style>

<!-- style lang="scss" scoped> -->
<style lang="scss">
/* global styles */
	// @import "../../scss/variables.scss";

	$blue: #116f9b;
	// $grey: #888888;

	.dfp-component-list2 {
		a {
			color: $blue;
			text-decoration: none;
		}

		ul {
			padding-left: 18px;
			line-height: 1.5em;
			list-style: none;
			li {
				position: relative;
				&.dragged {
					opacity: 0.4;
				}
				&.dragged-on {
					background-image: linear-gradient(45deg, rgba($blue, 0.05), transparent);
					border-top: 1px solid $blue;
				}
				&.is-droppable {
				}
				&.is-focused {
					> .line {
						.actions {
							a {
								opacity: 0.5;
							}
						}
					}
				}
				.line {
					margin-left: -80px;
					padding-left: 85px;
					&:hover{
						.actions {
							a {
								opacity: 0.5;
							}
						}
					}
					.actions {
						text-align: right;
						width: 100px;
						position: absolute;
						top: 0;
						left: -100px;
						padding: 0 15px 0 0;
						a {
							color: $blue;
							overflow: hidden;
							width: 16px;
							height: 20px;
							display: inline-block;
							text-align: center;
							font-size: 14px;
							transition: opacity .5s;
							opacity: 0;
							&:hover {
								opacity: 1;
							}
						}
					}
					.actions-right {
						position: absolute;
						left: -10px;
						width: 10px;
						text-align: center;
						.anchor {
						}
						.opener {
						}
					}
					.content {
						// .read-only {
						// 	// visibility: visible;
						// 	// Break long words to newlines
						// 	-ms-word-break: break-all;
						// 	word-break: break-all;
						// 	white-space: pre-wrap;
						// }
						textarea {
							border-radius: 4px;
							background-color: transparent;
							resize: none;
							padding: 0 5px;
							width: 100%;
							border: 0;
							display: block;
							box-sizing: padding-box;
							overflow: hidden;
							&:focus {
								outline: 0px solid transparent;
							}
							&:hover:not(:focus),
							&:focus {
								background-image: linear-gradient(45deg, rgba($blue, 0.05), transparent);
							}
						}
					}
				}
			}
		}
		.export {
			width: 100%;
			height: 100px;
			// overflow: auto;
			border: 1px solid $blue;
			background-color: white;
			padding: 4px;
			font-size: 8px;
			line-height: 8px;
		}
	}
</style>
