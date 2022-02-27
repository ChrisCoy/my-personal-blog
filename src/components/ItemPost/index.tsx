import styles from "./styles.module.scss";

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
  console.log(post);
  return (
    <div className={styles.postsItem} key={post.uid}>
      <div className={styles.content}>
        <div className={styles.background}>
          <img src={post.data.img} alt="img" />
          <p className={styles.author}>{post.data.author}</p>
          <time className={styles.time}>{post.first_publication_date}</time>
          <div className={styles.strip}></div>
        </div>
        <p className={styles.resume}>{post.data.resume}aaaa</p>
      </div>

      <div className={styles.title}>
        <title className={styles.title}>
          {post.data.title} mais coisa no titulo pra encher linguça
        </title>
      </div>
    </div>
  );
}
