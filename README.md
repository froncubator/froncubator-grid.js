# Viking-grid

Cascading grid layout library - smooth and infinite

# Installation

```html
<script src="../viking-grid.js"></script>
<link rel="stylesheet" type="text/css" href="../viking-grid.css">
```

# Examples
___
# Initialize
```javascript
let parent = document.querySelector('.parent')
let vikingGrid = new VikingGrid( parent)
```
# Add in grid

```javascript
let template = `<div><p>Test description</p></div>`
vikingGrid.fillingGrid(template)
```

# Destroy grid

```javascript
vikingGrid.destroyGrid()
```

___

Viking-grid is freely distributable under the terms of the [MIT license](https://github.com/froncubator/viking-grid/blob/master/LICENSE).

