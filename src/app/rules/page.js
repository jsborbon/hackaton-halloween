"use client";
import styles from "./rules.module.css";
import { useRouter } from "next/navigation";

export default function Rules() {
  const router = useRouter();

  return (
    <div className={styles.imgFondo}>
      <div className={styles.caja}>
        <h3>Objetivos del Juego:</h3>
        <p>
        Avanzar a través de seis habitaciones, 
        resolviendo acertijos para alcanzar la libertad. 
        Cada cuarto encierra un reto; resolverlo correctamente 
        abre la puerta hacia el siguiente, mientras que un error 
        puede retrasar o incluso detener tu progreso. 
        
        Piensa con cuidado: el juego pone a prueba tu ingenio y tu juicio.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.btnNextPage}
        >
          IniciO 👻
        </button>
      </div>
    </div>
  );
}
