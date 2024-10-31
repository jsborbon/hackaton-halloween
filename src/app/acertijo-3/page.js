"use client";
import React, { useState, useEffect } from "react";
import Octave from "./Octave"; // Ensure the path is correct
import style from "./acertijo3.module.css"; // Next.js looks for styles in the 'styles' directory
import sounds from "./sounds"; // Import your sounds

const Acertijo3 = () => {
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
    "c5",
    "c5",
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
        alert("¡Ganaste el juego!"); // Victory message
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

    main.onmouseup = (e) => {
      e.preventDefault();
      setIsMouseDown(false);
      pianoKeys.forEach((key) => {
        key.removeAttribute("active");
        const NOTE = key.getAttribute("note")?.toUpperCase(); // Ensure the note is uppercase
        stopAudio(NOTE); // Stop audio on mouse up
      });
    };

    // Cleanup event listeners on component unmount
    return () => {
      pianoKeys.forEach((key) => {
        key.onmousedown = null;
        key.onmouseleave = null;
        key.onmouseover = null;
      });
      main.onmouseup = null;
    };
  }, [isMouseDown, activeNotes, currentNoteIndex, checkNote, startAudio]);

  return (
    <main role="main" className={style.main}>
      <div id="pianoContainer" className={style.pianoContainer}>
        <Octave octave="3" />
        <Octave octave="4" />
      </div>
    </main>
  );
};

export default Acertijo3;
