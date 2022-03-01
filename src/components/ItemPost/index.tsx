import styles from "./styles.module.scss";
import { BsPerson } from "react-icons/bs";
import { RiCalendarLine } from "react-icons/ri";

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

export default function ItemPost({ post }: itemPostProps) {
  return (
    <div className={styles.container}>
      <div className={styles.postsItem}>
        <div className={styles.content}>
          <div className={styles.background}>
            {/* <img src={post.data.img} alt="img" /> */}

            <img src={`https://source.unsplash.com/1600x900/?beach`} alt="" />

            <p className={styles.author}>
              <BsPerson size={20} />
              {post.data.author}
            </p>
            <time className={styles.date}>
              <RiCalendarLine size={20} />
              {post.first_publication_date}
            </time>
            <div className={styles.strip}></div>
          </div>
          <p className={styles.resume}>{post.data.resume}aaaa</p>
        </div>

        <div className={styles.title}>
          <title className={styles.title}>
            {post.data.title + " e outro titulo pra ficar legal"}
          </title>
        </div>
      </div>
    </div>
  );
}
