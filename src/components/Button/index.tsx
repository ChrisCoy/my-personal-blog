import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: string;
  children?: ReactNode;
}

export default function Button({ className, color, children, ...rest }: ButtonProps) {
  return (
    <div className={className} {...rest}>
      <button className={styles.button} style={{ borderColor: color, color: "white" }}>
        {children}
      </button>
    </div>
  );
}
