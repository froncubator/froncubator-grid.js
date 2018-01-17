
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

	this.destroyGrid = function(settings='user') {
		let elems = document.querySelector('.viking-grid')
		let elem = document.querySelector('.temp-grid')
		elems.parentNode.removeChild(elems)
		elem.parentNode.removeChild(elem)
		if(settings == 'user') this._creatGrid()
	}

	this._loadBox = function(index, content) {
		let currentCol = document.querySelector('#col-temp-' + index)
		let elem = document.createElement('div')
		let spinner = document.createElement('div')
		elem.setAttribute('class', 'grid-item')
		elem.insertAdjacentHTML('beforeend', content)
		elem.insertAdjacentHTML('beforeend', `<div class="vg-loader"><div class="loader-grid"></div></div>`)
		let result = currentCol.appendChild(elem)
		result.setAttribute('ht', result.offsetHeight)
	}

	this._allImageLoaded = function(allImageArr, allContent, imgs, contents, colCount, check) {
		if (check == 'img') {
			allImageArr.push(1)
		}
		allContent.push(1)
		if (allImageArr.length == imgs.length && allContent.length == contents.length) {
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
			let allSpinners = document.querySelectorAll('.vg-loader')
			for (let i of allSpinners) {
				i.setAttribute('class', 'opacity-grid vg-loader')
			}
		}
	}

	//grid filling
	this.fillingGrid = function(contents, settings) {
		let self = this
		let imgs = []
		let allImageArr = []
		let allContent = []
		if (settings != 'resize') {
			this.content = this.content.concat(contents)
		} 
		if (this.content.length > 0) {
			let index = 0
 			for (let i=0; i<contents.length; i++) {
 				let content = this.content[i]
				if (content.indexOf('img src=') != -1) {
					let tmp = document.createElement('div')
					tmp.innerHTML = content
					let src = tmp.querySelector('img').getAttribute('src')
					imgs.push(src)
				} 				
 			}

	        for (let i=0; i<contents.length; i++) {
	        	let content = this.content[i]
	            if (index % this.colCount == 0) {
	                index = 0
	            }

				if (content.indexOf('img src=') != -1) {
					let tmp = document.createElement('div')
					tmp.innerHTML = content
					let src = tmp.querySelector('img').getAttribute('src')
		            let currentCol = document.querySelector('#col-temp-' + index)
					let img = new Image()
					img.onload = function(e) {
						let elem = document.createElement('div')
						let spinner = document.createElement('div')
						elem.setAttribute('class', 'grid-item')
						elem.insertAdjacentHTML('beforeend', content)
						elem.insertAdjacentHTML('beforeend', `<div class="vg-loader"><div class="loader-grid"></div></div>`)
						let result = currentCol.appendChild(elem)
						result.setAttribute('ht', result.offsetHeight)
						self._allImageLoaded(allImageArr, allContent, imgs, contents, self.colCount, 'img')
					}
					img.src = src
				} else {
					self._loadBox(index, content)
					self._allImageLoaded(allImageArr, allContent, imgs, contents, self.colCount)
				}
	            index++
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
				self.destroyGrid('resize')
				self._creatGrid()
				self.fillingGrid(self.content, 'resize')
            }, 200)
        }
	}
	this._resizeGrid()
	this._creatGrid()
}