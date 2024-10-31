"use client"; // Asegúrate de incluir esta línea para habilitar la renderización del lado del cliente en Next.js

import { useState } from "react"; // Importa el hook useState de React para manejar el estado
import styles from "./acertijo1.module.css"; // Importa los estilos del archivo CSS correspondiente

export default function Acertijo1() {
  // Array que contiene los mensajes a mostrar en orden
  const mensajes = [
    "Has llegado a la primera habitación...",
    "Te persigue un asesino...",
    "Tienes 8 min para recorrer la casa y salir...",
    "Ahora mismo estás encerrado, la única salida está carrada con candado y no sabes el código",
    "El asesino está justo detrás tuyo...",
    "Te recomiendo empezar a buscar pistas, se te acaba el tiempo...",
    "Sientes que algo en la habitación intenta llamar tu atención...",
  ];

  // Estado para llevar el índice del mensaje actual
  const [mensajeIndex, setMensajeIndex] = useState(0);
  // Estado para controlar si el texto se debe mostrar
  const [mostrarTexto, setMostrarTexto] = useState(true);
  // Estado para almacenar el mensaje de respuesta de la verificación de contraseña
  const [passwordMessage, setPasswordMessage] = useState("");
  // Estado para controlar la visibilidad de los inputs
  const [mostrarInputs, setMostrarInputs] = useState(false);

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

  // Función para mostrar los inputs al hacer clic en el círculo azul
  const toggleInputs = () => {
    setMostrarInputs(true); // Muestra los inputs cuando se hace clic en el círculo
  };

  return (
    <>
      <div className={styles.circuloAzul} onClick={toggleInputs}>
        {/* Círculo azul que se puede hacer clic para mostrar los inputs */}
      </div>
      
    <div className={styles.caja}>
      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}
      
      {mostrarInputs && ( // Condicional para mostrar los inputs al hacer clic en el círculo
        <>
        <div className={styles.mensajePista}> UN CUARTO PARA LLEGAR</div>
        <img src="/imgs/relojGrande.png" alt="Reloj de Acertijo" className={styles.imagenReloj} />
          <div className={styles.inputs}>
            <input className={styles.input} type="number" id="input1" defaultValue="1" max="12" min="1" maxLength="2" />
            <input className={styles.input} type="number" id="input2" defaultValue="1" max="12" min="1" maxLength="2" />
            <input className={styles.input} type="number" id="input3" defaultValue="1" max="12" min="1" maxLength="2" />
          </div>
          <button className={styles.button} onClick={checkPassword}>Enviar</button>
          <p id="message" className={styles.message}>
            {passwordMessage}
          </p>
        </>
      )}
    </div>
    </>
  );
}
