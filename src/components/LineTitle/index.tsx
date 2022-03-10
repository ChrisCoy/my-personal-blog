import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface LineTitleProps {
  children?: ReactNode;
  left?: boolean;
  mid?: boolean;
  color?: "highlight" | "effects";
  className?: string;
}

export default function LineTitle({
  children,
  left,
  mid,
  color = "highlight",
  className = "",
}: LineTitleProps) {
  return (
    <div className={className}>
      <div
        className={styles.container}
        style={{
          alignItems: left ? "flex-end" : mid && "center",
        }}
      >
        <div className={styles.title} style={{ borderColor: `var(--${color})` }}>
          {children}
        </div>
        <div
          style={{
            backgroundImage: left
              ? `linear-gradient(-90deg, var(--${color}) 92% , transparent 100%)`
              : `linear-gradient(90deg, var(--${color}) 95% , transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
