import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/Layout";

export default function NewPost(props) {
  console.log("New post props:", props);
  return (
    <div>
      <h1>This is the new Post page</h1>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
