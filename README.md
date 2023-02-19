# HYPER
A hyper javascript game engine.

## Why?
The idea here is to jump from a game framewrok to a real engine with some really simple UI. Just 'cause I thought it could be fun.

## How?
I am trying to implement everything in a jquery like way, where every function is concise and wraps lots of different things accordingly to the arguments
For example, here's a game where you run from enemies infinitely:

  ````
  let scale = 2
  let x = 0, y = 0
  let enemies = []
  function start(){
    timerStart(0)
  }
  function update(dt){
    x += axisX() * 2
    y += axisY() * 2
    sprite('img.png', x, y)
    if(timerValue(0) > 5000){
      timerStart(0)
      enemies.push({
        x: random()%width(), y: random()%height()
      })
    }
    enemies.forEach((el, i, arr) => {
      sprite('img2.png', el.x, el.y)
      arr[i].x += dirX(el.x, el.y, x, y)
      arr[i].y += dirY(el.x, el.y, x, y)
    })
  }
  ````
  
  Considering a folder called assets with img.png, img2.png and list.txt including them.
  
## Assets
For now, hyper just loads .png and .json files, but it loads all listed in assets/list.txt.

For example:
  
  ````
  img.png
  img2.png
  map.json
  ````

## Docs
Look at the wiki
