import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface lineTitleProps {
  children?: ReactNode;
  left?: boolean;
  mid?: boolean;
  color?: "highlight" | "effects";
}

export default function LineTitle({
  children,
  left,
  mid,
  color = "highlight",
}: lineTitleProps) {
  return (
    <div
      className={styles.container}
      style={{ alignItems: left ? "flex-end" : mid && "center" }}
    >
      <div className={styles.title} style={{ borderColor: `var(--${color})` }}>
        {children}
      </div>
      <div style={{ backgroundColor: `var(--${color})` }} />
    </div>
  );
}
