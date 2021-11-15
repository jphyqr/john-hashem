import Head from "next/head";
import Image from "next/image";
import SEO from "../layout/seo";
import styles from "../styles/Home.module.css";

export default function Home({ record, services, service_categories }) {
  const {
    seo_site_url,
    seo_title_template,
    seo_twitter_username,
    seo_description,
    seo_title,
    h1,
    description,
    web_author,
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
        <div className={styles.title}>{h1}</div>

        <p className={styles.description}>{description}</p>

        {service_categories.map((category, i) => {
          return (
            <div key={i}>
              <h2>{category.Name}</h2>
              {services
                .filter((s) => s.service_category?.[0] === category.id)
                .map((service, j) => {
                  return (
                    <article
                      key={j}
                      href='https://nextjs.org/docs'
                      className={styles.card}
                    >
                      <h2>{service.Name}</h2>
                      <p>{service.description}</p>
                    </article>
                  );
                })}
            </div>
          );
        })}

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
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Created By {web_author}
        </a>
      </footer>
    </div>
  );
}
//test
export async function getStaticProps(context) {
  console.log("GET STATIC PROPS CALLED 2");

  const webRes = await fetch(
    `https://www.qbv1.com/api/getWebsiteRecord
    `
  );
  let webResults = await webRes.json();
  const { record } = webResults;

  const serviceRes = await fetch(
    `https://www.qbv1.com/api/getWebsiteServices
    `
  );

  let serviceResults = await serviceRes.json();

  const { services, service_categories } = serviceResults || [];

  let sortedCategories = service_categories.sort((a, b) =>
    a.thread_order > b.thread_order
      ? 1
      : a.thread_order < b.thread_order
      ? -1
      : 0
  );
  let sortedServices = [];
  for (const cat of sortedCategories) {
    console.log("sorted category", cat.Name, cat.thread_order);
    sortedServices = sortedServices.concat(
      services
        .filter((s) => s.service_category?.[0] === cat.id)
        .sort((a, b) =>
          a.path_order > b.path_order ? 1 : a.path_order < b.path_order ? -1 : 0
        )
    );
  }

  for (const service of sortedServices) {
    console.log("sorted service", service.Name);
  }
  return {
    props: {
      record: { id: record.id, ...record.fields },
      services,
      service_categories,
    }, // will be passed to the page component as props
  };
}
