let buttons = []

class Button {
    constructor(x, y, d, purpose, t) {
        this.x = x
        this.y = y 
        this.d = d 
        this.purpose = purpose
        this.t = t

        this.border = {Color:{r:250, g:250, b:250, a:250}, w:this.d/12}
        this.fill = {Color:{r:50, g:50, b:50, a:250}}
        this.text = {t:this.t, size:this.d/1.0}

        buttons.push(this)
    }

    show() {
        push()
        fill(this.fill.Color.r, this.fill.Color.g, this.fill.Color.b, this.fill.Color.a)
        stroke(this.border.Color.r, this.border.Color.g, this.border.Color.b, this.border.Color.a)
        strokeWeight(this.border.w)
        textAlign(CENTER, BOTTOM)
        ellipse(this.x, this.y, this.d)
        noStroke()
        fill(c.r, c.g, c.b)
        textSize(text.size)
        text(this.t, this.x, this.y+this.d)
        pop()
    }

}