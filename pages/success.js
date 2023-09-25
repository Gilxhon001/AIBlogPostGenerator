import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/Layout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {
  return (
    <div className="h-full flex justify-center items-center w-full gap-4 dark:bg-gray-900">
      <p className="text-gray-900 text-4xl p-3 dark:text-white">
        Thank you for your purchase!
      </p>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
