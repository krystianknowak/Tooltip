# Tooltip component

Simple reusable tooltip web component created with vanilla js.

## Getting started

#### Get the Code

```
git clone https://github.com/krystianknowak/Tooltip.git
```
#### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:
```
npm install
```
## Usage Instructions

To run test application go to dist folder and run index.html.

After making changes run ```npm run build```.


## Examples:

#### Tooltip component takes three arguments:

- tooltip-for - should contain id of element we want to showing tooltip for 
```
<button id="simpleTooltip">CLICK HERE</button>
<tool-tip  tooltip-for="simpleTooltip">
	<span>Nice span</span>
	<button>Click</button>
</tool-tip>
```
- clicked - boolean property, use it if you want tooltip run on click
```
<button id="clicker">CLICK HERE</button>
<tool-tip  tooltip-for="clicker" clicked>
	<span>Nice span</span>
	<button>Click</button>
</tool-tip>
```
- content - property for tooltip content, by default content of tooltip works with transclusion
```
<button id="hoverer">CLICK HERE</button>
<tool-tip  tooltip-for="hoverer" content="Nice content">
</tool-tip>
```

 ## Further help
 To get more info about web components check the [web components](https://www.webcomponents.org/).
