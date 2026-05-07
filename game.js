import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// Add a simple floor
add([
    rect(width(), 48),
    pos(0, height() - 48),
    area(),
    body({ isStatic: true }),
    color(127, 127, 127),
])

// Add the player
const player = add([
    rect(32, 48),
    pos(100, 100),
    area(),
    body(),
    color(0, 255, 0),
])

setGravity(2400)

// Basic movement
onKeyDown("left", () => player.move(-400, 0))
onKeyDown("right", () => player.move(400, 0))
onKeyPress("space", () => {
    if (player.isGrounded()) player.jump(800)
})

// Debug text to prove it's working
add([
    text("Press arrows to move"),
    pos(24, 24),
])
