import background from "@public/background.jpg";
import Head from "next/head";
import styles from "./post.module.scss";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "src/services/prismic";
import { predicate as prismicPredicate } from "@prismicio/client";

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    author: string;
    banner: {
      url: string;
    };
    resume: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post?: Post;
}

export default function Post({ post }: PostProps) {
  if (!post) {
    return <></>;
  }

  return (
    <>
      <Head>{<title>{post.data.title}</title>}</Head>
      <img src={post.data.banner.url} alt="background" className={styles.background} />
      {console.log(post)}
      <div className={styles.container}>
        <div className={styles.postInfo}>
          <h1>{post.data.title}</h1>
          <div>
            <p>
              <span>
                <FiUser className={styles.icon} />
              </span>
              {post.data.author}
            </p>
            <time>
              <span>
                <FiCalendar className={styles.icon} />
              </span>
              {post.first_publication_date}
            </time>
          </div>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postContent}>
            {post.data.content.map((content) => {
              return (
                <section key={content.heading}>
                  <h2>{content.heading}</h2>
                  {content.body.map((body) => {
                    return (
                      <div
                        key={Math.random()}
                        dangerouslySetInnerHTML={{ __html: body.text }}
                      />
                    );
                  })}
                  <p />
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getPrismicClient();
  const postsResponse = await client.get({
    predicates: [prismicPredicate.at("document.type", "post")],
  });

  const slugsUids = postsResponse.results.reduce((antPost, post) => {
    return [...antPost, { params: { slug: post.slugs[0] } }];
  }, []);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const client = getPrismicClient();
  const response = await client.get({
    predicates: [prismicPredicate.at("my.post.uid", slug)],
  });

  const post = {
    first_publication_date: response.results[0].first_publication_date || "42/42/2054",
    data: {
      subtitle: response.results[0].data.subtitle || "",
      title: response.results[0].data.title || "",
      banner: {
        url: response.results[0].data.banner.url || "",
      },
      author: response.results[0].data.author || "",
      content: response.results[0].data.content.map((content) => {
        return {
          heading: content.heading || "",
          body: content.body || "",
        };
      }),
    },
  };

  return {
    props: { post },
  };
};
