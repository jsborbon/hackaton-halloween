"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import { useRouter } from "next/navigation"; // Importa useRouter de Next.js
import styles from "./acertijo5.module.css";

import React, { useState, useEffect } from "react";
import Octave from "./Octave"; // Ensure the path is correct
import sounds from "./sounds"; // Import your sounds

export default function Acertijo5() {
  const router = useRouter(); // Inicializa useRouter para redireccionar

  const mensajes = [
    "¿A dónde crees que vas? Crees que puedes escapar como si esto fuese un juego de niños..",
    "A ver si superas mi prueba, me gusta una melodía, y quiero que me la toques.",
    "mi♭3  mi♭3 si♭3 si♭3 la3 sol♭3 mi♭3 mi♭3 si♭3 si♭3 la3 mi♭4 mi♭4 mi♭3 mi♭3 re4 mi♭4 do4 do4 re♭4 si♭3 fa3 si♭3 mi♭3.",
    "¿Qué? ¿Que te has olvidado? No importa, lo sacarás con el oído.",
  ];

  const [mensajeIndex, setMensajeIndex] = useState(0); // Índice del mensaje actual
  const [mostrarTexto, setMostrarTexto] = useState(true); // Controla si el texto se muestra o no
  const [mostrarBotonSiguiente, setMostrarBotonSiguiente] = useState(false); // Controla la visibilidad del botón para el siguiente acertijo
  const [mostrarPiano, setMostrarPiano] = useState(false); // Controla la visibilidad del piano

  function colocarAudio() {
    // Coloca el audio en la página
    const audio = document.createElement("audio");
    audio.src = "/sounds/acertijo-5.mp3";
    audio.id = "audio";
    audio.autoplay = true;
    audio.loop = true;
    document.body.appendChild(audio);
  }

  useEffect(() => {
    if (mensajeIndex >= mensajes.length) {
      setMostrarTexto(false); // Oculta el texto si el índice supera el número de mensajes
      colocarAudio(); // Coloca el audio en la página
      setMostrarPiano(true); // Muestra el piano
    } else {
      setMostrarTexto(true); // Muestra el texto si hay mensajes restantes
    }
  }, [mensajeIndex, mensajes.length]); // Dependencia en mensajeIndex para actualizar cuando este cambie

  const manejarClick = () => {
    setMensajeIndex((prevIndex) => prevIndex + 1);
  };

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0); // Index of the current note in the sequence
  const sequence = [
    "EB3",
    "EB3",
    "BB3",
    "BB3",
    "A3",
    "GB3",
    "EB3",
    "EB3",
    "BB3",
    "BB3",
    "A3",
    "EB3",
    "EB3",
    "EB4",
    "EB4",
    "D4",
    "EB4",
    "C4",
    "C4",
    "DB4",
    "BB3",
    "F3",
    "SB3",
    "EB3",
  ]; // Sequence of notes to win

  const startAudio = (NOTE) => {
    // Verify if the note exists in the sounds object
    if (!sounds[NOTE]) {
      console.error(`Sound not found for note: ${NOTE}`);
      return; // Stop execution if the note is not found
    }

    // If the note is already active, do not restart it
    if (activeNotes.has(NOTE)) return;

    // Add the note to active notes
    setActiveNotes((prev) => new Set(prev).add(NOTE));

    // Only play the audio if it's not already playing
    sounds[NOTE].pause();
    sounds[NOTE].currentTime = 0;

    const playPromise = sounds[NOTE].play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn(`Autoplay prevented for note: ${NOTE}`, error);
      });
    }
  };

  const stopAudio = (NOTE) => {
    if (!sounds[NOTE]) return;

    // Fade out the sound instead of stopping it abruptly
    sounds[NOTE].pause();
    sounds[NOTE].currentTime = 0;

    // Remove the note from active notes
    setActiveNotes((prev) => {
      const newActiveNotes = new Set(prev);
      newActiveNotes.delete(NOTE);
      return newActiveNotes;
    });
  };

  const checkNote = (NOTE) => {
    // Check if the played note is correct in the sequence
    if (NOTE === sequence[currentNoteIndex]) {
      setCurrentNoteIndex((prevIndex) => prevIndex + 1); // Increase the current note index
      // Check if all notes have been played
      if (currentNoteIndex + 1 === sequence.length) {
        setMostrarBotonSiguiente(true); // Show the next riddle button
        resetGame(); // Restart the game
      }
    } else {
      // If an incorrect note is played, restart the game
      resetGame();
    }
  };

  const resetGame = () => {
    setCurrentNoteIndex(0); // Reset the current note index
    setActiveNotes(new Set()); // Reset active notes
  };

  useEffect(() => {
    const main = document.querySelector("main");
    const pianoKeys = document.querySelectorAll("#pianoContainer span");

    pianoKeys.forEach((key) => {
      const NOTE = key.getAttribute("note")?.toUpperCase(); // Ensure the note is uppercase

      key.onmousedown = (e) => {
        e.preventDefault();
        setIsMouseDown(true);
        startAudio(NOTE); // Start audio on mouse down
        e.target.setAttribute("active", true);
        checkNote(NOTE); // Check if the note is correct
      };

      key.onmouseleave = (e) => {
        e.preventDefault();
        e.target.removeAttribute("active");
        if (isMouseDown) stopAudio(NOTE); // Stop audio on mouse leave
      };

      key.onmouseover = (e) => {
        e.preventDefault();
        if (isMouseDown) {
          startAudio(NOTE); // Start audio on mouse over if mouse is down
          e.target.setAttribute("active", true);
          checkNote(NOTE); // Check if the note is correct
        }
      };
    });

    if (main) {
      // Ensure 'main' exists before adding the event listener
      main.onmouseup = (e) => {
        e.preventDefault();
        setIsMouseDown(false);
        pianoKeys.forEach((key) => {
          key.removeAttribute("active");
          const NOTE = key.getAttribute("note")?.toUpperCase(); // Ensure the note is uppercase
          stopAudio(NOTE); // Stop audio on mouse up
        });
      };
    }

    // Cleanup event listeners on component unmount
    return () => {
      pianoKeys.forEach((key) => {
        key.onmousedown = null;
        key.onmouseleave = null;
        key.onmouseover = null;
      });
      if (main) {
        main.onmouseup = null; // Only set to null if main exists
      }
    };
  }, [isMouseDown, activeNotes, currentNoteIndex, checkNote, startAudio]);

  return (
    <div className={styles.contenedor}>
      <div className={styles.caja}>
        {mostrarTexto && (
          <div className={styles.textoFlotante} onClick={manejarClick}>
            {mensajes[mensajeIndex]}
          </div>
        )}
        {mostrarPiano && (
          <main role="main" className={styles.pianoDivContainer}>
            <div id="pianoContainer" className={styles.pianoContainer}>
              <Octave octave="3" />
              <Octave octave="4" />
            </div>
          </main>
        )}
      </div>{" "}
      {/* Fondo de pantalla */}
      {/* Botón para avanzar al siguiente acertijo que aparece solo si mostrarBotonSiguiente es true */}
      {mostrarBotonSiguiente && (
        <button
          className={styles.botonSiguiente}
          onClick={() => router.push("/acertijo-3")}
        >
          Siguiente Acertijo
        </button>
      )}
    </div>
  );
}
