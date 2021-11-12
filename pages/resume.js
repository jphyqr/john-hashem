import React, { useEffect, useMemo, useState } from "react";
import SEO from "../layout/seo";
import Image from "next/image";
import Endboss from "../components/Endboss";
import BorderRater from "../components/BorderRater";
import ModalWrapper from "../layout/ModalWrapper";
import FooterDrawer from "../layout/FooterDrawer/FooterDrawer";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../config/baseReducers/modalReducer";
import JobRecord from "../JobRecord/JobRecord";
import { OPEN_FOOTER_DRAWER } from "../layout/FooterDrawer/footerDrawerReducer";

import Dimmer from "../layout/Dimmer";
import { useScreenWidth } from "../hooks/outsideClick";
import NotionPageViewer from "../components/NotionPageViewer";
const Resume = () => {
  const colors = {
    dark: "#121212",
    deep: "#4B5056",
    medium: "#787C85",
    light: "#E6E6E6",
    bright: "#01ACB4",
  };

  const dispatch = useDispatch();
  const calculateSecondsOld = () =>
    ((Date.now() - new Date(1987, 4, 15)) / 1000).toFixed(0);

  const [screenWidth, screenHeight] = useScreenWidth();
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
  const [f, u] = useState(0);

  const projects = [
    {
      displayName: "Layerate",
      url: "http://layerate.vercel.app",
      solution: "Makes complex decisions simple",
      key_benefits: [
        "Easily accesible life guiding tool",
        "Customizable for any problem",
        "Enable ability to contribute to desktop problems (Airtable) from mobile",
        "Break ambiguous problems into solvable parts",
      ],
      roles: [
        {
          title: "Product",
          wins: [
            "Makes it possible for people to monitize their thinking frameworks",
          ],
          challenges: ["Currently building for too many people."],
        },
        {
          title: "Tech",

          wins: ["Reusable comopnent from previous side project"],
          challenges: ["Protecting user data."],
        },
      ],
      best_tech:
        "Mobile web component that responds to multiple app-like gestures",

      tech_challenge: "Incomplete desktop version",

      tech_next_step: "Integrate with Solana to mint frameworks",
      product_next_step: "Onboard deep thinkers to program frameworks",
      status: "active",
      mobileOnly: true,
    },
    {
      displayName: "SPRES",
      url: "http://spres.ca/chuckwagon",
      solution: "Makes restaurants faster",
      best_tech:
        "Live eComm site on top of airtable provides a no-code dashboard for employees to manage",
      product_wins: [
        "Allows kitchen to know of slow items (chicken) on online orders before they are even placed",
      ],
      tech_next_step: "Create Team Meal ordering feature",
      product_next_step: "Integrate with local delivery app",
      tech_challenge:
        "All web based gives a slower experience for entering food items than standard POS",
      product_challenge: "No integrations with Uber Eats as a start up POS app",
      status: "active",
    },
    {
      displayName: "Private Host",

      solution: "Play Live Poker, Online",
      status: "dead",
      retro:
        "https://www.notion.so/Private-Host-Retrospective-877aa2fc5bc34e4fa0cec94ac8d72bbe",
    },
    {
      displayName: "NEMFT",

      solution: "Memorize your private key",
      status: "paused",
    },
  ];

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
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "next", skill: 0.8 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "react", skill: 0.8 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "redux", skill: 0.8 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "node", skill: 0.5 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "javascript", skill: 0.7 },
    { skill_type: skill_types.PRODUCTIVITY, id: "notion", skill: 0.4 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "docker", skill: 0.1 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "rust", skill: 0.1 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "solidity", skill: 0.2 },
    { skill_type: skill_types.WEB_DEVELOPMENT, id: "firestore", skill: 0.9 },
  ];

  const big_wins = [
    {
      age: "10-15",
      job: "Umpire",
      sport: "Baseball/Basketball",
      passion: "Chess",
      achievements: ["Provincial Chess Champion"],
    },
    {
      age: "15-18",
      job: "Boston Pizza Cook",
      sport: "Football",
      passion: "Websites, Video Games",
      achievements: ["WKC Top CS Student", "U of RFootball Scholarship"],
    },
    {
      age: "19-23",
      job: "Engineering Co-op's",
      sport: "Football",
      passion: "Olympic Lifting",
      achievements: [
        "3rd Round Draft Pick - CFL",
        "Nominee for Top Student/Athlete",
        "Rams Top OLx2",
      ],
    },
    {
      age: "24-30",
      job: "Poker + Construction Company",
      sport: "Crossfit, Muay Thai",
      passion: "Entrepeurship, Coaching Football",
      achievements: [
        "5 Time Provincial Champions (OL/OC/ST)",
        "Head Coach Senior Bowl + Win",

        "Full home buy/rebuild/sell",
        "Won multiple poker tournamnets",
      ],
    },
    {
      age: "30-34",
      job: "Product Manager sMedia",
      sport: "Cross Country, Body Building",
      passion: "Cryptocurrency, Front End Development",
      achievements: ["91/8600 World Series of Poker Main Event"],
    },
  ];

  const MemoImage = (props) => {
    return useMemo(() => {
      return <img {...props} />;
    }, []);
  };

  return (
    <div className='container safe-bottom'>
      <ModalWrapper />
      <FooterDrawer />
      <Dimmer />
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
        {/* <div className='avatar'>
          <Image
            style={{
              borderRadius: 50,
            }}
            src={"/john_8bit.jpg"}
            alt='Picture of John Hashem'
            width={100}
            height={100}
          />
        </div> */}
        <article>
          <hgroup>
            <h1>John Hashem</h1> <h3>{state.secondsOld} seconds old</h3>
          </hgroup>
        </article>
      </header>

      <main>
        <article>
          <h4>Tool Belt</h4>
          <section className='row slider'>
            {skills.map((skill, i) => {
              return (
                <BorderRater
                  key={i}
                  color={colors.bright}
                  max={1}
                  value={skill.skill}
                  width={5}
                  child={() => {
                    return (
                      <MemoImage
                        src={`/${skill.id}.png` || `/${skill.id}.jpg`}
                        height={30}
                        width={30}
                      />
                    );
                  }}
                ></BorderRater>
              );
            })}
          </section>
        </article>

        <article>
          <h4>Skill</h4>
          <section className='row slider'>
            <article className='card'>
              <h4>Tech Skill</h4>
              <Endboss
                onExpandClick={() => {
                  dispatch({
                    type: OPEN_FOOTER_DRAWER,
                    component: () => (
                      <Endboss
                        height={300}
                        width={300}
                        showLabels={true}
                        max={100}
                        solidFill
                        environment={"black"}
                        fillColor={colors.bright}
                        scale={[10, 20, 30, 40, 50, 75, 90, 100]}
                        attributes={[
                          { speed: 90 },
                          { documenting: 30 },
                          { educating: 60 },

                          { problemsolving: 80 },
                          { resilience: 20 },
                        ]}
                      />
                    ),
                  });
                }}
                key={"endboss"}
                alignment={"evil"}
                height={150}
                width={150}
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
                height={150}
                width={150}
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

        <hr />

        <section>
          <h4>2021 Projects</h4>
          <div className='row slider'>
            {projects?.map((project, i) => {
              return (
                <article key={i} className='card'>
                  <h2>{project.displayName}</h2>
                  <h3>{project.solution}</h3>

                  <button
                    onClick={() =>
                      dispatch({
                        type: OPEN_MODAL,
                        component: () => <JobRecord record={project} />,
                      })
                    }
                  >
                    More
                  </button>
                  <button
                    disabled={!project.retro}
                    onClick={() => window.open(project.retro)}
                  >
                    Retro
                  </button>
                  <button
                    disabled={!project.url}
                    onClick={
                      project.mobileOnly && screenWidth > 500
                        ? () =>
                            window.alert(
                              "Visit layerate.vercel.app on a mobile device"
                            )
                        : () => window.open(project.url)
                    }
                  >
                    App
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer></footer>
      <style jsx>{`
        .row-header {
          background-color: yellow;
          width: 50px;
        }
        .flex-slider {
          display: flex;
          background-color: green;
          width: calc(100% - 50px);
          overflow-x: scroll;
        }
        .flex-slider span {
          background-color: red;
          width: 200px;
        }
        header {
          margin-bottom: 10px;
        }
        section,
        article {
          min-height: 0;
        }
        section {
          background-color: ${colors.medium};
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
        h4 {
          font-size: 11px;
        }
        .avatar {
          background-color: ${colors.dark};
          padding: 10px;
          border-radius: 50%;
          overflow: hidden;
        }
        .container {
          height: -webkit-fill-available;
          width: 100vw;
          display: flex;
          flex-direction: column;

          color: ${colors.dark};

          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        header {
          display: flex;
          width: 100vw;
          justify-content: space-between;
        }

        body {
          display: flex;
          flex: 1;
          position: relative;
        }

        main {
          margin: auto;

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
          background-color: ${colors.light};
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
