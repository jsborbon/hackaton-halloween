"use client";
import { useState } from "react";
import styles from "./acertijo3.module.css";

export default function CajaMusical() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = document.getElementById("audio");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.caja}>
      <button onClick={toggleAudio} className={styles.boton}>
        {isPlaying ? "Detener" : "Reproducir"}
      </button>
      <audio id="audio" src="/sounds/acertijo-3.mp3" loop />
      <div className={styles.tapa}></div>
      <div className={styles.cuerpo}></div>
    </div>
  );
}
