import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// 1. LOAD THE SPRITE
// We assume the sheet has 4 frames for idle, 6 for run, etc.
// Adjust 'sliceX' and 'sliceY' if the monster looks weird/cut off!
loadSprite("monster", "Pink_Monster_Idle_4.png", {
loadSprite("run-sprite", "Pink_Monster_Run_6.png", { sliceX: 12 })
    sliceX: 4, // Number of sprites in a horizontal row
    sliceY: 1, // Number of rows (change to 6 or 8 if it's a big square sheet)
    anims: {
        "idle": { from: 0, to: 1, loop: true },
        "run": { from: 2, to: 5, loop: true, speed: 10 },
    }
})

const SPEED = 480
const JUMP_FORCE = 900

setGravity(2600)

// 2. THE PLAYER
const player = add([
    sprite("monster", { anim: "idle" }),
    pos(100, 100),
    area(),
    body(),
    scale(2), // Makes the tiny pixel man bigger
])

// 3. CONTROLS WITH ANIMATIONS
onKeyDown("left", () => {
    player.move(-SPEED, 0)
    player.flipX = true // Face left
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run")
    }
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
    player.flipX = false // Face right
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run")
    }
})

// Go back to idle when keys are released
onKeyRelease(["left", "right"], () => {
    if (player.isGrounded()) {
        player.play("idle")
    }
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
        // No animation for jump yet until we know your sheet layout
    }
})

// 4. THE WORLD
add([
    rect(width() * 20, 48),
    pos(0, height() - 48),
    area(),
    body({ isStatic: true }),
    color(100, 100, 100),
])

onUpdate(() => {
    camPos(player.pos)
})
