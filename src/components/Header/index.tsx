import Link from "next/link";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { SiWolframlanguage } from "react-icons/si";

export default function Header() {
  return (
    <header className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.logo}>
          <Link href="/">
            <div>
              <img src={logo.src} alt="" />
            </div>
          </Link>
        </div>

        <nav>
          <Link href="/">
            <a className={styles.active}>Posts</a>
          </Link>
          <Link href="/">
            <a className={styles.item}>Tecnologia</a>
          </Link>
          <Link href="/">
            <a className={styles.item}>Arte</a>
          </Link>
          <Link href="/">
            <a className={styles.item}>Sobre</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
