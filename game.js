import kaboom from "kaboom"

kaboom({
    background: [30, 30, 30],
})

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

// 3. ADD THE PLAYER
const player = add([
    rect(32, 48),
    pos(100, 100), // Starting position
    area(),
    body(), // This makes gravity affect the player
    color(0, 255, 0),
])

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
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
}

onKeyPress("space", jumpAction)
onKeyPress("w", jumpAction)
onKeyPress("up", jumpAction)

// 5. THE CAMERA
// This makes the screen follow the player as they race
onUpdate(() => {
    camPos(player.pos)
})
