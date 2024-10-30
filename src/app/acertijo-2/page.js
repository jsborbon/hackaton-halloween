"use client"; // Asegúrate de incluir esta línea

import { useState, useEffect } from "react";
import styles from "./acertijo2.module.css";

export default function Acertijo2() {
  const mensajes = [
    "Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...Primer mensaje...",
    "Segundo mensaje...",
    "Tercer mensaje...",
    "Último mensaje...",
  ];

  const [mensajeIndex, setMensajeIndex] = useState(0);
  const [mostrarTexto, setMostrarTexto] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);
  const [mostrarInput, setMostrarInput] = useState(false);
  const [ventanaCerrada, setVentanaCerrada] = useState(false); // Nueva bandera

  useEffect(() => {
    if (mensajeIndex >= mensajes.length) {
      setMostrarTexto(false);
    } else {
      setMostrarTexto(true);
    }
  }, [mensajeIndex]);

  const manejarClick = () => {
    setMensajeIndex((prevIndex) => prevIndex + 1);
  };

  const manejarInputChange = (e) => {
    const valor = e.target.value;
    if (/^[0-9]?$/.test(valor)) {
      setInputValue(valor);
    }
  };

  const abrirVentanaEmergente = () => {
    if (!ventanaCerrada) {
      // Solo abre si no está cerrada
      setMostrarVentanaEmergente(true);
    }
  };

  const cerrarVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
    setMostrarInput(true);
    setVentanaCerrada(true); // Marca la ventana como cerrada
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.caja}></div>

      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}

      {/* Área de clic en el centro de la pantalla */}
      {!ventanaCerrada && (
        <div
          className={styles.areaDeClic}
          onClick={abrirVentanaEmergente}
        ></div>
      )}

      {mostrarVentanaEmergente && (
        <div className={styles.ventanaEmergente}>
          <p>Texto en la ventana emergente</p>
          <button onClick={cerrarVentanaEmergente}>Cerrar</button>
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
    </div>
  );
}
