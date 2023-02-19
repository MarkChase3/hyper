let assets = {}
async function assetsLoad(){
	let res = await fetch('assets/list.txt')
	let text = await res.text()
	text.split('\n').forEach(async(el) => {
		if(el.slice(-4) == '.png'){
			assets[el] = new Image()
			assets[el].src = 'assets/' + el
		}
		if(el.slice(-5) == '.json'){
			assets[el] = await fetch('assets/'+el)
			assets[el] = JSON.parse(await assets[el].text())
		}
	})
}
let sprite, key, keys, clear, axisX, axisY, timers = [], timerStart, timerValue, random, width, height, dirX, dirY
assetsLoad().then(() => {
	console.log(assets);
	let canvas = document.getElementById('canvas')
	canvas.style.imageRendering = 'pixelated'
	let ctx = canvas.getContext('2d')
	ctx.imageSmoothingEnabled = false;
	sprite = (path, x, y, sx, sy) => {
		if(x ==	undefined || y == undefined){
			x = 0
			y = 0		
		}
		if(!sx  || !sy ){
			sx = 1;
			sy = 1;
		}
		ctx.save()
		ctx.scale(sx, sy)
		ctx.drawImage(assets[path], x, y)
		ctx.restore()
	}
	keys = {}
	document.body.onkeydown = (el) => {
		keys[el.key.toUpperCase()] = true
	}
	document.body.onkeyup = (el) => {
		keys[el.key.toUpperCase()] = false
	}
	key = (name) => {
		return keys[name.toUpperCase()]
	}
	clear = (color) => {
		if(color != undefined){
			ctx.fillColor =  color
		}
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
	axisX = () => {
		return (key('arrowleft') || key('a')? -1 : 0) + (key('arrowright') || key('d') ? 1 : 0)
	}
	axisY = () => {
		return (key('arrowup') || key('w')? -1 : 0) + (key('arrowdown') || key('s') ? 1 : 0)
	}
	width = (path) => {
		if(path == undefined){
			return canvas.width
		}
	}
	height = (path) => {
		if(path == undefined){
			return canvas.height
		}
	}
	random = (first, sec) => {
		if(first == undefined){
			return Math.floor(Math.random()*9999)
		}
	}
	dirX = (ax, ay, bx, by) => {
		return Math.cos(Math.atan2(by - ay, bx - ax))
	}
	dirY = (ax, ay, bx, by) => {
		return Math.sin(Math.atan2(by - ay, bx -  ax))
	}
	if(scale){
		canvas.width *= scale
		canvas.height *= scale
	}
	timerStart = (id) => {
		if(id > timers.length){
			timers.push(Date.now())
		} else {
			timers[id] = Date.now()
		}
	}
	timerValue = (id) => {
		return Date.now() - timers[id]
	}
	if(start){
		start()
	}
	if(update){
		(function real_update(){
			clear()
			update()
			window.requestAnimationFrame(real_update)
		})()
	}
})
