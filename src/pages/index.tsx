import styles from "./styles.module.scss";

import { GetStaticProps } from "next";
//import { FiCalendar, FiUser } from "react-icons/fi";
import Link from "next/link";

import { getPrismicClient } from "../services/prismic";
import { predicate as prismicPredicate } from "@prismicio/client";

//import commonStyles from '../styles/common.module.scss';
// import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import { RichText } from "prismic-dom";
import ItemPost from "../components/ItemPost";
import TopPostItem from "../components/TopPostItem";
import LineTitle from "../components/LineTitle";
import Button from "@components/Button";

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
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.posts}>
          <LineTitle className={styles.rightLine}>Posts</LineTitle>
          <div className={styles.postsCards}>
            {posts.map((post) => {
              return <ItemPost post={post} key={post.uid} />;
            })}
          </div>
          {nextPage && (
            <Button color="var(--highlight)" className={styles.buttonMorePost}>
              Carregar mais posts
            </Button>
          )}
        </div>

        <div className={styles.topPosts}>
          <LineTitle left color="effects" className={styles.leftLine}>
            Top Posts
          </LineTitle>
          <div className={styles.topPostsCard}>
            {posts.map((post) => {
              return <TopPostItem post={post} key={post.uid} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();
  const postsResponse = await client.get({
    predicates: [prismicPredicate.at("document.type", "post")],
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 9,
  });

  const posts = postsResponse.results.map<Post>((post) => {
    return {
      uid: post.uid,
      first_publication_date: "12/06/2022",
      data: {
        title: post.data.title,
        author: post.data.author,
        resume: RichText.asText(post.data.content[0].body).slice(0, 200) + "...",
        img: post.data.banner?.url || null,
      },
    };
  });

  // for tests without internet
  // var posts = [
  //   {
  //     uid: "url-de-teste",
  //     first_publication_date: "12/06/2022",
  //     data: {
  //       title: "Como criar um blog do zero",
  //       author: "Christopher",
  //       resume:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus odit cumque ipsa! Numquam accusamus repudiandae libero, esse dolorum soluta reprehenderit et saepe at incidunt perspiciatis autem possimus nobis. Amet, obcaecati.,",
  //       img: "",
  //     },
  //   },
  // ];

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
