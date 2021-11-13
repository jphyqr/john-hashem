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
import ExpandableRow from "../components/ExpandableRow";
import ExportedGrid from "../components/RateManager/ExportedGrid";

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
          "next steps": [
            "Make grids exportable",
            "Allow users to mint framworks to blockchain",
          ],
        },
        {
          title: "Tech",

          wins: [
            "Reusable comopnent from previous side project",
            "Drag and Drop on mobile",
          ],
          challenges: ["Protecting user data.", "Desktop view"],
        },
      ],

      status: "active",
      mobileOnly: true,
    },
    {
      displayName: "SPRES",
      url: "http://spres.ca/chuckwagon",
      solution: "Makes restaurants faster",
      best_tech:
        "Live eComm site on top of airtable provides a no-code dashboard for employees to manage",

      tech_next_step: "Create Team Meal ordering feature",
      product_next_step: "Integrate with local delivery app",
      tech_challenge:
        "All web based gives a slower experience for entering food items than standard POS",
      product_challenge: "No integrations with Uber Eats as a start up POS app",
      key_benefits: [
        "Allow restaurants to get orders from a website to their kitchen",
        "Allows kitchen to know of slow items (chicken) on online orders before they are even placed",
      ],
      roles: [
        {
          title: "Product",
          wins: [
            "Customers prefered ordering through website instead of large apps",
          ],
          challenges: ["Limited to SQUARE Pos"],
          "next steps": ["Onboard second restaurant"],
        },
        {
          title: "Tech",

          wins: [
            "Real time responsive POS system powered from Firestore only",
            "Airtable for back end allows staff to manage menu",
          ],
          challenges: [
            "Reliant on device WiFi, not as fast as ethernet POS systems",
          ],
        },
      ],
      status: "active",
    },
    {
      displayName: "Private Host",

      solution: "Play Live Poker, Online",

      key_benefits: [
        "Allowed host to run games with COVID restrictions",
        "Made game organization seamless by allowing players to see whale movement",
        "Enabled users who were physically not possible to play, to play",
      ],
      roles: [
        {
          title: "Product",
          wins: ["All online players prefered remote"],
          challenges: [
            "Reliant on trust that feed is protected",
            "Slower game annoyed live players",
          ],
          "next steps": ["100% remote set up"],
        },
        {
          title: "Tech",

          wins: [
            "Enough features to allow remote player to fully participate in game",
            "Real life feel with users able to control cameras remotely",
          ],
          challenges: ["Video feeds were too slow", "Feed is not encrypted"],
        },
      ],
      retro:
        "https://www.notion.so/Private-Host-Retrospective-877aa2fc5bc34e4fa0cec94ac8d72bbe",
    },
    {
      displayName: "NEMFT",

      solution: "Memorize your private key",

      key_benefits: ["Makes it possible to memorize a private key"],
      roles: [
        {
          title: "Product",

          challenges: [
            "Still must rely on a the app to work.",
            "Currently only works for sports fans",
          ],
          "next steps": ["Convert from sport player model to broader"],
        },
        {
          title: "Tech",

          challenges: [
            "Require animations/3D to get enough data to make memorable",
          ],
        },
      ],
    },
  ];

  const achievements = [
    {
      year: 2019,
      displayName: "90/8600",
      entity: "World Series of Poker Main Event",
    },
    {
      year: 2009,
      displayName: "31st Pick",
      entity: "CFL Draft",
    },
    {
      year: 2010,
      displayName: "Top Student/Athlete Nominee",
      entity: "U of R",
    },
    {
      year: 2010,
      displayName: "Top OL",
      entity: "U Of R Rams",
    },
    {
      year: 2009,
      displayName: "Top OL",
      entity: "U Of R Rams",
    },
    {
      year: 2005,
      displayName: "Top CS Student Scholarship",
      entity: "WKC High School",
    },
  ];

  const teams = [
    {
      displayName: "Chuckwagon",
      years: "2021",
      title: "Owner / Operator",
    },
    { displayName: "sMedia", years: "2018-2020", title: "Product Manager" },

    { displayName: "U of R Rams", years: "2019", title: "Assistant Coach" },
    {
      displayName: "SF Construction",
      years: "2015-2018",
      title: "Owner/Operator",
    },

    {
      displayName: "Leboldus High School",
      years: "2012-2019",
      title: "Assistant Coach",
    },
    {
      displayName: "MTL Alouettes",
      years: "2012-2013",
      title: "Offensive Lineman",
    },
    {
      displayName: "iQmetrix",
      years: "2012-2014",
      title: "Software Developer",
    },
    {
      displayName: "U of R Rams",
      years: "2010-2015",
      title: "Football Player",
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
    {
      title: "Soft Skills",
      skills: [
        { communication: 90 },
        { collaboration: 40 },
        { "time management": 60 },
        { eq: 95 },
        { accountability: 80 },
        { "people skills": 100 },

        { problemsolving: 90 },
        { resilience: 60 },
      ],
    },
    {
      title: "Programming Skills",
      skills: [
        { speed: 90 },
        { documenting: 30 },
        { custodian: 50 },

        { courage: 70 },
      ],
    },
    {
      title: "Product Skills",
      skills: [
        { validating: 70 },
        { documenting: 70 },
        { visualization: 90 },
        { "user empathy": 50 },
        { "idea creation": 100 },
        { resilience: 20 },
      ],
    },
  ];
  const tools = [
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
            <h1>John Hashem</h1>
          </hgroup>
        </article>
      </header>

      <main>
        <section>
          <section className='row slider'>
            {tools.map((skill, i) => {
              return (
                <div className='slider-child'>
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
                          style={{ borderRadius: 50 }}
                        />
                      );
                    }}
                  ></BorderRater>
                </div>
              );
            })}
          </section>
        </section>

        <section>
          <section className='row slider'>
            {skills.map((skill, i) => {
              return (
                <div className='slider-child clickable'>
                  <Endboss
                    onExpandClick={(props) => {
                      dispatch({
                        type: OPEN_FOOTER_DRAWER,
                        component: () => (
                          <Endboss fill showLabels={true} {...props} />
                        ),
                      });
                    }}
                    title={skill.title}
                    key={"endboss"}
                    alignment={"evil"}
                    height={150}
                    width={150}
                    max={100}
                    solidFill
                    fillColor={colors.bright}
                    // attack={attack[randomIntFromInterval(0, 3)]}
                    scale={[10, 20, 30, 40, 50, 75, 90, 100]}
                    attributes={skill.skills}
                    size={100}
                    armour={0}
                    ringColor={colors.light}
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
                    environment={colors.medium}
                  />{" "}
                </div>
              );
            })}
          </section>
        </section>

        <ExpandableRow
          color={colors.light}
          parentComponent={() => <h1>2021 Projects</h1>}
        >
          <div className='row slider'>
            {projects?.map((project, i) => {
              return (
                <article
                  key={i}
                  className=' clickable slider-child card'
                  onClick={() =>
                    dispatch({
                      type: OPEN_MODAL,
                      component: () => <JobRecord record={project} />,
                    })
                  }
                >
                  <h2>{project.displayName}</h2>
                  <h3>{project.solution}</h3>
                </article>
              );
            })}
          </div>
        </ExpandableRow>
        <ExpandableRow
          color={colors.light}
          parentComponent={() => <h1>Teams</h1>}
        >
          <div className='row slider'>
            {teams?.map((team, i) => {
              return (
                <article
                  key={i}
                  className=' clickable slider-child card'
                  onClick={() =>
                    dispatch({
                      type: OPEN_MODAL,
                      component: () => <JobRecord record={team} />,
                    })
                  }
                >
                  <h2>{team.displayName}</h2>
                  <h3>{team.years}</h3>
                  <h2>{team.title}</h2>
                </article>
              );
            })}
          </div>
        </ExpandableRow>
        <ExpandableRow
          color={colors.light}
          parentComponent={() => <h1>Achievements</h1>}
        >
          <div className='row slider'>
            {achievements?.map((achievement, i) => {
              return (
                <article
                  key={i}
                  className='slider-child card'
                  onClick={() =>
                    dispatch({
                      type: OPEN_MODAL,
                      component: () => <JobRecord record={project} />,
                    })
                  }
                >
                  <h2>{achievement.year}</h2>
                  <h3>{achievement.entity}</h3>
                  <h4>{achievement.displayName}</h4>
                </article>
              );
            })}
          </div>
        </ExpandableRow>

        <h1
          onClick={() =>
            dispatch({
              type: OPEN_FOOTER_DRAWER,
              disableTouch: true,
              component: () => (
                <ExportedGrid
                  userUid={"cKAAQdys64KrLxzwXDNV"}
                  vibeId={"ckvxey65600003t6rta4s2rid"}
                />
              ),
            })
          }
        >
          Objectives
        </h1>
      </main>

      <footer></footer>
      <style jsx>{`
        .row-header {
          width: 50px;
        }

        .clickable {
          box-shadow: 2px 2px 1px 1px grey;
          position: relative;
        }

        .clickable:before {
          content: "↗";
          background-color: ${colors.light};

          opacity: 0.5;
          position: absolute;
          right: 0px;
          top: 0px;
          z-index: 1;
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
          display: table;
        }
        section {
          background-color: ${colors.light};
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
          max-height: 100vh;
          overflow: hidden;
          width: 100vw;
          display: flex;
          flex-direction: column;

          color: ${colors.dark};

          position: absolute;
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

          height: -webkit-fill-available;
          max-height: 100vh;

          overflow-y: scroll;
          overflow-x: hidden;
        }

        .grow {
          flex-grow: 1;
        }

        .row {
          display: flex;
          width: 100vw;
        }

        .slider {
          width: 100vw;
          overflow-x: scroll;
          display: flex;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .slider-child {
          margin-right: 10px;
          height: 100%;
        }
        .slider-child:first-child {
          margin-left: 5px;
        }

        .wrap {
          flex-wrap: wrap;
        }

        .card > button {
          font-size: 12px;
          padding: 3px 6px 3px 6px;
          background-color: ${colors.light};
        }
        .slider > .card {
          background-color: ${colors.bright};
        }
        h2 ~ h3 {
          margin-top: 10px;
        }

        section ~ section {
          margin-top: 0px;
        }
        .card > h2 {
          font-size: 12px;
        }
        .card > h3 {
          font-size: 10px;
          font-weight: lighter;
        }

        .card {
          display: table;
          flex-direction: column;

          height: auto;
          margin-right: 10px;
          padding: 5px;
          background-color: ${colors.light};
        }

        @media (min-width: 500px) {
          main {
            width: 500px;
          }
          .slider {
            width: 500px;
          }
        }
        @media screen and (orientation: landscape) {
          main {
            width: 100vw;
          }
          .slider {
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
