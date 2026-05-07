import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// 1. LOAD THE INDIE HERO (8-bit style with animations)
loadSprite("hero", "https://kaboomjs.com/sprites/guy.png", {
    sliceX: 10, // The image has 10 frames in a row
    anims: {
        "idle": { from: 0, to: 0 },
        "run": { from: 2, to: 5, loop: true, speed: 12 },
        "jump": { from: 6, to: 6 },
        "roll": { from: 7, to: 9, loop: true, speed: 20 },
    }
})

const SPEED = 480
const ROLL_SPEED = 900
const JUMP_FORCE = 950

setGravity(2800)

// 2. THE PLAYER
const player = add([
    sprite("hero", { anim: "idle" }),
    pos(100, 100),
    area(),
    body(),
    scale(2), // Scale him up so he's not TOO tiny
    { isRolling: false }
])

// 3. MOVEMENT & ANIMATION LOGIC
onKeyDown("left", () => {
    if (!player.isRolling) {
        player.move(-SPEED, 0)
        player.flipX = true
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
    }
})

onKeyDown("right", () => {
    if (!player.isRolling) {
        player.move(SPEED, 0)
        player.flipX = false
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
    }
})

// Return to idle when keys are released
onKeyRelease(["left", "right", "a", "d"], () => {
    if (player.isGrounded() && !player.isRolling) {
        player.play("idle")
    }
})

// 4. THE ROLL (Shift or S)
const startRoll = () => {
    if (player.isGrounded() && !player.isRolling) {
        player.isRolling = true
        player.play("roll")
        
        const dir = player.flipX ? -1 : 1
        player.vel.x = dir * ROLL_SPEED

        wait(0.4, () => {
            player.isRolling = false
            player.play("idle")
        })
    }
}

onKeyPress("s", startRoll)
onKeyPress("shift", startRoll)

// 5. JUMP
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
        player.play("jump")
    }
})

// 6. THE WORLD
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
