import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { AppLayout } from "../../components/Layout";
import clientPromise from "../../lib/mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { getAppProps } from "../../utils/getAppProps";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import PostContext from "../../context/postContext";

export default function Post(props) {
  console.log("PROPS: ", props);
  const router = useRouter();
  const [showDeleteConfirm, setShowConfirmDelete] = useState(false);
  const { deletePost } = useContext(PostContext);

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/deletePost`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      });

      const json = await response.json();
      if (json.success) {
        deletePost(props.id);
        router.replace(`/post/new`);
      }
    } catch (e) {}
  };

  return (
    <div className="overflow-y-scroll h-screen dark:bg-gray-900 dark:text-white">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-md dark:bg-gray-700">
          SEO title and meta description
        </div>

        <div className="p-4 my-2 border border-stone-200 rounded-md dark:border-gray-700">
          <div className="text-blue-600 text-2xl font-bold dark:text-blue-400 ">
            {props.title}
          </div>
          <div className="mt-2">{props.metaDescription}</div>
        </div>

        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-md dark:bg-gray-700">
          Keywords
        </div>

        <div className="flex flex-wrap pt-2 gap-1">
          {props.keywords?.split(",").map((keyword, i) => (
            <div
              key={i}
              className="p-2 rounded-full bg-slate-800 text-white dark:bg-slate-300 dark:text-slate-700"
            >
              <FontAwesomeIcon icon={faHashtag} /> {keyword}
            </div>
          ))}
        </div>

        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-md dark:bg-gray-700">
          Blog Post
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: props.postContent || "" }}
        ></div>
        <div className="my-4">
          {!showDeleteConfirm ? (
            <button
              className="btn bg-red-600 hover:bg-red-800"
              onClick={() => setShowConfirmDelete(true)}
            >
              Delete Post
            </button>
          ) : (
            <div>
              <p className="p-2 bg-red-300 text-center dark:bg-red-800">
                Are you sure u want to delete this post? This action is
                irreversible
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn bg-stone-400 hover:bg-stone-600 dark:bg-stone-600 dark:hover:bg-stone-500"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-red-600 hover:bg-red-700 dark:hover:bg-red-500"
                  onClick={handleDeleteConfirm}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("BlogStandard");

    const userCollection = db.collection("users");
    const user = await userCollection.findOne({
      auth0Id: userSession.user.sub,
    });

    const postCollection = db.collection("posts");
    const post = await postCollection.findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.created.toString(),
        ...props,
      },
    };
  },
});
