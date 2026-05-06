import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

// Initialize Kaboom
kaboom({
    background: [30, 30, 30],
})

// 1. PHYSICS CONSTANTS
const SPEED = 440
const JUMP_FORCE = 800
const SLIDE_SPEED = 700
setGravity(2400) // This makes the player fall snappy

// 2. LEVEL DESIGN
// "=" is floor, "@" is player start
addLevel([
    "                                                           ",
    "                                                           ",
    "      @                                                    ",
    "                                                           ",
    "                                          =======          ",
    "===========================================================",
], {
    tileWidth: 40,
    tileHeight: 40,
    tiles: {
        "=": () => [
            rect(40, 40),
            area(),
            body({ isStatic: true }),
            color(80, 80, 80),
            "platform",
        ],
    },
})

// 3. THE PLAYER
const player = add([
    rect(32, 48),
    pos(100, 100),
    area(),
    body(),
    color(0, 255, 0),
    {
        isSliding: false,
    }
])

// 4. MOVEMENT CONTROLS (WASD + ARROWS)

// Left Movement
onKeyDown("left", () => player.move(-SPEED, 0))
onKeyDown("a", () => player.move(-SPEED, 0))

// Right Movement
onKeyDown("right", () => player.move(SPEED, 0))
onKeyDown("d", () => player.move(SPEED, 0))

// Jump Function
const jump = () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
}

onKeyPress("space", jump)
onKeyPress("w", jump)
onKeyPress("up", jump)

// 5. MOVEMENT TECH: THE SLIDE
// Hold 'S' or 'Down Arrow' to slide faster but lose jumping ability
onKeyDown("down", () => {
    if (player.isGrounded()) {
        const dir = isKeyDown("right") || isKeyDown("d") ? 1 : (isKeyDown("left") || isKeyDown("a") ? -1 : 0)
        player.move(dir * SLIDE_SPEED, 0)
        player.height = 24 // Squish the player
    }
})

onKeyRelease("down", () => {
    player.height = 48 // Back to normal
})

onKeyDown("s", () => {
    if (player.isGrounded()) {
        const dir = isKeyDown("right") || isKeyDown("d") ? 1 : (isKeyDown("left") || isKeyDown("a") ? -1 : 0)
        player.move(dir * SLIDE_SPEED, 0)
        player.height = 24 
    }
})

onKeyRelease("s", () => {
    player.height = 48 
})

// 6. THE CAMERA
// Keeps the player in the center of the screen
onUpdate(() => {
    camPos(player.pos)
})