import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../lib/mongodb";

export const getAppProps = async (ctx) => {
  const userSession = await getSession(ctx.req, ctx.res);

  const client = await clientPromise;

  const db = await client.db("BlogStandard");
  const user = await client.db("users").findOne({
    auth0Id: userSession.user.sub,
  });

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
    };
  }

  const posts = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    .toArray();
};
