const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;

let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    speed: 5,
    color: "blue"
};

let obstacles = [];
let score = 0;

// Listen for keyboard events
let keys = {
    left: false,
    right: false
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
});

// Create obstacles
function createObstacle() {
    const x = Math.random() * (canvas.width - 50);
    const y = -100;
    const width = 50 + Math.random() * 50;
    const height = 20 + Math.random() * 50;
    obstacles.push({ x, y, width, height });
}

// Move obstacles and check for collision
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 5;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
            i--;
        }
    }
}

// Check for collision between car and obstacles
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (
            car.x < obstacles[i].x + obstacles[i].width &&
            car.x + car.width > obstacles[i].x &&
            car.y < obstacles[i].y + obstacles[i].height &&
            car.y + car.height > obstacles[i].y
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }
}

// Update the game state
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Move the car
    if (keys.left && car.x > 0) car.x -= car.speed;
    if (keys.right && car.x < canvas.width - car.width) car.x += car.speed;

    // Draw the car
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Move and draw obstacles
    moveObstacles();
    ctx.fillStyle = "red";
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }

    // Check for collisions
    checkCollision();

    // Display the score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(update);
}

// Start the game
function startGame() {
    setInterval(createObstacle, 1000);
    update();
}

startGame();
