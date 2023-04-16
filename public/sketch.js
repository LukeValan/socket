let socket

function setup() {
  createCanvas(400, 400);
  socket = io.connect('lukesocket.onrender.com:3000')
  socket.on('mouse', newDrawing)
}

function draw() {
  //background(220);
}

function mouseDragged() {
  push()
  noStroke()
  fill('black')
  let data = {
    x: mouseX,
    y: mouseY
  }
  console.log('Sending: '+data.x + ', ' + data.y)
  ellipse(data.x, data.y, 20)
  pop()

  socket.emit('mouse', data)
}

function newDrawing(data) {
  push()
  noStroke()
  fill('grey')
  console.log("Receiving from "+socket.id+" : "+data.x+", "+data.y)
  ellipse(data.x, data.y, 20)
  pop()
}
