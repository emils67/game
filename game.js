import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"

kaboom({
    background: [30, 30, 30],
})

// 1. LOAD THE IDLE STRIP
loadSprite("monster", "Pink_Monster_Idle_4.png", {
    sliceX: 4, 
    sliceY: 1,
    anims: {
        "idle": { from: 0, to: 3, loop: true },
    }
})

// 2. LOAD THE RUN STRIP (as a separate sprite)
loadSprite("monster_run", "Pink_Monster_Run_6.png", {
    sliceX: 6, 
    sliceY: 1,
    anims: {
        "run": { from: 0, to: 5, loop: true },
    }
})

const SPEED = 480
const JUMP_FORCE = 900
setGravity(2600)

// 3. THE PLAYER
const player = add([
    sprite("monster", { anim: "idle" }),
    pos(100, 100),
    area(),
    body(),
    scale(2),
])

// 4. CONTROLS
onKeyDown("left", () => {
    player.move(-SPEED, 0)
    player.flipX = true
    // Switch to run sprite when moving
    if (player.curAnim() !== "run") {
        player.use(sprite("monster_run"))
        player.play("run")
    }
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
    player.flipX = false
    if (player.curAnim() !== "run") {
        player.use(sprite("monster_run"))
        player.play("run")
    }
})

// Go back to idle sprite when stopping
onKeyRelease(["left", "right"], () => {
    player.use(sprite("monster"))
    player.play("idle")
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
})

// 5. THE WORLD
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
