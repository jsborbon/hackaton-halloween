"use client";
import styles from "./rules.module.css";
import { useRouter } from "next/navigation";

export default function Rules() {
  const router = useRouter();

  return (
    <div className={styles.imgFondo}>
      <div className={styles.caja}>
        <h1>HOLAA 2 🎃!</h1>
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
