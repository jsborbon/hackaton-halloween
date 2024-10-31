"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js
import styles from "./acertijo4.module.css";

export default function Acertijo4() {
  const router = useRouter(); // Inicializa useRouter para redireccionar

  const mensajes = [
    "Bienvenido al Cuarto Cuarto. Veo que has logrado escapar del tercer cuarto... pero no te confíes. Aquí dentro, las cosas se vuelven aún más complicadas, y dudo que tengas lo necesario para salir de este lugar.",
    "La presión aumenta, y el tiempo sigue en tu contra, disminuyendo cada segundo. Si no quieres que tu camino termine aquí, tendrás que actuar con rapidez.",
    "Cuando te sientas listo, haz clic en el centro de la pantalla para dar comienzo al acertijo. Recuerda leer bien el acertijo y mantener la calma; cada decisión cuenta, y en este cuarto, el silencio puede ser tu mejor aliado.",
  ];

  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [mostrarTexto, setMostrarTexto] = useState(true); // Controla si el texto se muestra o no
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false); // Controla si la ventana emergente se muestra o no
  const [ventanaCerrada, setVentanaCerrada] = useState(false); // Indica si la ventana emergente fue cerrada
  const [mostrarBotonSiguiente, setMostrarBotonSiguiente] = useState(false); // Controla la visibilidad del botón para el siguiente acertijo
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null); // Estado para guardar la respuesta elegida
  const [mostrarBotonesRespuesta, setMostrarBotonesRespuesta] = useState(false); // Controla la visibilidad de los botones de respuesta

  useEffect(() => {
    if (mensajeIndex >= mensajes.length) {
      setMostrarTexto(false); // Oculta el texto si el índice supera el número de mensajes
    } else {
      setMostrarTexto(true); // Muestra el texto si hay mensajes restantes
    }
  }, [mensajeIndex, mensajes.length]); // Dependencia en mensajeIndex para actualizar cuando este cambie

  const manejarClick = () => {
    setMensajeIndex((prevIndex) => prevIndex + 1);
  };

  // Función para manejar la selección de respuesta
  const manejarRespuesta = (respuesta) => {
    if (respuesta === "silencio") {
      setRespuestaCorrecta(true); // Si la respuesta es correcta
      setMostrarBotonSiguiente(true); // Muestra el botón para avanzar
    } else {
      setRespuestaCorrecta(false); // Si la respuesta es incorrecta
    }
  };

  const abrirVentanaEmergente = () => {
    if (!ventanaCerrada) {
      setMostrarVentanaEmergente(true); // Abre la ventana emergente
    }
  };

  const cerrarVentanaEmergente = () => {
    setMostrarVentanaEmergente(false); // Oculta la ventana emergente
    setVentanaCerrada(true); // Marca la ventana como cerrada para evitar que vuelva a abrirse
    setMostrarBotonesRespuesta(true); // Muestra los botones de respuesta al cerrar la ventana
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.caja}></div> {/* Fondo de pantalla */}

      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}

      {/* Área de clic para abrir la ventana emergente */}
      {!ventanaCerrada && (
        <div
          className={styles.centroDeClic}
          onClick={abrirVentanaEmergente}
        ></div>
      )}

      {mostrarVentanaEmergente && (
        <div className={styles.ventanaEmergente}>
          <p>Piensa con cuidado, porque solo una de ellas te permitirá avanzar. Si eliges la correcta, se abrirá la puerta a la siguiente prueba. Pero si te equivocas… bueno, tal vez prefieras no descubrirlo.</p>
          <button onClick={cerrarVentanaEmergente}>Cerrar</button> {/* Botón para cerrar la ventana */}
        </div>
      )}

      {/* Botones de respuesta, se muestran después de cerrar la ventana emergente */}
      {mostrarBotonesRespuesta && (
        <div className={styles.botones}>
          <button onClick={() => manejarRespuesta("oscuridad")}>Oscuridad</button>
          <button onClick={() => manejarRespuesta("sombra")}>Sombra</button>
          <button onClick={() => manejarRespuesta("silencio")}>Silencio</button>
          <button onClick={() => manejarRespuesta("muerte")}>Muerte</button>
        </div>
      )}

      {/* Botón para avanzar al siguiente acertijo que aparece solo si mostrarBotonSiguiente es true */}
      {mostrarBotonSiguiente && (
        <button className={styles.botonSiguiente} onClick={() => router.push("/acertijo-2")}>
          Siguiente Acertijo
        </button>
      )}
    </div>
  );
}
