let socket
let factor, type
let c;
let shapeMode = 1;
let size = 20;

let colorChangeButton;
let shapeChangeButton;
let sizeChangeButton;
let createOrJoinLobbyButton;

let expecting = false

let serverData = {
  lobbies:[],

}

function setup() {

  createCanvas(800, 500);
  windowResize()
  socket = io.connect('localhost:3240')
  socket.on('mouse', newDrawing)
  socket.on("info", updateServerData(data))
  background(0)
  c = { r: round(random(0, 255)), g: round(random(0, 255)), b: round(random(0, 255)) }

  colorChangeButton = new Button(n(35), n(465), n(30), function () {
    c = { r: round(random(0, 255)), g: round(random(0, 255)), b: round(random(0, 255)) }
  }, "Color")

  colorChangeButton = new Button(n(105), n(465), n(30), function () {
    if(shapeMode == 1) {
      shapeMode = 2
    }else {
      shapeMode = 1
    }
  }, "Shape")

  sizeChangeButton = new Button(n(175), n(465), n(30), function () {
    let s = parseInt(prompt("Type the wanted size: (Default:20)"))
    if(s) {
      size = s
    }
  }, "Size")

  createOrChangeButton = new Button(n(245), n(465), n(30), function () {
    let name = prompt("Type the name of a lobby to join or create it:")
    for(let i = 0; i < serverData.lobbies.length; i++) {
      if(name == serverData.lobbies[i]) {
        let data = {
          join:name
        }
        socket.emit("wants to join room", data)
      }
    }
  }, "Lobby")
}

function draw() {
  // console.log('draw() called')
  //background(220);
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].show()
  }

  
}

function mouseDragged() {
  if (mouseX < windowWidth && mouseY < windowHeight && mouseX > 0 && mouseY > 0) {
    push()
    noStroke()
    fill(c.r, c.g, c.b)
    let data = {
      x: map(mouseX, 0, 800 * factor, 0, 800),
      y: map(mouseY, 0, 500 * factor, 0, 500),
      c: c,
      s:size,
      t:shapeMode
    }
    console.log('Sending: ' + data.x + ', ' + data.y)
    if(shapeMode == 1) {
      ellipse(n(data.x), n(data.y), n(size))
    }else {
      rect(n(data.x), n(data.y), n(size), n(size))
    }
    
    pop()

    socket.emit('mouse', data)
  }

}

function newDrawing(data) {
  push()
  noStroke()
  fill(data.c.r, data.c.g, data.c.b)
  console.log("Receiving from " + socket.id + " : " + data.x + ", " + data.y)
  if(data.t == 1) {
    ellipse(n(data.x), n(data.y), n(data.s))
  }else {
    rect(n(data.x), n(data.y), n(data.s), n(data.s))
  }
  
  pop()
}

function windowResize() {
  let x, y
  if (windowHeight > windowWidth) {
    x = windowWidth
    y = 500 * (windowWidth / 800)
    factor = windowWidth / 800
    type = "y"
  } else {
    x = 800 * (windowHeight / 500)
    y = windowHeight
    factor = windowHeight / 500
    type = "x"
  }
  resizeCanvas(x, y)
}

function n(value) {
  return value * factor
}

function mouseClicked() {
  for (let i = 0; i < buttons.length; i++) {
    if (dist(mouseX, mouseY, buttons[i].x, buttons[i].y) <= buttons[i].d) {
      buttons[i].purpose()
    }
  }

}

function updateServerData() {
  serverData.lobbies =
}