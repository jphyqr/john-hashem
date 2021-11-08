import React, { useEffect, useState } from "react";
import SEO from "../layout/seo";
import Image from "next/image";
import Endboss from "../components/Endboss";
import BorderRater from "../components/BorderRater";
const Resume = () => {
  const colors = {
    dark: "#121212",
    deep: "#4B5056",
    medium: "#787C85",
    light: "#E6E6E6",
    bright: "#01ACB4",
  };

  const calculateSecondsOld = () =>
    ((Date.now() - new Date(1987, 4, 15)) / 1000).toFixed(0);

  const [state, setState] = useState({
    secondsOld: calculateSecondsOld(),
  });

  // useEffect(() => {
  //   setTimeout(
  //     () =>
  //       setState((state) => ({ ...state, secondsOld: calculateSecondsOld() })),
  //     1000
  //   );
  // }, [state.secondsOld]);

  const roles = {
    SOFTWARE_ENGINEER: "SOFTWARE_ENGINEER",
    PRODUCT_MANAGER: "PRODUCT_MANAGER",
    OTHER: "OTHER",
  };
  const work_history = [
    {
      role: roles.PRODUCT_MANAGER,
      company: "sMedia",
      years: "2018-2021",
      role: "Product Manager",
    },
    {
      role: roles.SOFTWARE_ENGINEER,
      company: "iQMetrix",
      years: "2011-2013",
      role: "Developer",
    },
  ];

  const skill_types = {
    PRODUCTIVITY: "Productivity",
    WEB_DEVELOPMENT: "Web Development",
  };
  const skills = [
    { skill_type: skill_types.PRODUCTIVITY, id: "airtable", skill: 0.9 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "next", skill: 0.7 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "react", skill: 0.8 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "redux", skill: 0.8 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "node", skill: 0.5 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "javascript", skill: 0.7 },
    { skill_type: skill_types.PRODUCTIVITY, id: "notion", skill: 0.3 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "docker", skill: 0.1 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "rust", skill: 0.1 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "solidity", skill: 0.2 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "firestore", skill: 0.9 },
  ];

  return (
    <div className='container'>
      <SEO
        title={"John Hashem Resume"}
        description={"Software Engineer"}
        image={"john_hashem_tall.png"}
        article={false}
        siteUrl={"qbv1.com/johnhashem"}
        titleTemplate={"John Hashem - Software Engineer"}
        twitterUsername={"generatedhash"}
      />
      <header>
        <div className='avatar'>
          <Image
            style={{
              borderRadius: 50,
            }}
            src={"/john_8bit.jpg"}
            alt='Picture of John Hashem'
            width={100}
            height={100}
          />
        </div>
        <article>
          <hgroup>
            <h1>John Hashem</h1>
            <h2> Front-End Developer and Product Manager </h2>
            <h2> Canadian looking to relocate, or work remote. </h2>

            <h3>{state.secondsOld} seconds old</h3>
          </hgroup>
        </article>
      </header>
      <body>
        <main>
          <article>
            <h1>Work History</h1>

            <section className='row slider'>
              {work_history.map((history, i) => {
                return (
                  <article className='card' key={i}>
                    <hgroup>
                      <h3>{history.company}</h3>
                      <h4>{history.years}</h4>
                      <h3>{history.role}</h3>
                    </hgroup>
                  </article>
                );
              })}
            </section>
          </article>

          <article>
            <h4>Tech Stack</h4>
            <section className='row slider'>
              {skills
                .filter((s) => s.skill_type === skill_types.WEB_DEVELOPMENT)
                .sort((a, b) => b.skill - a.skill)
                .map((skill, i) => {
                  return (
                    <BorderRater
                      key={i}
                      color={colors.bright}
                      max={1}
                      value={skill.skill}
                      width={8}
                    >
                      <Image
                        src={`/${skill.id}.png` || `/${skill.id}.jpg`}
                        height={30}
                        width={30}
                      />
                    </BorderRater>
                  );
                })}
            </section>
          </article>

          <article>
            <h4>Productivity Suite</h4>
            <section className='row slider'>
              {skills
                .filter((s) => s.skill_type === skill_types.PRODUCTIVITY)
                .sort((a, b) => b.skill - a.skill)
                .map((skill, i) => {
                  return (
                    <BorderRater
                      key={i}
                      color={colors.bright}
                      max={1}
                      value={skill.skill}
                      width={8}
                    >
                      <Image
                        src={`/${skill.id}.png` || `/${skill.id}.jpg`}
                        height={30}
                        width={30}
                      />
                    </BorderRater>
                  );
                })}
            </section>
          </article>

          <article>
            <h1>Skill</h1>
            <section className='row slider'>
              <article className='card'>
                <h4>Tech Skill</h4>
                <Endboss
                  key={"endboss"}
                  alignment={"evil"}
                  height={200}
                  width={200}
                  max={100}
                  solidFill
                  fillColor={colors.bright}
                  // attack={attack[randomIntFromInterval(0, 3)]}
                  scale={[10, 20, 30, 40, 50, 75, 90, 100]}
                  attributes={[
                    { speed: 90 },
                    { documenting: 30 },
                    { educating: 60 },

                    { problemsolving: 80 },
                    { resilience: 20 },
                  ]}
                  size={100}
                  armour={1}
                  race={[
                    {
                      percent: 50,
                      color: "silver",
                    },
                    {
                      percent: 25,
                      color: "black",
                    },
                    {
                      percent: 25,
                      color: "orange",
                    },
                  ]}
                  environment={"black"}
                />{" "}
              </article>

              <article className='card'>
                <h4>Product Skill</h4>
                <Endboss
                  key={"endboss"}
                  alignment={"evil"}
                  height={200}
                  width={200}
                  max={100}
                  solidFill
                  fillColor={colors.bright}
                  // attack={attack[randomIntFromInterval(0, 3)]}
                  scale={[10, 20, 30, 40, 50, 75, 90, 100]}
                  attributes={[
                    { copywriting: 40 },
                    { storytelling: 70 },
                    { empathy: 60 },
                    { lofi: 100 },
                    { hifi: 30 },
                    { analytics: 80 },

                    { shipping: 90 },
                  ]}
                  size={100}
                  armour={1}
                  race={[
                    {
                      percent: 50,
                      color: "silver",
                    },
                    {
                      percent: 25,
                      color: "black",
                    },
                    {
                      percent: 25,
                      color: "orange",
                    },
                  ]}
                  environment={"black"}
                />{" "}
              </article>
            </section>
          </article>
        </main>
      </body>
      <footer></footer>
      <style jsx>{`
        section,
        article {
          min-height: 0;
        }
        section {
          background-color: ${colors.deep};
        }
        article {
          border: 1px solid black;
        }
        section {
          border: 1px solid black;
        }
        button {
          border: none;
          padding: 5px 10px 5px 10px;
        }
        h1,
        h2,
        h3,
        h4 {
          margin: 0;
          padding: 0;
        }

        h2 {
          font-size: 14px;
        }
        h3 {
          font-size: 12px;
        }
        .avatar {
          background-color: ${colors.dark};
          padding: 10px;
          border-radius: 50%;
          overflow: hidden;
        }
        .container {
          height: 100vh;

          width: 100vw;
          background-color: ${colors.light};
          display: flex;
          flex-direction: column;

          color: ${colors.dark};
          padding: 5px;
        }

        header {
          display: flex;
          width: 100vw;
          justify-content: space-between;
        }

        body {
          border: 1px solid black;
          display: flex;
          flex: 1;
        }

        main {
          margin: auto;
          border: 1px solid green;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .card {
          display: flex;
          flex-direction: column;

          margin-right: 10px;
          padding: 5px;
          background-color: ${colors.medium};
        }

        .card:last-child {
          margin-right: 0px;
        }

        .row {
          display: flex;
          width: 100vw;
        }

        .slider {
          padding: 5px;
          width: 100%;
          overflow-x: scroll;
        }

        .wrap {
          flex-wrap: wrap;
        }

        @media (min-width: 500px) {
          main {
            width: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
