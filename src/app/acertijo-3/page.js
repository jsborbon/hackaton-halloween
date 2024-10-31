"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import { useState } from "react";
import styles from "./acertijo3.module.css";
import { useRouter } from "next/navigation";

export default function Acertijo3() {
  const router = useRouter();

  const mensajes = [
    "Bienvenido al último cuarto. Aquí debes tomar una decisión.",
    "Elige sabiamente entre las dos puertas. Tu elección determinará tu destino.",
    "La presión aumenta mientras te enfrentas a lo desconocido. ¡Haz clic en una puerta!",
  ];

  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [mostrarTexto, setMostrarTexto] = useState(true); // Controla si el texto se muestra

  const handleClickIzquierda = () => {
    router.push("/susto");
  };
  
  const handleClickDerecha = () => {
    router.push("/acertijo-2");
  };

  const manejarClick = () => {
    setMensajeIndex((prevIndex) => Math.min(prevIndex + 1, mensajes.length - 1));
  };

  return (
    <div className={styles.fondoPuertas}>
      <div className={styles.puertaIzquierda} onClick={handleClickIzquierda}>
      </div>
      <div className={styles.puertaDerecha} onClick={handleClickDerecha}>
      </div>

      {mostrarTexto && (
        <div className={styles.textoFlotante} onClick={manejarClick}>
          {mensajes[mensajeIndex]}
        </div>
      )}
    </div>
  );
}
