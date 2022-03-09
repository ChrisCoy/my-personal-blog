import background from "@public/background.jpg";
import Head from "next/head";
import styles from "./post.module.scss";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "src/services/prismic";
import { predicate as prismicPredicate } from "@prismicio/client";

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

interface PostProps {
  post?: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>{<title>{"titulo provisorio"}</title>}</Head>
      <img src={background.src} alt="background" className={styles.background} />

      <div className={styles.container}>
        <div className={styles.postInfo}>
          <h1>Como criar um blog do zero sem nenhum conhecimento</h1>
          <div>
            {" "}
            <p>
              <span>
                <FiUser className={styles.icon} />
              </span>
              Christopher Lee
            </p>
            <time>
              <span>
                <FiCalendar className={styles.icon} />
              </span>
              28/12/2022
            </time>
          </div>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postContent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, sit? Rem
            accusamus ab vitae fugiat quis debitis quae molestias corrupti dolore? Commodi ab
            eum <span>obcaecati quibusdam</span> repellendus architecto in exercitationem.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque provident
            recusandae sit optio ut, praesentium cum deserunt quaerat, commodi nihil eos
            consequuntur corrupti sapiente laborum accusamus impedit voluptatem consequatur
            molestias. <span>maxime inventore</span>, dolor sit amet consectetur adipisicing
            elit. Voluptatum aspernatur excepturi laboriosam dolorem natus{" "}
            <span>maxime inventore</span>, officiis rem deserunt non placeat nostrum et
            nesciunt at cumque. Mollitia labore repellendus tempore? Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Pariatur, sit? Rem accusamus ab vitae fugiat
            quis debitis quae molestias corrupti dolore? Commodi ab eum obcaecati quibusdam
            repellendus architecto in exercitationem. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Itaque provident recusandae sit optio ut, praesentium cum
            deserunt quaerat, commodi nihil eos consequuntur corrupti sapiente laborum
            accusamus impedit voluptatem consequatur molestias. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Voluptatum aspernatur excepturi laboriosam dolorem
            natus maxime inventore, officiis rem deserunt non placeat nostrum et nesciunt at
            cumque. Mollitia labore repellendus tempore? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Pariatur, sit? Rem accusamus ab vitae fugiat quis
            debitis quae molestias corrupti dolore? Commodi ab eum obcaecati quibusdam
            repellendus architecto in exercitationem. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Itaque provident recusandae sit optio ut, praesentium cum
            deserunt quaerat, commodi nihil eos consequuntur corrupti sapiente laborum
            accusamus impedit voluptatem consequatur molestias. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Voluptatum aspernatur excepturi laboriosam dolorem
            natus maxime inventore, officiis rem deserunt non placeat nostrum et nesciunt at
            cumque. Mollitia labore repellendus tempore?
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

  //console.log(slugsUids);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getPrismicClient();
  const { slug } = params;
  console.log(slug);
  const response = await client.getByUID("post", "vdsadiusahdiuasdas", {});

  console.log(response);

  // var post = {
  //   first_publication_date: response.first_publication_date,
  //   data: {
  //     subtitle: response.data.subtitle,
  //     title: response.data.title,
  //     banner: {
  //       url: response.data.banner.url,
  //     },
  //     author: response.data.author,
  //     content: response.data.content.map((content) => {
  //       return {
  //         heading: content.heading,
  //         body: content.body,
  //       };
  //     }),
  //   },
  //   uid: response.uid,
  // };

  // return {
  //   props: { post },
  // };

  return {
    props: {},
  };
};
