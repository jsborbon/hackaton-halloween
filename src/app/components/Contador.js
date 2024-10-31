// app/Contador.js
"use client"; // Asegúrate de que este componente sea del lado del cliente

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import styles from './contador.module.css'; // Asegúrate de importar tus estilos

const Contador = () => {
  const [tiempoRestante, setTiempoRestante] = useState(() => {
    const tiempoGuardado = localStorage.getItem("tiempoRestante");
    return tiempoGuardado ? JSON.parse(tiempoGuardado) : 8 * 60; // 8 minutos en segundos
  });

  const [isActive, setIsActive] = useState(true);
  const router = useRouter(); // Inicializa el router

  useEffect(() => {
    let intervalo;

    if (isActive && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => {
          const nuevoTiempo = prev - 1;
          localStorage.setItem("tiempoRestante", JSON.stringify(nuevoTiempo));
          return nuevoTiempo;
        });
      }, 1000);
    } else if (tiempoRestante === 0) {
      setIsActive(false);
      localStorage.removeItem("tiempoRestante"); // Opcional: limpiar el tiempo al llegar a 0
      router.push('/susto'); // Redirigir a la nueva página
    }

    return () => clearInterval(intervalo);
  }, [isActive, tiempoRestante, router]); // Asegúrate de incluir router en las dependencias

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${minutos}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className={styles.contador}>
      <h2>Tiempo restante: {formatearTiempo(tiempoRestante)}</h2>
    </div>
  );
};

export default Contador;
