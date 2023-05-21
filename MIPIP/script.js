
document.addEventListener('DOMContentLoaded', function() {

// Obtener referencias a los polígonos deseados por su id
const flechaColab = document.getElementById('flecha_colab');
const flechaValid = document.getElementById('flecha_valid');
const flechaElab = document.getElementById('flecha_elab');

// Obtener referencia al div de información y al botón de volver atrás
const infoDivColab = document.getElementById('infoDiv_colab');
const infoDivElab = document.getElementById('infoDiv_elab');
const infoDivValid = document.getElementById('infoDiv_valid');

const backButtonColab = document.getElementById('backButtonColab');
const backButtonElab = document.getElementById('backButtonElab');
const backButtonValid = document.getElementById('backButtonValid');

// Agregar un evento de clic a cada polígono
let flechaSeleccionada = '';
flechaColab.addEventListener('click', function() {
    hacerZoom('colab');
  });
  flechaValid.addEventListener('click', function() {
    hacerZoom('valid');
  });
  flechaElab.addEventListener('click', function() {
    hacerZoom('elab');
  });

// Función para hacer zoom en el SVG
function hacerZoom(flecha) {
    flechaSeleccionada = flecha

    // Obtener el elemento SVG
    const svg = document.querySelector('svg');

    // Calcular la posición y dimensiones del SVG
    const rect = svg.getBoundingClientRect();
    const svgWidth = rect.width;
    const svgHeight = rect.height;
    const svgTop = rect.top;
    const svgLeft = rect.left;

    // Calcular la posición del polígono clicado
    // const poligonoRect = this.getBoundingClientRect();
    // const poligonoWidth = poligonoRect.width;
    // const poligonoHeight = poligonoRect.height;
    // const poligonoTop = poligonoRect.top;
    // const poligonoLeft = poligonoRect.left;

    // Calcular el factor de zoom
    const factorZoom = 4; // Ajusta este valor para controlar el nivel de zoom

    // Calcular la posición y dimensiones del área de zoom
    const zoomWidth = svgWidth / factorZoom;
    const zoomHeight = svgHeight / factorZoom;
    const svgCenterX = svgLeft + (svgWidth / 2) - (zoomWidth * 3.3);
    const svgCenterY = svgTop + (svgHeight / 2) - (zoomHeight / 2);

    // Aplicar la animación de zoom utilizando GSAP
    gsap.to(svg, {
        duration: 1, // Duración de la animación (en segundos)
        x: svgCenterX,
        y: svgCenterY,
        scale: factorZoom,
        transformOrigin: 'center center',
        ease: Power2.easeInOut,
        onComplete: mostrarInformacion 
  });
}

function mostrarInformacion() {
    // Ocultar el SVG
    const svg = document.querySelector('svg');
    svg.style.display = 'none';

    // Mostrar el div de información
    if (flechaSeleccionada === 'colab') {
        infoDivColab.style.display = 'block';
        backButtonColab.addEventListener('click', volverAtras);
    } else if (flechaSeleccionada === 'valid') {
        infoDivValid.style.display = 'block';
        backButtonValid.addEventListener('click', volverAtras);
    } else if (flechaSeleccionada === 'elab') {
        infoDivElab.style.display = 'block';
        backButtonElab.addEventListener('click', volverAtras);
      }

    // Agregar evento clic al botón de volver atrás
    backButton.addEventListener('click', volverAtras);
  }

  // Función para volver atrás
  function volverAtras() {
    // Ocultar el div de información
    infoDivColab.style.display = 'none';
    infoDivElab.style.display = 'none';
    infoDivValid.style.display = 'none';

    // Mostrar el SVG
    const svg = document.querySelector('svg');
    svg.style.display = 'block';

    // Volver a la posición y escala original del SVG utilizando GSAP
    gsap.to(svg, {
      duration: 1, // Duración de la animación (en segundos)
      x: 0,
      y: 0,
      scale: 1,
      transformOrigin: 'center center',
      ease: Power2.easeInOut
    });

    // Eliminar el evento clic del botón de volver atrás
    backButton.removeEventListener('click', volverAtras);
  }
});


