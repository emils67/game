import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// Use the built-in Bean mascot (No file download needed)
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png")

const SPEED = 480
const ROLL_SPEED = 950 
const JUMP_FORCE = 950 

setGravity(2800)

const player = add([
    sprite("bean"),
    pos(100, 100),
    area(),
    body(),
    scale(1.5),
    { isRolling: false }
])

// MOVEMENT
onKeyDown("left", () => {
    if (!player.isRolling) {
        player.move(-SPEED, 0)
        player.flipX = true
    }
})

onKeyDown("right", () => {
    if (!player.isRolling) {
        player.move(SPEED, 0)
        player.flipX = false
    }
})

// ROLL (Press S, Down, or Shift)
const startRoll = () => {
    if (player.isGrounded() && !player.isRolling) {
        player.isRolling = true
        const dir = player.flipX ? -1 : 1
        player.vel.x = dir * ROLL_SPEED
        
        // Visual "Roll" effect
        player.scale.y = 0.8 
        player.color = rgb(150, 255, 150)

        wait(0.4, () => {
            player.isRolling = false
            player.scale.y = 1.5
            player.color = rgb(255, 255, 255)
        })
    }
}

onKeyPress("s", startRoll)
onKeyPress("down", startRoll)
onKeyPress("shift", startRoll)

// JUMP
onKeyPress("space", () => {
    if (player.isGrounded() && !player.isRolling) {
        player.jump(JUMP_FORCE)
    }
})

// FLOOR
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
