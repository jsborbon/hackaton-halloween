"use client"; 

import React, { useEffect, useRef } from 'react';
import styles from './susto.module.css'; // Importa el archivo de estilos

const Susto = () => {
  const audioRef = useRef(null); // Crea una referencia para el elemento de audio

  // Usa useEffect para reproducir el sonido al cargar el componente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play(); // Reproduce el sonido
    }
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className={styles.container}>
      <audio ref={audioRef} src="/imgs/grito-de-terror.mp3" preload="auto" />
      {/* Aquí puedes añadir más contenido si lo deseas */}
    </div>
  );
};

export default Susto;
