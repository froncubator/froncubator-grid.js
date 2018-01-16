
console.log('grid run!')
 
let fcGrid = function(parent, settings) {
	if (typeof(settings) != "object") settings = {}
	if (!settings.min) settings.min = 2
	if (!settings.max) settings.max = 6
	if (settings.min > settings.max) throw new Error('The maximum of the columns can not be less than the minimum')
	this.parent = parent
	this.minCols = settings.min
	this.maxCols = settings.max
	this.content = []
	this.colCount = 0

	this._creatGrid = function() {
		let parent = this.parent
		let columnSettings = this._defineСolumns(window.innerWidth)
		let widthElem = columnSettings.widthElem
		this.colCount = columnSettings.colCount

        //Create colls
		parent.insertAdjacentHTML('beforeend', '<div class="viking-grid"></div><div class="temp-grid"></div>')
		let vg = document.querySelector('.viking-grid')
		let tg = document.querySelector('.temp-grid')
		for (let i=0; i<this.colCount; i++) {
            vg.insertAdjacentHTML('beforeend', this._createCol(i, widthElem, 'vg'))
            tg.insertAdjacentHTML('beforeend', this._createCol(i, widthElem, 'tg'))
        }
	}

	//tamplate for columns
	this._createCol = function(orderNum, widthElm, settings) {
		if (settings == 'vg') return '<div class="col-elem" style="width:'+widthElm+'" id="col-'+orderNum+'" h="0"></div>'
		if (settings == 'tg') return '<div class="col-elem-temp" style="width:'+widthElm+'" id="col-temp-'+orderNum+'" h="0"></div>'
		
	}

	this.destroyGrid = function() {
		let elems = document.querySelector('.viking-grid')
		let elem = document.querySelector('.temp-grid')
		elems.parentNode.removeChild(elems)
		elem.parentNode.removeChild(elem)
		this._creatGrid()
	}

	this._loadBox = function(index, content) {
		let currentCol = document.querySelector('#col-' + index)
		currentCol.insertAdjacentHTML('beforeend', `<div class="grid-item">${content}</div>`)
	}

	this._allImageLoaded = function(allImageArr, imgs, colCount) {
		allImageArr.push(1)
		if (allImageArr.length == imgs.length) {
			let minCol = 0
			let elems = document.querySelectorAll('.temp-grid div[ht]')
			for (let elem of elems) {
				let min = 99999999
				let currentCol = document.querySelector('#col-' + minCol)
				let newSize = currentCol.getAttribute('h') *1 + elem.attributes.ht.value*1
				currentCol.setAttribute('h', newSize)
				currentCol.appendChild(elem)
				for (let c=0; c<colCount; c++) {
					let hAttr = document.querySelector('#col-' + c).getAttribute('h') * 1
					if (min >= hAttr) {
						min = hAttr
						minCol = c
					}
				}
			}
		}
	}

	//grid filling
	this.fillingGrid = function(contents) {
		let self = this
		let imgs = []
		let allImageArr = []
		if (contents) this.content = this.content.concat(contents)
		if (this.content.length > 0) {
			let index = 0
	        for (let i=0; i<this.content.length; i++) {
	        	let content = this.content[i]
	        	let wrapperBoxTmp = ``
	            // Выделяем current колонки
	            if (index % this.colCount == 0) {
	                index = 0
	            }

				if (content.indexOf('img src=') != -1) {
					let obj = {
						content: '',
						src: ''
					}
					var tmp = document.createElement('div')
					tmp.innerHTML = content
					var src = tmp.querySelector('img').getAttribute('src')
					obj.content = content
					obj.src = src
					imgs.push(obj)
				} else {
					self._loadBox(index, content)
				}
	            index++
	      	}
	      	if (imgs.length > 0) {
	      		let index = 0
				for (let obj of imgs) {
		            if (index % this.colCount == 0) {
		                index = 0
		            }
		            let currentCol = document.querySelector('#col-temp-' + index)
					let img = new Image()
					img.onload = function(e) {
						let elem = document.createElement('div')
						elem.setAttribute('class', 'grid-item')
						elem.insertAdjacentHTML('beforeend', obj.content)
						let result = currentCol.appendChild(elem)
						result.setAttribute('ht', result.offsetHeight)
						self._allImageLoaded(allImageArr, imgs, self.colCount)
					}
					img.src = obj.src
					index++
				}	      		
	      	}
		}
	}

	//Set the number of columns for the screen
	this._defineСolumns = function(windowWidth) {
	    let obj = {
	    	colCount: 0,
	    	widthElem: ''
	    }
	    if (windowWidth <= 768) {
	        obj.colCount = 2
	        obj.widthElem = '48%'
	    } else if (windowWidth > 768 && windowWidth <= 1025) {
	        obj.colCount = 3
	        obj.widthElem = '32%'
	    } else if (windowWidth > 1025 && windowWidth <= 1340) {
	        obj.colCount = 4
	        obj.widthElem = '24%'
	    } else if (windowWidth > 1340 && windowWidth <= 1600) {
	        obj.colCount = 5
	        obj.widthElem = '19%'
	    } else if (windowWidth > 1600) {
	        obj.colCount = 6
	        obj.widthElem = '16%'
	    }
	    return obj
	}

	//rebuild the grid when changing the width of the screen
	let self = this
	this._resizeGrid = function() {
        let resizeGridTimer = null
        window.onresize = function(event) {
            clearTimeout(resizeGridTimer)
            resizeGridTimer = setTimeout(function(){
				let elems = document.querySelector('.viking-grid')
				elems.parentNode.removeChild(elems)
				self._creatGrid()
				self.fillingGrid()
            }, 200)
        }
	}
	this._resizeGrid()
	this._creatGrid()
}