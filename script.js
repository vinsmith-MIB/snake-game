
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var valueDirection;
var score = {
    score: 0,
    HighScore: 0
}

var snake = {
    x: 350,
    y: 250,
    size: 10,
    color: "#000",
    direction: "",
    tail: 0,
    trailX: [],
    trailY: []
};
var apple = {
    x: "",
    y: "",
    color: "rgb(235, 46, 46)"
};
function getPositionApple() {
    apple.x = Math.round(Math.random() * (canvas.width - 10) / 10) * 10;
    apple.y = Math.round(Math.random() * (canvas.height - 10) / 10) * 10;
}
getPositionApple();

function getPositionTail() {
    snake.trailX[snake.tail] = snake.x;
    snake.trailY[snake.tail] = snake.y;
    for ( let i = 0; i < snake.tail; i++) {
        snake.trailX[i] = snake.trailX[i+1];
        snake.trailY[i] = snake.trailY[i+1];
    }
}

function drawSnake() {
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
    for (let i = 0; i < snake.tail; i++) {
        ctx.fillRect(snake.trailX[i], snake.trailY[i], snake.size, snake.size);
    }
}

function drawApple() {
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, snake.size, snake.size);
}

function moveSnake() {
    getPositionTail();
    switch (snake.direction) {
        case "up":
            snake.y -= snake.size;
            break;
        case "down":
            snake.y += snake.size;
            break;
        case "left":
            snake.x -= snake.size;
            break;
        case "right":
            snake.x += snake.size;
            break;
        case "stop":
            if(score.score > score.HighScore)
            score.HighScore = score.score;
            $(".highScore").text(score.HighScore);
            score.score = 0;
            $(".score").text(score.score);
            snake = {
                x: 350,
                y: 250,
                size: 10,
                color: "#000",
                direction: "",
                tail: 0,
                trailX: [],
                trailY: []
            };
            alert("game over!");   
            break;
    }
    for (let i = 0; i < snake.tail; i++) {
        if (snake.x === snake.trailX[i] && snake.y === snake.trailY[i]) {
            snake.x = snake.trailX[i];
            snake.y = snake.trailY[i];
            snake.direction = "stop";
            return;
        } 
    }
    if (snake.x < 0 || snake.x >= canvas.width ||
        snake.y < 0 || snake.y >= canvas.height) {
        snake.direction = "stop";
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    if (snake.x == apple.x && snake.y == apple.y)
        eatApple();
}

function eatApple() {
    score.score++;
    $(".score").text(score.score);
    snake.tail++;
    getPositionApple();
}

$(document).keydown(function (event) {

    if (valueDirection == event.which % 2)
        return;
    switch (event.which) {
        case 37: // left arrow
            snake.direction = "left";
            break;
        case 38: // up arrow
            snake.direction = "up";
            break;
        case 39: // right arrow
            snake.direction = "right";
            break;
        case 40: // down arrow
            snake.direction = "down";
            break;
    }
    valueDirection = event.which % 2;
});

setInterval(moveSnake, 200);

