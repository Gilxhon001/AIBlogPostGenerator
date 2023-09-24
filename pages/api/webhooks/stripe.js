import Cors from "micro-cors";
import { Stripe } from "stripe";
import { Buffer } from "buffer";
import clientPromise from "../../../lib/mongodb";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = {
  api: { bodyParser: false },
};

export const verifyStripe = async ({ req, stripe, endpointSecret }) => {
  async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    buf.toString(),
    sig,
    endpointSecret,
  );

  return event;
};

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {
    let event;
    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (e) {
      console.log("Error: ", e);
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        const client = await clientPromise;
        const db = client.db("BlogStandard");

        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;

        const userProfile = await db.collection("users").updateOne(
          {
            auth0Id,
          },
          {
            $inc: {
              availableTokens: 10,
            },
            $setOnInsert: {
              auth0Id,
            },
          },
          {
            upsert: true,
          },
        );
      }
      default:
        console.log("Unhandled Event", event.type);
    }
    res.status(200).json({ received: true });
  }
};

export default cors(handler);
