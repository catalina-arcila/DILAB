
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

// Boton Popup
const popupBtn = document.getElementById('popupBtn');


// Pasos 1 y 2
const pasos12 = document.getElementById('descPasos');


// Ir al ChapGPT
const botonHazlo = document.getElementById('herramienta');

botonHazlo.addEventListener('click', function() {
  window.location.replace('chatAPI.html');
});


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


    // Calcular el factor de zoom
    const factorZoom = 4; // Ajusta este valor para controlar el nivel de zoom
    const factorMovX = -250 

    // Calcular la posición y dimensiones del área de zoom
    const zoomWidth = svgWidth / factorZoom;
    const zoomHeight = svgHeight / factorZoom;
    const svgCenterX = svgLeft + (svgWidth / 2) - (zoomWidth * 3.3) + factorMovX;
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

    gsap.to(pasos12, {
      x: "-150%", // Desplazamiento hacia la izquierda
      duration: 1, // Duración de la animación en segundos
      ease: "power2.inOut", // Efecto de aceleración
    });
}

function mostrarInformacion() {
    // Ocultar el SVG
    const svg = document.querySelector('svg');
    svg.style.display = 'none';

    // Ocultar Pasos 1 y 2
    pasos12.style.display = 'none';

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

    //Mostrar pasos 1 y 2
    pasos12.style.display = 'flex';

    // Volver a la posición y escala original del SVG utilizando GSAP
    gsap.to(svg, {
      duration: 1, // Duración de la animación (en segundos)
      x: 0,
      y: 0,
      scale: 1,
      transformOrigin: 'center center',
      ease: Power2.easeInOut
    });

    gsap.to(pasos12, {
      x: "0", // Desplazamiento hacia la izquierda
      duration: 1, // Duración de la animación en segundos
      ease: "power2.inOut", // Efecto de aceleración
      onComplete: function() {
        popupBtn.style.zIndex = "9999";
      }
    });

    // Eliminar el evento clic del botón de volver atrás
    backButton.removeEventListener('click', volverAtras);
  }







  // Mostrar div de info por paso //

  const botonItem1 = document.getElementById('verMas1');
  const botonItem2 = document.getElementById('verMas2');
  const botonItem3 = document.getElementById('verMas3');
  const botonItem4 = document.getElementById('verMas4');

  const infoItem1 = document.getElementById('infoItem1');
  const infoItem2 = document.getElementById('infoItem2');

  botonItem1.addEventListener('click', function() {
    mostrarInfoItem('item1');
  });
  botonItem2.addEventListener('click', function() {
    mostrarInfoItem('item2');
  });
  botonItem3.addEventListener('click', function() {
    mostrarInfoItem('item3');
  });
  botonItem4.addEventListener('click', function() {
    mostrarInfoItem('item3');
  });

  function mostrarInfoItem(item) {
    infoItem1.style.display = 'none';
    infoItem2.style.display = 'none';
    if (item == 'item1') {
      infoItem1.style.display = 'block';
    } else if (item == 'item2') {
      infoItem2.style.display = 'block';
    }
  }


  // Popup preguntas

  // boton popup esta definido arriba
  const popupPreguntas = document.getElementById('popupPreguntas');
  const closeBtn = document.getElementById('closeBtn');

  popupBtn.addEventListener("click", showPopup);

      function showPopup() {
          popupPreguntas.style.display = "flex";
      }
  
  
  closeBtn.addEventListener("click", closePopup);

      function closePopup() {
        popupPreguntas.style.display = "none";
      }

  

  // Ir a la página inicial

    const volverInicio = document.getElementById('volverInicio');

    volverInicio.addEventListener('click', function() {
      window.location.replace('index.html');
    });

});







