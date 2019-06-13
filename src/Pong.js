import React from "react";
import "./game.css";
const Pong = () => {
  return (
    <div>
      <p>Game </p>
      <p>Wybierz poziom: </p>
      <button onClick={() => game("easy")}>Łatwy</button>
      <button onClick={() => game("hard")}>Trudny</button>
      <br />
      <br />
      <canvas />
    </div>
  );
};

const game = difficulty => {
  const canv = document.querySelector("canvas");
  const ctx = canv.getContext("2d");

  canv.width = 1000;
  canv.height = 500;

  const cw = canv.width;
  const ch = canv.height;
  const paddleWidth = 20;
  const paddleHeight = 100;
  const ballSize = 20;

  let ballX = cw / 2 - ballSize / 2;
  let ballY = ch / 2 - ballSize / 2;

  let ballSpeedX = 4;
  let ballSpeedY = 4;

  const playerX = 70;
  let playerY = 200;

  const aiX = 910;
  let aiY = 200;

  let playerPoints = 0;
  let aiPoints = 0;

  const topCanv = canv.offsetTop;

  const table = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "gray";

    for (let i = 6; i < ch; i += 20) {
      ctx.fillRect(cw / 2 - 3, i, 6, 16);
    }
  };

  const player = () => {
    ctx.fillStyle = "green";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  };

  const ai = () => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
  };

  const ball = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballSize >= ch || ballY <= 0) {
      ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballSize >= cw) {
      playerPoints++;

      ballX = cw / 2 - ballSize / 2;
      ballY = ch / 2 - ballSize / 2;

      ballSpeedX = 4;
    } else if (ballX <= 0) {
      aiPoints++;

      ballSpeedX = 4;
      ballX = cw / 2 - ballSize / 2;
      ballY = ch / 2 - ballSize / 2;
    }

    if (
      (ballX <= playerX + paddleWidth &&
        ballX >= playerX &&
        ballY >= playerY &&
        ballY + ballSize <= playerY + paddleHeight) ||
      (ballX <= playerX + paddleWidth &&
        ballX >= playerX &&
        ballY + ballSize >= playerY &&
        ballY <= playerY + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;

      speedUp();
    }

    if (
      (ballX + ballSize >= aiX &&
        ballX + ballSize < aiX + paddleWidth &&
        ballY >= aiY &&
        ballY + ballSize <= aiY + paddleHeight) ||
      (ballX + ballSize >= aiX &&
        ballX + ballSize < aiX + paddleWidth &&
        ballY + ballSize >= aiY &&
        ballY <= aiY + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;

      speedUp();
    }
  };

  const playerPosition = e => {
    playerY = e.clientY - topCanv - paddleHeight / 2;

    if (playerY <= 0) {
      playerY = 0;
    }

    if (playerY >= ch - paddleHeight) {
      playerY = ch - paddleHeight;
    }
  };

  const aiPositionHard = () => {
    const midPaddle = aiY + paddleHeight / 2;
    const midBall = ballY + ballSize / 2;

    if (ballX > 500) {
      if (midPaddle - midBall > 150) {
        aiY -= 25;
      } else if (midPaddle - midBall > 50 && midPaddle - midBall < 150) {
        aiY -= 8;
      } else if (midPaddle - midBall < -150) {
        aiY += 25;
      } else if (midPaddle - midBall < -50 && midPaddle - midBall > -150) {
        aiY += 8;
      }
    } else if (ballX <= 500 && ballX > 200) {
      if (midPaddle - midBall > 250) {
        aiY -= 2;
      } else if (midPaddle - midBall < -250) {
        aiY += 2;
      }
    }

    if (aiY >= ch - paddleHeight) {
      aiY = ch - paddleHeight;
    }

    if (aiY <= 0) {
      aiY = 0;
    }
  };

  const aiPositionEasy = () => {
    const midPaddle = aiY + paddleHeight / 2;
    const midBall = ballY + ballSize / 2;

    if (ballX > 500) {
      if (midPaddle - midBall > 200) {
        aiY -= 12;
      } else if (midPaddle - midBall > 50) {
        aiY -= 5;
      } else if (midPaddle - midBall < -200) {
        aiY += 12;
      } else if (midPaddle - midBall < -50) {
        aiY += 5;
      }
    } else if (ballX <= 500 && ballX > 200) {
      if (midPaddle - midBall > 250) {
        aiY -= 1;
      } else if (midPaddle - midBall < -250) {
        aiY += 1;
      }
    }

    if (aiY >= ch - paddleHeight) {
      aiY = ch - paddleHeight;
    }

    if (aiY <= 0) {
      aiY = 0;
    }
  };

  canv.addEventListener("mousemove", playerPosition);

  const speedUp = () => {
    if (ballSpeedX > 0 && ballSpeedX < 18) {
      ballSpeedX += 0.6;
    } else if (ballSpeedX < 0 && ballSpeedX > -18) {
      ballSpeedX -= 0.6;
    }
  };

  const score = () => {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial Black";
    ctx.fillText(`Gracz: ${playerPoints}`, 300, 25, 100);

    ctx.fillText(`Komputer: ${aiPoints}`, 550, 25, 400);
  };

  if (difficulty === "easy") {
    function playEasy() {
      table();
      ball();
      player();
      ai();
      aiPositionEasy();
      score();

      if (aiPoints >= 7 || playerPoints >= 7) {
        clearInterval(myin);
      }
    }

    let myin = setInterval(playEasy, 1000 / 60);
  }

  if (difficulty === "hard") {
    function playHard() {
      table();
      ball();
      player();
      ai();
      aiPositionHard();
      score();
      if (aiPoints >= 7 || playerPoints >= 7) {
        clearInterval(myin);
      }
    }

    let myin = setInterval(playHard, 1000 / 60);
  }
};

export default Pong;
