const icons = document.querySelectorAll("#reactions i");

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Quitar clase active a todos
    icons.forEach((i) => i.classList.remove("active"));

    // Agregar clase active al que se clickeó
    icon.classList.add("active");

    // Solo para mostrar en consola
    console.log(`Reacción seleccionada: ${icon.dataset.reaction}`);
  });
});

function handleReactionClick(icon) {
  // Efecto glow dorado
  icon.classList.add("gold-glow");

  setTimeout(() => {
    icon.classList.remove("gold-glow");
  }, 300);
}

function recibirReaccion(reaccion) {
  console.log("Reaccion reenviada:", reaccion.body);
  const contenedor = document.getElementById("mensajes");

  //crear burbuja
  const burbuja = document.createElement("div");
  burbuja.classList.add("reaccion-burbuja");

  let icono = "";
  switch (reaccion.body) {
    case "like":
      icono = '<i class="fa-solid fa-thumbs-up icon-like"></i>';
      break;

    case "heart":
      icono = '<i class="fa-solid fa-heart icon-heart"></i>';
      break;

    case "sad":
      icono = '<i class="fa-solid fa-face-sad-tear icon-sad"></i>';
      break;

    case "fun":
      icono = '<i class="fa-solid fa-face-laugh icon-fun"></i>';
      break;
  }

  burbuja.innerHTML = icono;
  contenedor.appendChild(burbuja);
  //Eliminar burbuja despues de la animacion
  setTimeout(() => {
    burbuja.remove();
  }, 3000); //coincide con el tiempo de la animacion
}

function enviarReaccionServidor(event) {
  const icon = event.target;
  handleReactionClick(icon);

  const reaccion = event.target.dataset.reaction;
  if (clienteChat && clienteChat.connected) {
    clienteChat.send("/app/enviarReaccion", {}, reaccion);
  } else {
    alert("No estas conectado :(");
  }
}

function desconectar() {
  if (clienteChat !== null) {
    clienteChat.disconnect(() => {
      setConectado(false);
    });
    clienteChat = null;
  }
}
