import styles from "./styles.module.scss";

import { GetStaticProps } from "next";
//import { FiCalendar, FiUser } from "react-icons/fi";
import Link from "next/link";

import { getPrismicClient } from "../services/prismic";
import { predicate as prismicPredicate } from "@prismicio/client";

//import commonStyles from '../styles/common.module.scss';
// import styles from "./home.module.scss";
import { useState } from "react";
import { RichText } from "prismic-dom";
import ItemPost from "../components/ItemPost";

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

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  //console.log(postsPagination);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  console.log(posts);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <title className={styles.headerTitle}>Posts</title>
        <div className={styles.lineBottom}></div>
        <div className={styles.posts}>
          {posts.map((post) => (
            <ItemPost post={post} />
          ))}
        </div>
      </section>
      <section className={styles.topPosts}>
        <div className={styles.lineTop}></div>
        <div className={styles.topPostsContent}>
          <title>Top Posts</title>
        </div>
            <ItemPost post={posts[0]}/>
            <ItemPost post={posts[0]}/>
            <ItemPost post={posts[0]}/>
            
      </section>
    </main>
  );

  // async function showMorePosts() {
  //   fetch(nextPage)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const postsTemp = data.results.map((post) => {
  //         return {
  //           uid: post.uid,
  //           first_publication_date: data.first_publication_date,
  //           data: {
  //             title: post.data.title,
  //             subtitle: post.data.subtitle,
  //             author: post.data.author,
  //           },
  //         };
  //       });

  //       setNextPage(data.next_page);
  //       setPosts([...posts, ...postsTemp]);
  //     });
  // }

  // return (
  //   <main className={styles.container}>
  //     <div className={styles.posts}>
  //       <nav className={styles.header}>
  //         <img src="/logo.svg" alt="logo" />
  //       </nav>

  //       {posts.map((post) => {
  //         return (
  //           <Link href={`/post/${post.uid}`} key={post.uid}>
  //             <a>
  //               <h1>{post.data.title}</h1>
  //               <p>{post.data.subtitle}</p>
  //               <div>
  //                 <FiCalendar className={styles.icon} />
  //                 <time>{/* {post.first_publication_date} */}15 mar 2021</time>
  //                 <FiUser className={styles.icon} />
  //                 <p>{post.data.author}</p>
  //               </div>
  //             </a>
  //           </Link>
  //         );
  //       })}

  //       {nextPage != null && (
  //         <strong onClick={() => showMorePosts()}>Carregar mais posts</strong>
  //       )}
  //     </div>
  //   </main>
  // );

  return <></>;
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  //console.log(prismic);

  // const postsResponse = await prismic.getAllByType("posts", {
  //   orderings: {
  //     field: "document.first_publication_date",
  //     direction: "desc",
  //   },
  //   pageSize: 1,
  // });

  const postsResponse = await client.get({
    predicates: [prismicPredicate.at("document.type", "post")],
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 24,
  });

  const posts = postsResponse.results.map<Post>((post) => {
    return {
      uid: post.uid,
      // first_publication_date: post.first_publication_date,
      first_publication_date: "12/06/2022",
      data: {
        title: post.data.title,
        author: post.data.author,
        resume: RichText.asText(post.data.content[0].body).slice(0, 200) + "...",
        img: post.data.banner.url,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
    revalidate: 10,
  };
};
