import Link from "next/link";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { SiWolframlanguage } from "react-icons/si";
import { MdMenu, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className={styles.containerFix}>
        <header className={openMenu ? styles.openMenu : styles.Container}>
          <div className={styles.Content}>
            <div className={styles.logo}>
              <Link href="/">
                <div>
                  <SiWolframlanguage size={48} color={"#e84855"} className={styles.logoWolf} />
                </div>
              </Link>
              <div>
                {!openMenu ? (
                  <MdMenu
                    size={40}
                    className={styles.menuHamburger}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                ) : (
                  <MdClose
                    size={40}
                    className={styles.menuHamburger}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                )}
              </div>
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
      </div>
    </div>
  );
}
