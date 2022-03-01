import styles from "./styles.module.scss";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function TopPostItem() {
  return (
    <div className={styles.container}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url("https://source.unsplash.com/C6oPXOatFD8)`,
        }}
      >
        <div className={styles.content}>
          <div className={styles.info}>
            <p>
              <BsPerson size={22} /> Christopher Lee
            </p>
            <time>
              <AiOutlineClockCircle size={22} />3 min
            </time>
          </div>
          <div className={styles.title}>
            Qualquer titulo mais coisa no titulo pra encher linguça
          </div>
        </div>
      </div>
    </div>
  );
}
