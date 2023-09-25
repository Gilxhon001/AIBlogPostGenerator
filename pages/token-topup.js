import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/Layout/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
    });

    const json = await result.json();

    console.log("RESULT: ", json);

    window.location.href = json.session.url;
  };

  return (
    <>
      <div class="min-h-screen bg-gray-200 flex flex-wrap items-center justify-center dark:bg-slate-900">
        <div class="flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-row justify-center items center container">
          <div class="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 dark:bg-slate-800">
            <div className="flex gap-4 justify-center items-center">
              <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
              <h1 class="text-gray-500 font-semibold text-xl dark:text-gray-200">
                {" "}
                100 Tokens{" "}
              </h1>
            </div>
            <div class="text-center py-4 px-7">
              <h1 class="text-gray-700 text-4xl font-black dark:text-gray-50">
                Coming Soon
              </h1>
              <p class="text-gray-500  mt-2 dark:text-gray-200">Price</p>
            </div>
            <div class="h-px bg-gray-200"></div>
            <div class="text-center mt-3">
              <div class="text-sm text-gray-400 grid-cols-3 gap-2 dark:text-gray-100">
                <p>100 tokens = 100 blog posts </p>
              </div>
            </div>
            <button class="w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800 dark:hover:bg-gray-600">
              Buy Now
            </button>
          </div>
          <div class="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-purple-500 transform scale-1 sm:scale-1 md:scale-105 lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl">
            <div className="flex gap-4 justify-center items-center">
              <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
              <h1 className="text-white font-semibold text-xl"> 10 Tokens </h1>
            </div>{" "}
            <div class="text-center py-4 px-7">
              <h1 className="text-white text-4xl font-black">$9.00</h1>
              <p class="text-white text-opacity-50 mt-2">Price</p>
            </div>
            <div class="h-px bg-purple-400"></div>
            <div class="text-center mt-3">
              <div class="text-sm text-white text-opacity-80 grid-cols-3 gap-2">
                <p>10 tokens = 10 blog posts </p>
                <p>Easy to use, customize, and SEO-optimized </p>
                <p>Cost-effective content creation </p>
              </div>
            </div>
            <button
              class="w-full mt-6 mb-3 py-2 text-white font-semibold bg-purple-400 hover:shadow-xl duration-200 hover:bg-purple-800"
              onClick={handleClick}
            >
              Buy Now
            </button>
          </div>
          <div class="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 dark:bg-slate-800">
            <div className="flex gap-4 justify-center items-center">
              <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
              <h1 className="text-gray-500 font-semibold text-xl dark:text-gray-200">
                {" "}
                1000 Tokens{" "}
              </h1>
            </div>
            <div class="text-center py-4 px-7">
              <h1 class="text-gray-700 text-4xl font-black dark:text-gray-50">
                Coming Soon
              </h1>
              <p class="text-gray-500  mt-2 dark:text-gray-200">Price</p>
            </div>
            <div class="h-px bg-gray-200"></div>
            <div class="text-center mt-3">
              <div class="text-sm text-gray-400 grid-cols-3 gap-2 dark:text-gray-100">
                <p>1000 tokens = 1000 blog posts </p>
              </div>
            </div>
            <button class="w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-700 hover:shadow-xl duration-200 hover:bg-gray-800 dark:hover:bg-gray-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
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
