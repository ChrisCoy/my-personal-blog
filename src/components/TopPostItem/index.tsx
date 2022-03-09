import styles from "./styles.module.scss";
import { BsPerson } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";
import background from "@public/background.jpg";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    author: string;
    resume: string;
    img: string;
  };
}

interface itemPostProps {
  post: Post;
}

export default function TopPostItem({ post }: itemPostProps) {
  return (
    <Link href={`/post/${post.uid}`}>
      <a className={styles.container}>
        <div
          className={styles.background}
          style={{
            backgroundImage: `url("${background.src}")`,
          }}
        >
          <div className={styles.content}>
            <div className={styles.info}>
              <p>
                <BsPerson size={22} /> {post.data.author}
              </p>
              <time>
                <AiOutlineClockCircle size={22} />3 min
              </time>
            </div>
            <div className={styles.title}>{post.data.title}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
