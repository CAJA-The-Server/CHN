"use client";
import { ReactNode } from "react";
import styles from "./slider.module.css";

type Props = {
  items: ReactNode[];
};

export default function Slider({ items }: Props) {
  return (
    <div className={styles.container}>
      <ul></ul>
    </div>
  );
}