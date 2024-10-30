"use client";
import Image from "next/image";
import Banner from "./components/Banner";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.imgFondo}>
      <div className={styles.caja}>
        <h1>Bienvenido al Juego de los Seis Cuartos 🎃!</h1>
      </div>

      <div>
        <button
          type="button"
          onClick={() => router.push("/rules")}
          className={styles.btnNextPage}
        >
          Iniciar Aventura 👻
        </button>
      </div>
    </div>
  );
}
