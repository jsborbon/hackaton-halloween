"use client";
import styles from "./final.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Final() {
  const router = useRouter();

  useEffect(() => {
    const title = "Has conseguido salir, enhorabuena! :)";
    const speed = 100; 
    const repeatInterval = 5000;
    let index = 0;
    let typingTimeout;
    let repeatTimeout;

    const typingEffect = () => {
      
      document.getElementById("typingText").innerHTML = '';
      index = 0;

      const type = () => {
        if (index < title.length) {
          document.getElementById("typingText").innerHTML += title.charAt(index);
          index++;
          typingTimeout = setTimeout(type, speed);
        } else {
          repeatTimeout = setTimeout(typingEffect, repeatInterval);
        }
      };

      type();//iniciamos el efecto por cada vez q se repita
    };

    typingEffect(); //y aqui por primera vez

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(repeatTimeout);
    };

  }, []);

  return (
    <div className={styles.imgFondo}>
      <div className={styles.caja}>
        <h1 id="typingText"></h1> {/*desde esta variable llamamos al titulo*/}
        
      </div>
    </div>
  );
}
