# Viking-grid

Cascading grid layout library - smooth and infinite

# Installation

```html
<script src="../fc-grid.js"></script>
<link rel="stylesheet" type="text/css" href="../fc-grid.css">
```

# Examples
___
[Examples on jsfiddle.net](https://jsfiddle.net/AlexyKar/h32wszcn/4/)
___
# Initialize
```javascript
let parent = document.querySelector('.parent')
let grid = new fcGrid( parent)
```
# Add in grid

```javascript
let template = `<div><p>Test description</p></div>`
grid.fillingGrid(template)
```

# Destroy grid

```javascript
grid.destroyGrid()
```

___

Viking-grid is freely distributable under the terms of the [MIT license](https://github.com/froncubator/viking-grid/blob/master/LICENSE).

