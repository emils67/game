import kaboom from "kaboom"

// Initialize context
kaboom({
    background: [20, 20, 20], // Dark background
})

// Define constants for movement
const SPEED = 320
const JUMP_FORCE = 640
const SLIDE_SPEED = 600

// Load a simple square for the player (or use an image later)
addLevel([
    "================",
    "=              =",
    "=              =",
    "=      @       =",
    "=              =",
    "================",
], {
    tileWidth: 40,
    tileHeight: 40,
    tiles: {
        "=": () => [
            rect(40, 40),
            area(),
            body({ isStatic: true }),
            color(100, 100, 100),
            "platform",
        ],
    },
})

// Add player
const player = add([
    rect(32, 48),
    pos(80, 80),
    area(),
    body(),
    color(0, 255, 0),
])

// --- MOVEMENT TECH LOGIC ---

onKeyDown("left", () => {
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
})

// Slide Mechanic (The "Tech")
onKeyDown("down", () => {
    if (player.isGrounded()) {
        // Boost speed while holding down
        const dir = isKeyDown("right") ? 1 : isKeyDown("left") ? -1 : 0
        player.move(dir * SLIDE_SPEED, 0)
        player.height = 24 // Squish the player to slide under gaps
    }
})

onKeyRelease("down", () => {
    player.height = 48 // Return to normal height
})