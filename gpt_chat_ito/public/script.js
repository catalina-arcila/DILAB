
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


// Ir al ChapGPT
const botonHazlo = document.getElementById('herramienta');

botonHazlo.addEventListener('click', function() {
  window.location.href = "https://mipip-herramienta-d6f8ff51940c.herokuapp.com/";
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
    const svg = document.getElementById('Capa_1');
    const svg2 = document.getElementById('svgPasos');

    // Calcular la posición y dimensiones del SVG
    const rect = svg.getBoundingClientRect();
    const svgWidth = rect.width;
    const svgHeight = rect.height;
    const svgTop = rect.top;
    const svgLeft = rect.left;


    // Calcular el factor de zoom
    const factorZoom = 9; // Ajusta este valor para controlar el nivel de zoom
    const factorMovX = 0;
    const factorMovY = 1300;

    // Calcular la posición y dimensiones del área de zoom
    const zoomWidth = svgWidth / factorZoom;
    const zoomHeight = svgHeight / factorZoom;
    const svgCenterX = svgLeft + (svgWidth / 2) - (zoomWidth * 3.3) + factorMovX;
    const svgCenterY = svgTop + (svgHeight / 2) - (zoomHeight / 2) + factorMovY;

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

    gsap.to(svg2, {
      x: "-350%", // Desplazamiento hacia la izquierda
      duration: 1, // Duración de la animación en segundos
      ease: "power2.inOut", // Efecto de aceleración
    });
}

function mostrarInformacion() {
    // Ocultar el SVG
    const svg = document.getElementById('Capa_1');
    const svg2 = document.getElementById('svgPasos');
    const contenedor = document.getElementById('contenedor');
    
    svg.style.display = 'none';
    contenedor.style.display = 'none';
 ;

    // Ocultar Pasos 1 y 2
    svg2.style.display = 'none'
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


  }

  // Función para volver atrás
  function volverAtras() {
    // Ocultar el div de información
    infoDivColab.style.display = 'none';
    infoDivElab.style.display = 'none';
    infoDivValid.style.display = 'none';

    // Mostrar el SVG
    const svg = document.getElementById('Capa_1');
    const svg2 = document.getElementById('svgPasos');
    const contenedor = document.getElementById('contenedor');

    svg.style.display = 'block';
    svg2.style.display = 'block';
    contenedor.style.display = 'flex';

    // Volver a la posición y escala original del SVG utilizando GSAP
    gsap.to(svg, {
      duration: 1, // Duración de la animación (en segundos)
      x: 0,
      y: 0,
      scale: 1,
      transformOrigin: 'center center',
      ease: Power2.easeInOut
    });

    gsap.to(svg2, {
      x: "0", // Desplazamiento hacia la izquierda
      duration: 1, // Duración de la animación en segundos
      ease: "power2.inOut", // Efecto de aceleración
      onComplete: function() {
        location.reload(true)
      }
    });

    // Eliminar el evento clic del botón de volver atrás
    backButton.removeEventListener('click', volverAtras);
  }







  // Mostrar div de info por paso //

  const botonItem1 = document.getElementById('verMas1');
  const botonItem2 = document.getElementById('verMas2');
  const botonItem3 = document.getElementById('verMas3');

  const infoItem1 = document.getElementById('infoItem1');
  const infoItem2 = document.getElementById('infoItem2');
  const infoItem3 = document.getElementById('infoItem3');

  botonItem1.addEventListener('click', function() {
    mostrarInfoItem('item1');
  });
  botonItem2.addEventListener('click', function() {
    mostrarInfoItem('item2');
  });
  botonItem3.addEventListener('click', function() {
    mostrarInfoItem('item3');
  });


  function mostrarInfoItem(item) {
    infoItem1.style.display = 'none';
    infoItem2.style.display = 'none';
    infoItem3.style.display = 'none';
    // infoItem2.style.display = 'none';
    if (item == 'item1') {
      infoItem1.style.display = 'block';
    } else if (item == 'item2') {
      infoItem2.style.display = 'flex';
    } else if (item == 'item3') {
      infoItem3.style.display = 'flex';
    }
  }


  
  // Popup pasos
  const popupPaso1 = document.getElementById('paso1');
  const botonPaso1 = document.getElementsByClassName('cls-pasos-2');

  for(let i = 0; i < botonPaso1.length; i++){
    botonPaso1[i].addEventListener("click", showPopup1);

        function showPopup1() {
          if (popupPaso1.style.getPropertyValue("display") == "none") {
            popupPaso1.style.display = "flex";
          } else {
            popupPaso1.style.display = "none";
          }
        }
      };
  
  const popupPaso2 = document.getElementById('paso2');
  const botonPaso2 = document.getElementsByClassName('cls-pasos-1');

  for(let i = 0; i < botonPaso2.length; i++){
    botonPaso2[i].addEventListener("click", showPopup2);

        function showPopup2() {
          if (popupPaso2.style.getPropertyValue("display") == "none") {
            popupPaso2.style.display = "flex";
          } else {
            popupPaso2.style.display = "none";
          }
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

    
    
  // Hover ciclo
    const descColab = document.getElementById('descColab');
    const descElab = document.getElementById('descElab');
    const descValid = document.getElementById('descValid');
    const paso3= document.getElementById('paso3');
    const descPaso3= document.getElementById('descPaso3');

    const esconderTodo = function(){
      descColab.style.display = 'none';
      descElab.style.display = 'none';
      descValid.style.display = 'none';
      paso3.style.display = 'none';
      descPaso3.style.display = 'none';
    }

    flechaColab.addEventListener('mouseover', function() {
      esconderTodo()
      descColab.style.display = 'block';
    })
    flechaColab.addEventListener('mouseout', function() {
      esconderTodo()
      paso3.style.display = 'block';
      descPaso3.style.display = 'block';
    })

    flechaElab.addEventListener('mouseover', function() {
      esconderTodo()
      descElab.style.display = 'block';
    })
    flechaElab.addEventListener('mouseout', function() {
      esconderTodo()
      paso3.style.display = 'block';
      descPaso3.style.display = 'block';
    })

    flechaValid.addEventListener('mouseover', function() {
      esconderTodo()
      descValid.style.display = 'block';
    })
    flechaValid.addEventListener('mouseout', function() {
      esconderTodo()
      paso3.style.display = 'block';
      descPaso3.style.display = 'block';
    })
    
    // diagrama valid
    const botonComo = document.getElementById('botonComo');
    const ejemplosValid = document.getElementById('ejemplosValid');

    botonComo.addEventListener("click", mostrarValid);

      function mostrarValid() {
        if (ejemplosValid.style.getPropertyValue("display") == "none") {
          ejemplosValid.style.display = "flex";
        } else {
          ejemplosValid.style.display = "none";
        }
      }

    
  });

