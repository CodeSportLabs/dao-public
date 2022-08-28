import Head from "next/head";
import { toDate } from 'date-fns-tz'
import Image from "next/image";
import { useState } from "react";
import FinanceContainer from "../../components/FinanceContainer";
import ShoppingComponent from "../../components/ShoppingComponent";

export default function DynamicNFTApp({ metadata, profile, repos }) {
  const [tabSelected, setTabSelected] = useState(0);

    const getLocal = ( dateUTC) =>{
        fred = new Date(dateUTC)

        fred.toString()
        return fred
    }
    //getLocal('2021-05-23T07:04:45Z')
  const tabs = [
    {
      title: "Home",
      component: (
        <div className="flex justify-center">
          <img src={metadata.image} className="w-[85%]" alt="avatar" />
        </div>
      ),
    },
    {
      title: "Last 5 Repos",
      component: repos.map((repo, index) => (
        <a
          key={index}
          className="flex flex-col p-2 rounded-lg h-max w-full border border-slate-500 bg-slate-300"
          href={repo.svn_url}
          target="__blank"
          rel="noopener noreferrer"
        >
          <h2 className="font-bold text-xl text-slate-600">{index+1}. {repo.name}</h2>
          <p className="w-full truncate text-slate-600 pb-2">
                                                                                {/* new Date(repo.updated_at).toString() */}
            <span className="font-semibold text-md">Last Updated:</span> <span className="text-sm">{toDate(repo.updated_at).toString()}</span>
          </p>          
          <p className="w-full truncate text-slate-500 ">
            {repo.description || "No description available"}
          </p>
        </a>
      )),
    },
    {
      title: "Shop",
        component: (
            <div className="w-full h-full">
                <ShoppingComponent />
            </div>

            ),
        },
    {
      title: "Money",
      component: (
        <div className="w-full h-full">
          <FinanceContainer />
        </div>
      ),
    },
  ];

  //   <div className="flex w-full h-full gap-2 text-center">
  //   <span className="text-xl w-full text-green-500 font-bold">
  //     1000 USDC
  //   </span>
  // </div>
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Programmable, Utiltiy NFT | Builder&#8217;s DAO by Code Sport Labs</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="description" property="og:description" content="This NFT confers the following to its owner: (1) DAO Voting Rights, (2) E-Commerce Payments, and (3) Financial Payment Pulls"/>
        <meta name="twitter:description" content="This NFT confers the following to its owner: (1) DAO Voting Rights, (2) E-Commerce Payments, and (3) Financial Payment Pulls"/>
        <meta name="twitter:image:src" property="og:image" content="https://builders-dao.vercel.app/images/girl-screen-overlay.jpg"/>
              
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@codesportLabs"/>
        <meta name="twitter:title" property="og:title" content="This NFT confers the following to its owner: (1) DAO Voting Rights, (2) E-Commerce Payments, and (3) Financial Payment Pulls"/>
        <meta name="twitter:creator" content="@codesportLabs"/>
        <meta property="fb:app_id" content="410117972405409"/>
        <link rel="apple-touch-icon" sizes="174x174" href="https://builders-dao.vercel.app/images/builders-dao-tools-logo" />
      </Head>


    
      <div className="w-full h-screen flex justify-center items-center p-4">
        <div className="bg-slate-800 flex flex-col items-center max-w-[634px] max-h-[860px] w-[634px] h-[100%] p-5 gap-2 rounded-xl shadow-xl text-slate-500 active:text-slate-800 overflow-hidden">
          <div className={
          "w-full flex flex-col items-center h-1/5 p-5" +
          
          (tabSelected === 1 || tabSelected === 2 || tabSelected === 3 ? " hidden" : "")
           } >
            <a
              href={profile.html_url}
              target="__blank"
              rel="noopener noreferrer"
              className="h-full m-1 overflow-hidden"
            >
              <img
                src={profile.avatar_url}
                className="h-full w-full rounded-full"
              />
            </a>
            <span className="text-xl font-bold">{profile.login}</span>
          </div>

          <div className="flex justify-between w-full h-max text-center font-bold text-sm">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className="p-5 w-1/3 hover:text-slate-400 uppercase"
                onClick={() => {
                  setTabSelected(index);
                }}
              >
                <span id={index}
                  className={tabSelected === index ? "border-b-2 py-1" : ""}
                >
                  {tab.title}
                </span>
              </button>
            ))}
          </div>



          <div className="p-5 h-full w-full overflow-y-auto">
            {tabs.map((tab, index) => (
              <div
                className={
                  "flex flex-row gap-2 flex-wrap " +
                  (tabSelected === index ? "" : "hidden")
                }
                key={index}
              >
                {tab.component}
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const tokenId = context.query.tokenId.split(".")[0]; // Get the token ID
  const metadata = await getMetadata(tokenId);

  if (!metadata) {
    return {
      notFound: true,
    };
  }

  const githubProfile = await getGithubProfile(metadata.github_username);
  let githubRepos = await getGithubRepos(`https://api.github.com/users/${metadata.github_username}/repos?sort=updated`);

 //console.log( githubRepos)// 
 
 githubRepos = githubRepos.splice(0, 5)// +'repos?sort=updated'

  return {
    props: {
      metadata: metadata,
      profile: githubProfile,
      repos: githubRepos,
    },
  };
}

const getGithubProfile = async (githubUsername) => {
  // https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

  const data = await fetch(
    `https://api.github.com/users/${githubUsername}`
  ).then((res) => res.json());

  return data;
};

const getGithubRepos = async (url) => {
  const data = await fetch(url).then((res) => res.json());

  return data;
};

const getMetadata = async (tokenId) => {
  const data = await fetch(`http://localhost:3000/api/metadata/${tokenId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!data) {
    const data = await fetch(
      `https://builders-dao.vercel.app/api/metadata/${tokenId}`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  }

  return data;
};
