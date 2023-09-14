<script setup lang="ts">
import { onMounted, withDefaults } from "vue";

const { startGame } = withDefaults(
  defineProps<{
    startGame?: boolean;
  }>(),
  {
    startGame: false, // Valor por defecto si no se proporciona la prop
  }
);

const ballsInMoving = [
  { x: 250, y: 250, vx: 15, vy: -1 },
  { x: 300, y: 300, vx: 10, vy: -12 },
  { x: 350, y: 350, vx: 15, vy: 10 },
  { x: 350, y: 350, vx: 15, vy: -10 },
  { x: 350, y: 350, vx: 8, vy: 10 },
  { x: 350, y: 350, vx: 20, vy: -2 },
  { x: 350, y: 350, vx: 0, vy: -10 },
  { x: 350, y: 350, vx: 11, vy: 10 },
  { x: 350, y: 350, vx: 3, vy: 10 },
];

const staticBalls = [
  { x: 100, y: 560, vx: 20, vy: 20 },
  { x: 250, y: 560, vx: 20, vy: 20 },
  { x: 350, y: 560, vx: 20, vy: 20 },
  { x: 430, y: 560, vx: 20, vy: 20 },
  { x: 490, y: 560, vx: 20, vy: 20 },
  { x: 550, y: 560, vx: 20, vy: 20 },
  { x: 610, y: 560, vx: 20, vy: 20 },
  { x: 680, y: 560, vx: 20, vy: 20 },
  { x: 770, y: 560, vx: 20, vy: 20 },
  { x: 880, y: 560, vx: 20, vy: 20 },
  { x: 1090, y: 560, vx: 20, vy: 20 },
];
const canvasWidth = 800;
const canvasHeight = 600;
const frameDiameter = 400; // Diámetro del marco whiteondo
const frameX = canvasWidth - frameDiameter - 50; // Coordenada X del marco whiteondo a la derecha, separado por 200 píxeles
const frameY = (canvasHeight - frameDiameter) / 2; // Coordenada Y del marco whiteondo centrado verticalmente

let balls = startGame ? ballsInMoving : staticBalls;

onMounted(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Función para animar las bolitas
  function animate() {
    // Limpia el lienzo
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibuja el marco whiteondo
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.arc(
      frameX + frameDiameter / 2,
      frameY + frameDiameter / 2,
      frameDiameter / 2,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    //Dibujando las partes extras
    /* soporte base */
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(340, 580, 420, 10);
    ctx.fillStyle = "white";

    /* soporte */
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(750, 250, 10, 330);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(340, 250, 10, 330);
    ctx.fillStyle = "white";
    ctx.fill();

    /* Manija */
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(200, 250, 150, 10);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(200, 250, 10, 150);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(60, 400, 150, 10);
    ctx.fillStyle = "white";
    ctx.fill();

    const x = 0; // Coordenada X del rectángulo
    const y = 385; // Coordenada Y del rectángulo
    const width = 190; // Ancho del rectángulo
    const height = 40; // Alto del rectángulo
    const borderRadius = 10; // Radio de los bordes redondeados

    ctx.beginPath();

    // Comienza el camino
    ctx.moveTo(x + borderRadius, y); // Mueve el lápiz al punto de inicio

    // Dibuja la parte superior del rectángulo
    ctx.lineTo(x + width - borderRadius, y);

    // Dibuja el borde superior derecho redondeado
    ctx.arc(
      x + width - borderRadius,
      y + borderRadius,
      borderRadius,
      -Math.PI / 2,
      0
    );

    // Dibuja el lado derecho del rectángulo
    ctx.lineTo(x + width, y + height - borderRadius);

    // Dibuja el borde inferior derecho redondeado
    ctx.arc(
      x + width - borderRadius,
      y + height - borderRadius,
      borderRadius,
      0,
      Math.PI / 2
    );

    // Dibuja la parte inferior del rectángulo
    ctx.lineTo(x + borderRadius, y + height);

    // Dibuja el borde inferior izquierdo redondeado
    ctx.arc(
      x + borderRadius,
      y + height - borderRadius,
      borderRadius,
      Math.PI / 2,
      Math.PI
    );

    // Dibuja el lado izquierdo del rectángulo
    ctx.lineTo(x, y + borderRadius);

    // Dibuja el borde superior izquierdo redondeado y cierra el camino
    ctx.arc(
      x + borderRadius,
      y + borderRadius,
      borderRadius,
      Math.PI,
      -Math.PI / 2
    );
    ctx.closePath();

    ctx.fillStyle = "white"; // Color de relleno
    ctx.fill(); // Rellena el rectángulo

    // Mueve y dibuja las bolitas dentro del marco redondo
    balls.forEach((ball) => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Detecta colisiones con los bordes del marco redondo
      const distance = Math.sqrt(
        Math.pow(ball.x - (frameX + frameDiameter / 2), 2) +
          Math.pow(ball.y - (frameY + frameDiameter / 2), 2)
      );
      if (distance + 20 > frameDiameter / 2) {
        // Colisión con el borde del marco whiteondo
        const angle = Math.atan2(
          ball.y - (frameY + frameDiameter / 2),
          ball.x - (frameX + frameDiameter / 2)
        );
        ball.x =
          frameX +
          frameDiameter / 2 +
          (frameDiameter / 2 - 20) * Math.cos(angle);
        ball.y =
          frameY +
          frameDiameter / 2 +
          (frameDiameter / 2 - 20) * Math.sin(angle);
        ball.vx = -ball.vx;
        ball.vy = -ball.vy;
      }

      // Dibuja la bolita dentro del marco redondo
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "black";
      ctx.fillStyle = "#DEAD69";
      ctx.stroke();
      ctx.fill();
    });

    // Solicita el próximo cuadro de animación si startGame es verdadero
    if (startGame) {
      requestAnimationFrame(animate);
    }
  }

  // Inicia la animación
  animate();
});
</script>

<template>
  <canvas
    id="canvas"
    class="mx-auto max-w-[800px] w-full"
    :width="canvasWidth"
    :height="canvasHeight"
  />
</template>
