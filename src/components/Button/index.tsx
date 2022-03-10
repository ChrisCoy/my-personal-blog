import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  className?: string;
  color?: string;
  children?: ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <div className={props.className}>
      <button
        className={styles.button}
        style={{ borderColor: props.color, color: "white"}}
      >
        {props.children}
      </button>
    </div>
  );
}
