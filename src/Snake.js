import React from "react";

const Snake = () => {
  return (
    <div>
      <p>Snake</p>
      <br />
      <button onClick={() => play()}> Graj </button>
      <br />
      <canvas id="snake" />
    </div>
  );
};

const play = () => {
  const canv = document.getElementById("snake");
  const ctx = canv.getContext("2d");

  canv.width = 400;
  canv.height = 400;
  const box = 20;
  const start = 0;
  const end = 19;
  let fx = Math.floor(Math.random() * 19);
  let fy = Math.floor(Math.random() * 19);
  let moveX = -1;
  let moveY = 0;
  let trail = [
    {
      x: 8,
      y: 9
    },
    {
      x: 9,
      y: 9
    },
    {
      x: 10,
      y: 9
    }
  ];

  const board = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
  };

  const snake = () => {
    if (trail[0].x < start) {
      trail[0].x = end;
    } else if (trail[0].x > end) {
      trail[0].x = start;
    } else if (trail[0].y < start) {
      trail[0].y = end;
    } else if (trail[0].y > end) {
      trail[0].y = start;
    }

    ctx.fillStyle = "lime";

    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * box, trail[i].y * box, box - 2, box - 2);

      if (i > 0) {
        if (trail[0].x === trail[i].x && trail[0].y === trail[i].y) {
          trail = [
            {
              x: 8,
              y: 9
            },
            {
              x: 9,
              y: 9
            },
            {
              x: 10,
              y: 9
            }
          ];
        }
      }
    }

    let tail = {};

    if (trail[0].x === fx && trail[0].y === fy) {
      fx = Math.floor(Math.random() * 19);
      fy = Math.floor(Math.random() * 19);

      tail = {
        x: (trail[trail.length - 1].x += moveX),
        y: (trail[trail.length - 1].y += moveY)
      };

      trail.push(tail);
    }
    let head = {};
    let x = trail[0].x;
    let y = trail[0].y;
    trail.pop();
    x += moveX;
    y += moveY;
    head = {
      x,
      y
    };
    trail.unshift(head);
  };

  const food = () => {
    ctx.fillStyle = "red";

    ctx.fillRect(fx * box, fy * box, box - 2, box - 2);
  };

  const snakeMove = e => {
    switch (e.keyCode) {
      case 37:
        if (moveX !== 1) {
          moveX = -1;
          moveY = 0;
        }
        break;
      case 38:
        if (moveY !== 1) {
          moveY = -1;
          moveX = 0;
        }
        break;
      case 39:
        if (moveX !== -1) {
          moveX = 1;
          moveY = 0;
        }
        break;
      case 40:
        if (moveY !== -1) {
          moveY = 1;
          moveX = 0;
        }

        break;
    }
  };

  function game() {
    board();
    food();
    snake();
  }

  document.addEventListener("keydown", snakeMove);

  setInterval(game, 1000 / 15);
};

export default Snake;
