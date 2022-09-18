
export {
	Tools,
}


class Tools {

	static getValuesFromObjectsProperty(objects_array, field_name) {
		let output = []
		for (let i=0; i < objects_array.length ; ++i) {
			output.push(objects_array[i][field_name])
		}
		return output
	}

	static getObjectByPropertyValue(objects_array, field_name, field_value) {
		for (let i=0; i < objects_array.length ; ++i) {
			if (objects_array[i][field_name] == field_value) {
				return objects_array[i]
			}
		}
		return null
	}

	/**
	 * Set caret (cursor) when focusing field/contenteditable.
	 * 
	 * @param {object} element Dom element
	 * @param {number} position Position for caret. Use -1 for last position.
	 */
	static caretPositionSet(element, position = 0) {
		if (element.childNodes[0]) {
			// const element_length = element.childNodes[0].textContent.length
			const element_length = element.innerText.length
			if (element_length > 0) {
				const range = document.createRange()
				const sel = window.getSelection()
				range.setStart(element.childNodes[0], position == -1 ? element_length : position)
				range.collapse(true)
				sel.removeAllRanges()
				sel.addRange(range)
				return true
			}
		}
		element.focus()
		return true
	}

	/**
	 * Get caret (cursor) from focused element.
	 * 
	 * @param {object} element Dom element
	 */
	static caretPositionGet(element) {
		var caretPos = 0,
			sel, range;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				if (range.commonAncestorContainer.parentNode == element) {
					caretPos = range.endOffset;
				}
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			if (range.parentElement() == element) {
				var tempEl = document.createElement("span");
				element.insertBefore(tempEl, element.firstChild);
				var tempRange = range.duplicate();
				tempRange.moveToElementText(tempEl);
				tempRange.setEndPoint("EndToEnd", range);
				caretPos = tempRange.text.length;
			}
		}
		return caretPos;
	}
}
