"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js
import styles from "./acertijo2.module.css";

export default function Acertijo2() {
  const router = useRouter(); // Inicializa useRouter para redireccionar

  const mensajes = [
    "Bienvenido al Segundo Cuarto. Veo que has logrado escapar del primer cuarto... pero no te confíes. Aquí dentro, las cosas se vuelven mucho más oscuras, y dudo que tengas lo necesario para salir de este lugar.",
    "La presión aumenta, y el tiempo sigue en tu contra, bajando cada segundo. Si no quieres que tu camino termine aquí, tendrás que moverte con rapidez.",
    "Cuando te sientas listo, haz clic en el centro de la pantalla para dar comienzo al acertijo. No olvides observar a tu alrededor en todo momento. Cada detalle cuenta, y en este cuarto, cualquier distracción podría ser fatal.",
  ];

  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [mostrarTexto, setMostrarTexto] = useState(true); // Controla si el texto se muestra o no
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false); // Controla si la ventana emergente se muestra o no
  const [mostrarInput, setMostrarInput] = useState(false); // Controla si el input se muestra después de cerrar la ventana emergente
  const [ventanaCerrada, setVentanaCerrada] = useState(false); // Indica si la ventana emergente fue cerrada
  const [mostrarBotonSiguiente, setMostrarBotonSiguiente] = useState(false); // Controla la visibilidad del botón para el siguiente acertijo

  useEffect(() => {
    if (mensajeIndex >= mensajes.length) {
      setMostrarTexto(false); // Oculta el texto si el índice supera el número de mensajes
    } else {
      setMostrarTexto(true); // Muestra el texto si hay mensajes restantes
    }
  }, [mensajeIndex]); // Dependencia en mensajeIndex para actualizar cuando este cambie

  const manejarClick = () => {
    setMensajeIndex((prevIndex) => prevIndex + 1);
  };

  // Función que maneja el cambio en el input, mostrando el botón solo si se introduce el número 1
  const manejarInputChange = (e) => {
    const valor = e.target.value;
    if (/^[0-9]?$/.test(valor)) { // Verifica que el valor sea un dígito único
      setInputValue(valor); // Actualiza el estado con el valor ingresado
      setMostrarBotonSiguiente(valor === "1"); // Muestra el botón solo si el valor es "1"
    }
  };

  const abrirVentanaEmergente = () => {
    if (!ventanaCerrada) {
      setMostrarVentanaEmergente(true); // Abre la ventana emergente
    }
  };

  const cerrarVentanaEmergente = () => {
    setMostrarVentanaEmergente(false); // Oculta la ventana emergente
    setMostrarInput(true); // Muestra el input
    setVentanaCerrada(true); // Marca la ventana como cerrada para evitar que vuelva a abrirse
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.caja}></div> {/* Fondo de pantalla */}

      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}

      {!ventanaCerrada && (
        <div
          className={styles.areaDeClic}
          onClick={abrirVentanaEmergente}
        ></div>
      )}

      {mostrarVentanaEmergente && (
        <div className={styles.ventanaEmergente}>
          <p>"El tiempo está cifrado en el lenguaje de los antiguos; desentraña el símbolo del amanecer para avanzar."</p>
          <button onClick={cerrarVentanaEmergente}>Cerrar</button> {/* Botón para cerrar la ventana */}
        </div>
      )}

      {mostrarInput && (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            id="input2"
            maxLength="1"
            value={inputValue}
            onChange={manejarInputChange}
          />
        </div>
      )}

      {/* Botón para avanzar al siguiente acertijo que aparece solo si mostrarBotonSiguiente es true */}
      {mostrarBotonSiguiente && (
        <button className={styles.botonSiguiente} onClick={() => router.push("/acertijo-4")}>
          Siguiente Acertijo
        </button>
      )}
    </div>
  );
}
