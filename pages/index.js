import Head from "next/head";
import Image from "next/image";
import SEO from "../layout/seo";
import styles from "../styles/Home.module.css";

export default function Home({ record }) {
  const {
    seo_site_url,
    seo_title_template,
    seo_twitter_username,
    seo_description,
    seo_title,
    h1,
  } = record || null;
  const { seo_image } = record || [];
  return (
    <div className={styles.container}>
      <SEO
        title={seo_title}
        description={seo_description}
        image={seo_image}
        article={false}
        siteUrl={seo_site_url}
        titleTemplate={seo_title_template}
        twitterUsername={seo_twitter_username}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>{h1}</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
//test
export async function getStaticProps(context) {
  console.log("GET STATIC PROPS CALLED 2");

  const webRes = await fetch(
    `https://john-hashem.vercel.app/api/getWebsiteRecord
    `
  );
  let webResults = await webRes.json();
  const { record } = webResults;

  // const serviceRes = await fetch(
  //   `https://john-hashem.vercel.app/api/getWebsiteServices
  //   `
  // );
  // console.log({ serviceRes });
  // let serviceResults = await serviceRes.json();
  // console.log({ serviceResults });

  return {
    props: { record: { id: record.id, ...record.fields } }, // will be passed to the page component as props
  };
}
