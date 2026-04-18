// Configuración de rutas
const LIKES_COUNT = 31;
const HER_COUNT = 9;
const polaroids = [];

// Generar rutas de imágenes
for (let i = 1; i <= LIKES_COUNT; i++) {
  polaroids.push(`images/likes/like-${i}.webp`);
}
for (let i = 1; i <= HER_COUNT; i++) {
  polaroids.push(`images/her/pic-${i}.webp`);
}

// Mezclar array aleatoriamente (Fisher-Yates)
for (let i = polaroids.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [polaroids[i], polaroids[j]] = [polaroids[j], polaroids[i]];
}

// Variables de control
let currentPhoto = 0;
const stage = document.getElementById("main-stage");

function startMagic() {
  // 1. Ocultar intro
  const intro = document.getElementById("intro-screen");
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.classList.add("hidden");
  }, 1500);

  // 2. Reproducir Audio (con control de errores por si el navegador bloquea)
  const audio = document.getElementById("bg-music");
  audio.play().catch((e) => console.log("Audio play error:", e));

  // 3. Lanzar Confeti Grimm (Rojo y Negro)
  fireGrimmConfetti();

  // 4. Empezar a soltar Polaroids
  dropNextPolaroid();
}

function dropNextPolaroid() {
  // Si ya tiramos unas 20 fotos o se acabaron, mostramos el final
  if (currentPhoto >= 20 || currentPhoto >= polaroids.length) {
    setTimeout(showFinale, 3000);
    return;
  }

  const imgBox = document.createElement("div");
  imgBox.className = "polaroid";

  const img = document.createElement("img");
  img.src = polaroids[currentPhoto];

  imgBox.appendChild(img);

  // Posición y rotación aleatoria
  const randomLeft = Math.floor(Math.random() * 70) + 10; // Entre 10% y 80% de la pantalla
  const randomTop = Math.floor(Math.random() * 60) + 10; // Entre 10% y 70%
  const randomRotation = Math.floor(Math.random() * 40) - 20; // Entre -20deg y 20deg

  imgBox.style.left = `${randomLeft}vw`;
  imgBox.style.top = `${randomTop}vh`;
  // Pasamos la rotación a una variable CSS para la animación
  imgBox.style.setProperty("--rotation", `${randomRotation}deg`);

  stage.appendChild(imgBox);

  currentPhoto++;

  // Soltar la siguiente foto después de 1.5 a 3 segundos (al azar)
  const nextDropTime = Math.floor(Math.random() * 1500) + 1500;
  setTimeout(dropNextPolaroid, nextDropTime);
}

function showFinale() {
  const finale = document.getElementById("finale-screen");
  finale.classList.remove("hidden");

  // Pequeño delay para que aplique la transición de opacidad
  setTimeout(() => {
    finale.classList.add("visible");
  }, 100);
}

function fireGrimmConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 999 };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ["#dc2626", "#000000"] });
  fire(0.2, { spread: 60, colors: ["#ffffff", "#dc2626"] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
}
