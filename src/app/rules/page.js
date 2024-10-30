"use client";
import styles from "./rules.module.css";
import { useRouter } from "next/navigation";

export default function Rules() {
  const router = useRouter();

  return (
    <div className={styles.imgFondo}>
      <div className={styles.caja}>
        <h3>Objetivo del Juego:</h3>
      </div>

      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.btnNextPage}
        >
          Inicio 👻
        </button>
      </div>
    </div>
  );
}
