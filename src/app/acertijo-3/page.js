"use client"; // Asegúrate de incluir esta línea para indicar que el componente es del lado del cliente

import styles from "./acertijo3.module.css";
import { useRouter } from "next/navigation";

export default function Acertijo3() {
  const router = useRouter();

  const handleClickIzquierda = () => {
    router.push("/susto");
  };
  
  const handleClickDerecha = () => {
    router.push("/acertijo-2");
  };

  return (
    <div className={styles.fondoPuertas}>
      <div className={styles.puertaIzquierda} onClick={handleClickIzquierda}>
        <h2>PRIMERA PUERTA</h2>
      </div>
      <div className={styles.puertaDerecha} onClick={handleClickDerecha}>
        <h2>SEGUNDA PUERTA</h2>
      </div>
    </div>
  );
}
