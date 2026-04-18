// 1. Configuración de Cantidades (Ajusta HER_COUNT al número real de fotos que tengas)
const LIKES_COUNT = 31;
const HER_COUNT = 6; // Cambia este 666666 al número real de fotos en tu carpeta 'her'
let currentPhoto = 0;
let polaroids = [];

// Función para preparar el mazo de fotos en el orden correcto
function preparePhotos() {
  polaroids = [];
  // Primero añadimos lo que le gusta (likes)
  for (let i = 1; i <= LIKES_COUNT; i++) {
    polaroids.push(`likes/like-${i}.webp`);
  }
  // Luego añadimos las fotos de ella
  for (let i = 1; i <= HER_COUNT; i++) {
    polaroids.push(`her/pic-${i}.webp`);
  }
  // Nota: Eliminamos el mezclado (Fisher-Yates) para que respete el orden: Likes -> Ella
}

// Variables de control
const stage = document.getElementById("main-stage");

function startMagic() {
  // Inicializamos el mazo de fotos
  preparePhotos();

  // 1. Ocultar intro
  const intro = document.getElementById("intro-screen");
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.classList.add("hidden");

    // Mostrar el mensaje especial arriba
    const heading = document.getElementById("gallery-heading");
    if (heading) heading.classList.add("visible");
  }, 1500);

  // 2. Reproducir Audio
  const audio = document.getElementById("bg-music");
  audio.play().catch((e) => console.log("Audio play error:", e));

  // 3. Lanzar Confeti Grimm (Rojo y Negro)
  fireGrimmConfetti();

  // 4. Empezar a soltar Polaroids
  dropNextPolaroid();
}

function dropNextPolaroid() {
  // Si ya se mostraron todas las fotos del array
  if (currentPhoto >= polaroids.length) {
    setTimeout(showFinale, 3000);
    return;
  }

  const imgBox = document.createElement("div");
  imgBox.className = "polaroid";

  const img = document.createElement("img");
  img.src = polaroids[currentPhoto];

  imgBox.appendChild(img);

  // Posición y rotación aleatoria
  const randomLeft = Math.floor(Math.random() * 60) + 15; // Centrado en móviles
  const randomTop = Math.floor(Math.random() * 50) + 15;
  const randomRotation = Math.floor(Math.random() * 40) - 20;

  imgBox.style.left = `${randomLeft}vw`;
  imgBox.style.top = `${randomTop}vh`;
  imgBox.style.setProperty("--rotation", `${randomRotation}deg`);

  stage.appendChild(imgBox);

  currentPhoto++;

  // Tiempo de caída entre fotos (1.2 segundos para que no sea eterno si son muchas)
  setTimeout(dropNextPolaroid, 1200);
}

function showFinale() {
  const finale = document.getElementById("finale-screen");
  finale.classList.remove("hidden");

  setTimeout(() => {
    finale.classList.add("visible");
  }, 100);
}

// Lógica para el botón de retorno
function resetMagic() {
  // Resetear contador
  currentPhoto = 0;

  // Limpiar el escenario de fotos
  // Mantenemos el heading pero borramos las fotos (divs con clase polaroid)
  stage.innerHTML =
    '<h2 id="gallery-heading" class="hidden-text">lo que le gusta ¿vió que si le presto atencion, preciosa?</h2>';

  // Ocultar pantallas y mostrar intro de nuevo
  document.getElementById("finale-screen").classList.remove("visible");
  setTimeout(() => {
    document.getElementById("finale-screen").classList.add("hidden");
    const intro = document.getElementById("intro-screen");
    intro.classList.remove("hidden");
    intro.style.opacity = "1";
  }, 500);
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
