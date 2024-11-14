const player = document.getElementById("player");

let isJumping = false;

//Jumping function
function jump() {
    if (isJumping) return; //prevent double jump for now

    isJumping = true;
    player.classList.add("jump");

    //Once animation is over remove the jump class
    player.addEventListener("animationend", () => {
        player.classList.remove("jump");
        isJumping = false;
    }, { once: true });
}

// Event listener for the spacebar
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        jump();
    }else{
        return null;
    }
});