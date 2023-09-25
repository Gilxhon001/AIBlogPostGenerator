import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Roboto } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PostsProvider } from "../context/postContext";

config.autoAddCss = false;

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <PostsProvider>
        <main className={`${roboto.variable} font-body`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </PostsProvider>
    </UserProvider>
  );
}

export default MyApp;
