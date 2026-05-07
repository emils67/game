import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

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
=======
// 1. SET THE PHYSICS CONSTANTS
const SPEED = 400
const JUMP_FORCE = 800
setGravity(2400) // This makes the player fall

// 2. DESIGN THE LEVEL
// "=" is a platform, "@" is where the player starts
addLevel([
    "                        ",
    "                        ",
    "                        ",
    "    @                   ",
    "                        ",
    "========================",
>>>>>>> eea4c7ddac30b82e42ca2a63d71b2c8c92cc9823
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

<<<<<<< HEAD
// 3. THE PLAYER
const player = add([
    rect(32, 48),
    pos(100, 100),
=======
// 3. ADD THE PLAYER
const player = add([
    rect(32, 48),
    pos(100, 100), // Starting position
>>>>>>> eea4c7ddac30b82e42ca2a63d71b2c8c92cc9823
    area(),
    body(), // This makes gravity affect the player
    color(0, 255, 0),
    {
        isSliding: false,
    }
])

<<<<<<< HEAD
// 4. MOVEMENT CONTROLS (WASD + ARROWS)

// Left Movement
onKeyDown("left", () => player.move(-SPEED, 0))
onKeyDown("a", () => player.move(-SPEED, 0))

// Right Movement
onKeyDown("right", () => player.move(SPEED, 0))
onKeyDown("d", () => player.move(SPEED, 0))

// Jump Function
const jump = () => {
=======
// 4. CONTROLS (WASD + ARROWS)

// Left
onKeyDown("left", () => {
    player.move(-SPEED, 0)
})
onKeyDown("a", () => {
    player.move(-SPEED, 0)
})

// Right
onKeyDown("right", () => {
    player.move(SPEED, 0)
})
onKeyDown("d", () => {
    player.move(SPEED, 0)
})

// Jump (Space or W or Up)
const jumpAction = () => {
>>>>>>> eea4c7ddac30b82e42ca2a63d71b2c8c92cc9823
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
}

<<<<<<< HEAD
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
=======
onKeyPress("space", jumpAction)
onKeyPress("w", jumpAction)
onKeyPress("up", jumpAction)

// 5. THE CAMERA
// This makes the screen follow the player as they race
onUpdate(() => {
    camPos(player.pos)
})
>>>>>>> eea4c7ddac30b82e42ca2a63d71b2c8c92cc9823
