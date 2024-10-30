"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import { useState, useEffect } from "react";
import styles from "./acertijo2.module.css";

export default function Acertijo2() {
  // Array de mensajes que se mostrarán secuencialmente
  const mensajes = [
    "Primer mensaje...",
    "Segundo mensaje...",
    "Tercer mensaje...",
    "Último mensaje...",
  ];

  // Declaración de estados
  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [mostrarTexto, setMostrarTexto] = useState(true); // Controla si el texto se muestra o no
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false); // Controla si la ventana emergente se muestra o no
  const [mostrarInput, setMostrarInput] = useState(false); // Controla si el input se muestra después de cerrar la ventana emergente
  const [ventanaCerrada, setVentanaCerrada] = useState(false); // Indica si la ventana emergente fue cerrada

  // Efecto para controlar la visibilidad del texto según el índice de mensaje
  useEffect(() => {
    if (mensajeIndex >= mensajes.length) {
      setMostrarTexto(false); // Oculta el texto si el índice supera el número de mensajes
    } else {
      setMostrarTexto(true); // Muestra el texto si hay mensajes restantes
    }
  }, [mensajeIndex]); // Dependencia en mensajeIndex para actualizar cuando este cambie

  // Función que incrementa el índice del mensaje al hacer clic
  const manejarClick = () => {
    setMensajeIndex((prevIndex) => prevIndex + 1);
  };

  // Función que maneja el cambio en el input, permitiendo solo un dígito numérico
  const manejarInputChange = (e) => {
    const valor = e.target.value;
    if (/^[0-9]?$/.test(valor)) {
      setInputValue(valor); // Solo actualiza si el valor es un número de un solo dígito
    }
  };

  // Función para abrir la ventana emergente, solo si aún no ha sido cerrada
  const abrirVentanaEmergente = () => {
    if (!ventanaCerrada) {
      setMostrarVentanaEmergente(true); // Abre la ventana emergente
    }
  };

  // Función para cerrar la ventana emergente y mostrar el input
  const cerrarVentanaEmergente = () => {
    setMostrarVentanaEmergente(false); // Oculta la ventana emergente
    setMostrarInput(true); // Muestra el input
    setVentanaCerrada(true); // Marca la ventana como cerrada para evitar que vuelva a abrirse
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.caja}></div> {/* Fondo de pantalla */}
      {/* Muestra el mensaje actual si mostrarTexto es true */}
      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}
      {/* Área de clic central que abre la ventana emergente, solo si ventanaCerrada es false */}
      {!ventanaCerrada && (
        <div
          className={styles.areaDeClic}
          onClick={abrirVentanaEmergente}
        ></div>
      )}
      {/* Ventana emergente que aparece al hacer clic en el área central */}
      {mostrarVentanaEmergente && (
        <div className={styles.ventanaEmergente}>
          <p>Texto en la ventana emergente</p>
          <button onClick={cerrarVentanaEmergente}>Cerrar</button>{" "}
          {/* Botón para cerrar la ventana */}
        </div>
      )}
      {/* Input que aparece en el centro de la pantalla tras cerrar la ventana emergente */}
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
    </div>
  );
}
