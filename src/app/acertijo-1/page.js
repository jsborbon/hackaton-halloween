"use client"; // Asegúrate de incluir esta línea para habilitar la renderización del lado del cliente en Next.js

import { useState } from "react"; // Importa el hook useState de React para manejar el estado
import styles from "./acertijo1.module.css"; // Importa los estilos del archivo CSS correspondiente

export default function Acertijo1() {
  // Array que contiene los mensajes a mostrar en orden
  const mensajes = [
    "Primer mensaje...",
    "Segundo mensaje...",
    "Tercer mensaje...",
    "Último mensaje...",
  ];

  // Estado para llevar el índice del mensaje actual
  const [mensajeIndex, setMensajeIndex] = useState(0);
  // Estado para controlar si el texto se debe mostrar
  const [mostrarTexto, setMostrarTexto] = useState(true);
  // Estado para almacenar el mensaje de respuesta de la verificación de contraseña
  const [passwordMessage, setPasswordMessage] = useState("");

  // Función para verificar la contraseña ingresada
  const checkPassword = () => {
    // Obtiene los valores de los inputs mediante sus IDs
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;
    const input3 = document.getElementById("input3").value;

    // Compara los valores ingresados con la contraseña correcta
    if (input1 === "7" && input2 === "4" && input3 === "5") {
      // Si es correcta, actualiza el mensaje de contraseña
      setPasswordMessage("¡Enhorabuena!");
    } else {
      // Si es incorrecta, muestra un mensaje de error
      setPasswordMessage("Inténtalo de nuevo.");
    }
  };

  // Función para manejar el clic en el mensaje
  const manejarClick = () => {
    setMensajeIndex((prevIndex) => {
      // Incrementa el índice del mensaje
      const newIndex = prevIndex + 1;

      // Verifica si se ha alcanzado el final de los mensajes
      if (newIndex >= mensajes.length) {
        setMostrarTexto(false); // Oculta el texto si ya no hay más mensajes
        return mensajes.length - 1; // Evita que el índice supere la longitud del array
      }
      return newIndex; // Retorna el nuevo índice
    });
  };

  return (
    <div className={styles.caja}>
      {" "}
      {/* Contenedor principal del componente */}
      {mostrarTexto && ( // Verifica si se debe mostrar el texto
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {" "}
          {/* Texto que se puede hacer clic */}
          {mensajes[mensajeIndex]}{" "}
          {/* Muestra el mensaje actual basado en el índice */}
        </div>
      )}
      <div className={styles.inputs}>
        {" "}
        {/* Contenedor para los inputs */}
        <input
          className={styles.input} // Clase de estilos para el input
          type="number" // Tipo de input numérico
          id="input1" // ID del primer input
          value="1" // Valor inicial del primer input
          max="12" // Valor máximo
          min="1" // Valor mínimo
          maxLength="2" // Longitud máxima de caracteres
        />
        <input
          className={styles.input} // Clase de estilos para el input
          type="number" // Tipo de input numérico
          id="input2" // ID del segundo input
          value="1" // Valor inicial del segundo input
          max="12" // Valor máximo
          min="1" // Valor mínimo
          maxLength="2" // Longitud máxima de caracteres
        />
        <input
          className={styles.input} // Clase de estilos para el input
          type="number" // Tipo de input numérico
          id="input3" // ID del tercer input
          value="1" // Valor inicial del tercer input
          max="12" // Valor máximo
          min="1" // Valor mínimo
          maxLength="2" // Longitud máxima de caracteres
        />
      </div>
      <button className={styles.button} onClick={checkPassword}>
        {" "}
        {/* Botón para enviar los inputs */}
        Enviar
      </button>
      <p id="message" className={styles.message}>
        {" "}
        {/* Párrafo para mostrar el mensaje de la contraseña */}
        {passwordMessage} {/* Muestra el mensaje de la contraseña */}
      </p>
    </div>
  );
}
