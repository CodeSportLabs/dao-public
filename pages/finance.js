import Head from "next/head";
import FinanceContainer from "../components/FinanceContainer";
import Footer from "../components/template/Footer";

const Finance = () => {

// console.log('Process:', process.env.NEXT_PUBLIC_APP_ID)
  return (
    <>

          <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Financial Management MVP | Builder&#8217;s DAO by Code Sport Labs</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="description" property="og:description" content="Financial Management MVP Demo proof of concept. This dApp uses 0xSplits Protocol along with OpenZepplin's PaymentSplitter"/>
        <meta name="twitter:description" content="Financial Management MVP Demo proof of concept. This dApp uses 0xSplits Protocol along with OpenZepplin's PaymentSplitter"/>
        <meta name="twitter:image:src" property="og:image" content="https://builders-dao.vercel.app/images/girl-screen-overlay.jpg"/>
              
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@codesportLabs"/>
        <meta name="twitter:title" property="og:title" content="Financial Management MVP Demo proof of concept. This dApp uses 0xSplits Protocol along with OpenZepplin's PaymentSplitter"/>
        <meta name="twitter:creator" content="@codesportLabs"/>
        <meta property="fb:app_id" content="410117972405409"/>
        <link rel="apple-touch-icon" sizes="174x174" href="https://builders-dao.vercel.app/images/builders-dao-tools-logo" />
      </Head>
        <div className="flex flex-col justify-center items-center h-screen p-24">
        <div className="relative flex flex-col break-words mb-6 shadow-lg rounded-lg bg-slate-200 p-5  min-w-[356px]">
            <FinanceContainer />
        </div>
        </div>
        <Footer />
    </>
  );
};

export default Finance;
