import Link from "next/link";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import { SiWolframlanguage } from "react-icons/si";
import { MdMenu, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpenMenu(false);
  }, [router.asPath]);

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
                    className={styles.closeButton}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                )}
              </div>
            </div>

            <nav>
              <Link href="/">
                <a
                  className={styles.active}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Posts
                </a>
              </Link>
              <Link href="/in-construction">
                <a
                  className={styles.item}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Tecnologia
                </a>
              </Link>
              <Link href="/in-construction">
                <a
                  className={styles.item}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Arte
                </a>
              </Link>
              <Link href="/in-construction">
                <a
                  className={styles.item}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Sobre
                </a>
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
