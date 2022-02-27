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

export default function Post() {
  return <h1>tetetete</h1>;
}
