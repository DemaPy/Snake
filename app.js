const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 600
canvas.height = 600


class Ball {
    constructor({position}) {
        this.position = position

        const speed = 2
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -speed : speed,
            y: Math.random() - 0.5 >= 0 ? -speed : speed,
        }
        this.velocity = {
            x: direction.x,
            y: direction.y
        }

        this.width = 20
        this.height = 20
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        const rightSide = this.position.x + this.width + this.velocity.x
        const leftSide = this.position.x + this.velocity.x
        const bottomSide = this.position.y + this.height
        const topSide = this.position.y

        if (rightSide >= paddle2.position.x && bottomSide >= paddle2.position.y && topSide <= paddle2.position.y + paddle2.height) {
            this.velocity.x = -this.velocity.x
        }

        if (leftSide <= paddle1.position.x + paddle1.width && bottomSide >= paddle1.position.y && topSide <= paddle1.position.y + paddle1.height) {
            this.velocity.x = -this.velocity.x
        }

        if (this.position.y + this.height + this.velocity.y >= canvas.height || this.position.y + this.velocity.y <= 0) {
            this.velocity.y = -this.velocity.y
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Paddle {
    constructor({position}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 10
        this.height = 100
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        if (this.position.y + this.velocity.y > 0 && this.position.y + this.height + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y
        } else {
            console.log('problem');
        }
    }
}

const paddle1 = new Paddle({position: {
    x: 10,
    y: 100,
}})

const paddle2 = new Paddle({position: {
    x: canvas.width - 10 * 2,
    y: 100,
}})

const ball = new Ball({position: {
    x: canvas.width/2,
    y: canvas.height/2,
}})

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    paddle1.update()
    paddle2.update()
    ball.update()
}

animate()

addEventListener('keydown', (e) => {
    const speed = 6
    switch(e.key) {
        case 's':
            paddle1.velocity.y = speed
            break
        case 'w':
            paddle1.velocity.y = -speed
            break
        case 'ArrowUp':
            paddle2.velocity.y = -speed
            break
        case 'ArrowDown':
            paddle2.velocity.y = speed
            break
    }
})