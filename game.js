import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// 1. NO DOWNLOAD NEEDED: Use the built-in 8-bit "Bean"
loadSprite("warrior", "https://kaboomjs.com/sprites/bean.png")

const SPEED = 480
const ROLL_SPEED = 950 
const JUMP_FORCE = 950 

setGravity(2800)

// 2. THE PLAYER
const player = add([
    sprite("warrior"),
    pos(100, 100),
    area(),
    body(),
    scale(1.5), // Makes the 8-bit man a good size
    { isRolling: false }
])

// 3. MOVEMENT logic
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

// 4. THE ROLL TECH (Now with a squish effect)
const startRoll = () => {
    if (player.isGrounded() && !player.isRolling) {
        player.isRolling = true
        const dir = player.flipX ? -1 : 1
        player.vel.x = dir * ROLL_SPEED
        
        // Squish the sprite to look like a roll/slide
        player.scale.y = 0.8
        player.color = rgb(150, 255, 150) // Turn slightly green when rolling

        wait(0.4, () => {
            player.isRolling = false
            player.scale.y = 1.5 // Back to normal
            player.color = rgb(255, 255, 255)
        })
    }
}

onKeyPress("s", startRoll)
onKeyPress("shift", startRoll)

// 5. JUMP
onKeyPress("space", () => {
    if (player.isGrounded() && !player.isRolling) {
        player.jump(JUMP_FORCE)
    }
})

// 6. LONG FLOOR
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
