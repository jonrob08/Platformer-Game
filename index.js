console.log('connected')

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// same as window.innerWidth
canvas.width = innerWidth
canvas.height = innerHeight

// Setting the gravity to be applied to the Player on the y axis
const gravity = 0.05

// Setting up Player Class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        },
        this.width = 100
        this.height = 100
        // Initializing velocity at 0
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        // Drawing Player
        ctx.fillStyle = 'red'
        ctx.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }

    update() {
        // Update runs in the recursive animate function so it will constantly update the Player on the canvas 
        this.draw()

        // Players position on the y axis is increased by the velocity 
        this.position.y += this.velocity.y

        // Players position on the x axis is increased by the velocity 
        this.position.x += this.velocity.x

        // If Players position on the y axis plus the players height (which will give us the bottom of the Player) plus the velocity of the player on the y axis is less than the canvas height then add gravity, else set velocity equal to zero, effectively stopping the player from falling through the bottom of the canvas.
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        {this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

// Setting up Platform Class

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Create new Player
const player = new Player()
const platforms = [new Platform({ x: 200, y: 100}), new Platform({ x: 300, y: 400})]


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


// Animate function that calls requestAnimationFrame() and passes in itself so that it gets called constantly
function animate() {
    requestAnimationFrame(animate)
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Draw and update the player position and apply gravity
    player.update()

    // Draw and update the platforms array position and apply velocity
    platforms.forEach(platform => {
        platform.draw()
    })

    // Player movement based on if key is pressed or not pressed
    if (keys.d.pressed && player.position.x < 400) {
        player.velocity.x = 3
    } else if (keys.a.pressed && player.position.x > 100) {
        player.velocity.x = -3
    } else {
        player.velocity.x = 0

        if (keys.d.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 3
            })
        } else if (keys.a.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 3
            })
        }
    }

    // Adding rectangular platform collision detection -

    // If the Player's position on the y axis plus their height (gives us the bottom of the player) is less than (or higher on the canvas) than the platform's y position, 

    // And if the Player's position on the y axis plus their height plus their velocity (which gives us the bottom of the Player as it moves up and down) is greater than the platforms y position,

    // And if

    //then set the player's velocity to 0
    platforms.forEach(platform => {
    
        if (
            player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x && 
            player.position.x <= platform.position.x + platform.width
            ){
            player.velocity.y = 0
        }
    })
}


animate()

// EVENT LISTENERS - 
// Listen for keys on keydown add or subtract velocity
// Listen for keys on keyup to set velocity to 0
addEventListener('keydown', ({ key }) => {
    console.log(key)
    switch(key) {
        case 'w':
            player.velocity.y -= 5
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            console.log('s')
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
    console.log(player.velocity.y)
})

addEventListener('keyup', ({ key }) => {
    console.log(key)
    switch(key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
