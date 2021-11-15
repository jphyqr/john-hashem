import React, { useEffect, useMemo, useState } from "react";
import SEO from "../layout/seo";
import Image from "next/image";
import Endboss from "../components/Endboss";
import BorderRater from "../components/BorderRater";
import ModalWrapper from "../layout/ModalWrapper";
import FooterDrawer from "../layout/FooterDrawer/FooterDrawer";
import HeaderDrawer from "../layout/HeaderDrawer/HeaderDrawer";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../config/baseReducers/modalReducer";
import { OPEN_HEADER_DRAWER } from "../layout/HeaderDrawer/headerDrawerReducer";
import JobRecord from "../JobRecord/JobRecord";
import {
  CLOSE_FOOTER_DRAWER,
  OPEN_FOOTER_DRAWER,
} from "../layout/FooterDrawer/footerDrawerReducer";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Dimmer from "../layout/Dimmer";
import { useScreenWidth } from "../hooks/outsideClick";
import NotionPageViewer from "../components/NotionPageViewer";
import ExpandableRow from "../components/ExpandableRow";
import ExportedGrid from "../components/RateManager/ExportedGrid";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import FullStackBuilder from "../components/FullStackBuilder";
//test
//test
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
      image: "layerate.jpg",
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
      clickable: true,
      status: "active",
      mobileOnly: true,
    },
    {
      displayName: "SPRES",
      image: "spres.jpeg",
      url: "http://spres.ca/chuckwagon",
      solution: "Makes restaurants faster",
      best_tech:
        "Live eComm site on top of airtable provides a no-code dashboard for employees to manage",
      clickable: true,
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
      clickable: true,
      image: "privatehost.jpg",
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
      clickable: true,
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
        { verbal: 75 },
        { written: 50 },
        { "non-verbal": 90 },

        { collaboration: 50 },
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
        { learning: 80 },
        { DRY: 30 },
        { AHA: 80 },
        { WET: 70 },

        { courage: 70 },
      ],
    },
    {
      title: "Product Skills",
      skills: [
        { lofi: 80 },
        { hifi: 30 },
        { validating: 80 },
        { documenting: 60 },
        { visualization: 90 },
        { "user empathy": 70 },
        { "idea creation": 100 },
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

  const videos = [
    {
      title: "Poker to me",
      thumbnail: "poker.png",
      src: "https://firebasestorage.googleapis.com/v0/b/layerate.appspot.com/o/poker.mp4?alt=media&token=668bc5b2-5419-430a-88fd-d2eceaf7110b",
      type: "video/mp4",
      alt: "Product Manager playing poker World Series of Poker",
    },
    {
      title: "Football to me",
      thumbnail: "football.jpeg",
      type: "video/mp4",
      alt: "Future Product Manager playing college football",
    },
    {
      title: "Crypto to me",
      thumbnail: "john_8bit.jpg",
      type: "video/mp4",
      alt: "Current software engineer thoughts on crypto",
    },
  ];

  const MemoImage = (props) => {
    return useMemo(() => {
      return <img {...props} />;
    }, []);
  };

  useEffect(() => {
    const promptUserForBasicRedirect = () => {
      dispatch({
        type: OPEN_FOOTER_DRAWER,
        component: () => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              padding: 20,
            }}
          >
            <h1 style={{ fontSize: 16, width: "100%", textAlign: "center" }}>
              This is an over built resume intended to show off a wide array of
              responsive web skills.
            </h1>

            <h2 style={{ fontSize: 14, width: "100%", textAlign: "center" }}>
              You can also view the
              <Link href='/johnhashemresume'>
                <a
                  style={{
                    marginLeft: 5,
                    color: colors.bright,
                    textDecoration: "underline",
                  }}
                >
                  traditional resume
                </a>
              </Link>
            </h2>
            <div style={{ flexGrow: 1 }} />
            <button
              onClick={() => dispatch({ type: CLOSE_FOOTER_DRAWER })}
              style={{
                backgroundColor: colors.dark,
                fontSize: 16,
                color: colors.light,
                padding: "5px 10px 5px 10px",
              }}
            >
              Continue{" "}
            </button>
          </div>
        ),
      });
    };

    if (process.env.NODE_ENV === "production") {
      setTimeout((promptUserForBasicRedirect(), 2000));
    }
  }, []);

  return (
    <div className='container safe-bottom'>
      <ModalWrapper />
      <FooterDrawer />
      <HeaderDrawer />
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
        <div className='row'>
          <label>Looking for: </label> <span>Web 3 Startups</span>{" "}
          <span>Next.JS Projects</span> <span>React/Firebase Freelancing</span>{" "}
        </div>
        <button
          onClick={() => {
            dispatch({
              type: OPEN_HEADER_DRAWER,
              component: () => (
                <ContactForm
                  fields={[
                    { name: "e-mail", value: "jphyqr@gmail.com" },

                    {
                      name: "twitter",
                      value: "@generatedhash",
                      url: "https://twitter.com/generatedhash",
                    },

                    {
                      url: "https://www.linkedin.com/in/john-hashem-aa9a05163/",

                      name: "linkedin",
                      value: "John Hashem",
                    },
                    {
                      url: "https://www.calendly.com/jphyqr",

                      name: "Book a meeting",
                      value: "Calendy",
                    },
                  ]}
                  backgroundColor={colors.light}
                />
              ),
            });
          }}
        >
          Contact
        </button>
      </header>

      <main>
        <div className='hero' style={{ backgroundColor: colors.dark }}>
          <FullStackBuilder
            backgroundColor={colors.dark}
            fontColor={colors.light}
          />
        </div>
        <section>
          <div className='row'>
            <h3>Tool Belt</h3>
            <span className='toolkey' />
          </div>
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

        <ExpandableRow
          openedByDefault={true}
          color={colors.light}
          parentComponent={() => <h1>2021 Projects</h1>}
        >
          <div className='row slider'>
            {projects?.map((project, i) => {
              return (
                <article
                  key={i}
                  className={`${
                    project.clickable ? "clickable" : ""
                  } slider-child image-card`}
                  onClick={
                    project.clickable
                      ? () =>
                          dispatch({
                            type: OPEN_MODAL,
                            component: () => <JobRecord record={project} />,
                          })
                      : () => {}
                  }
                >
                  <h2>{project.displayName}</h2>
                  <h4>{project.solution}</h4>

                  {project.image && <img src={project.image} height={200} />}
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
                  className={`${
                    team.clickable ? "clickable" : ""
                  } slider-child card`}
                  onClick={
                    team.clickable
                      ? () =>
                          dispatch({
                            type: OPEN_MODAL,
                            component: () => <JobRecord record={team} />,
                          })
                      : () => {}
                  }
                >
                  <h3>{team.years}</h3>
                  <h2>{team.displayName}</h2>

                  <h4>{team.title}</h4>
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

        <button
          className='primary'
          onClick={() => {
            if (
              window.confirm(
                "The Objective Grid is a live view at Johns Layerate Career OBjective"
              )
            )
              dispatch({
                type: OPEN_FOOTER_DRAWER,
                disableTouch: true,
                component: () => (
                  <ExportedGrid
                    userUid={"cKAAQdys64KrLxzwXDNV"}
                    vibeId={"ckvxey65600003t6rta4s2rid"}
                  />
                ),
              });
          }}
        >
          Objectives (Powered by Layerate)
        </button>

        <section>
          <h3>Strengths and Weaknesses</h3>
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

        <hr />

        <section className='about-me'>
          <h1>About John Hashem</h1>

          <h2>Canadian Software Engineer working abroad</h2>

          <section>
            <div className='row spaced videos'>
              {videos.map((video, i) => {
                return (
                  <div
                    onClick={
                      video.src
                        ? () => {
                            dispatch({
                              type: OPEN_MODAL,
                              component: () => (
                                <video
                                  width={screenWidth}
                                  height={screenHeight}
                                  controls
                                  autoPlay
                                >
                                  <source src={video.src} type={video.type} />
                                </video>
                              ),
                            });
                          }
                        : () => window.alert("Coming Soon")
                    }
                    className={`thumbnail slider-child ${
                      video.src ? "" : "disabled"
                    }`}
                  >
                    <article>
                      <img
                        alt={video.alt}
                        width='100'
                        height='100'
                        src={video.thumbnail}
                      />
                      <h1>{video.title}</h1>
                    </article>
                  </div>
                );
              })}
            </div>
          </section>

          <p>
            I'm a software engineer dedicated to building modern web
            applications for a variety of industries. I have consistently stayed
            up to date with modern technologies such as React, allowing me to
            create digital products that perform. In 2021 I built novel
            solutions in the restaurant, gambling, auto and productivity
            industries.
          </p>

          <h3>QBV1.com, short for "quarterback for your version 1".com</h3>

          <p>
            I labelled myself a digital quarterback as the position requires
            execution, distribution and most important: leadership. My large
            digital toolkit (from Notion→Next.js) allows me to execute value add
            plays at any phase of any project. My product management experience
            allows me to distribute action through the vision, problem and
            market pipelines. And my natural leadership abilities allow me to
            take full accountability for the teams progress
          </p>

          <p>
            The V1 represents that I build more than MVPs. The PM voice in my
            head pushes no-code (common in v0), while the engineering voice
            pushes custom solutions. My harmonious space is when the problem
            requires a solution that is light weight, with the opportunity to
            scale. Hence, V1: your greenfield application, with a curated
            feature set, on a scalable platform.
          </p>

          <p>
            I studied Software Systems Engineering at the University of Regina,
            while captaining the football team as an Offensive Tackle
          </p>

          <p>Since college I have immersed myself in different industries</p>

          <ul>
            <li>Professional Poker</li>
            <li>Real Estate Investing</li>
            <li>Construction Contracting</li>
          </ul>

          <p>
            My hobbies include poker, coaching football, running and weight
            training.
          </p>
        </section>
      </main>

      <footer></footer>
      <style jsx>{`
        .disabled {
          opacity: 0.6;
        }
        .primary {
          background-color: ${colors.bright};
          color: ${colors.light};
          font-weight: normal;
          width: 40%;
          box-shadow: 2px 2px 2px grey;
          font-size: 16px;
          margin-bottom: 30px;
          margin-top: 20px;
        
        }
        .toolkey {
          font-size: 12px;
          margin-left: 10px;
          width: 30px;
          height: 20px;
          display: flex;
          position: relative;
        }

        .toolkey:before {
          position: absolute;
          top: 50%;
          left: 0px;
          content: "";
          width: 30px;
          height: 5px;
          background-color: ${colors.bright};
          transform: translateY(-50%);
        }

        .toolkey:after {
          content: "confidence";
          width: 300px;
          position: absolute;
          left: calc(100% + 5px);
          top: 50%;
          font-size: 14px;
          transform: translateY(-50%);
          height: 20px;
        }
        .thumbnail {
          background-color: ${colors.dark};
          position: relative;
        }
        h1 ~ h2 {
          margin-top: 10px;
        }
        .thumbnail:before {
          position: absolute;
          content: "";
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;

          border-left: 20px solid white;
          color: white;

          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.6;
        }
        .row-header {
          width: 50px;
        }

        .spaced {
          justify-content: space-evenly;
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
          background-color: ${colors.bright};
          color: ${colors.dark};
          padding: 5px;
        }
        section,
        article {
          min-height: 0;
          display: table;
        }

        .thumbnail > article {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .thumbnail > article > h1 {
          color: white;
          font-size: 15px;
          font-weight: normal;
          margin-top: 5px;
        }
        section {
          background-color: ${colors.light};
        }

        section {
          margin-bottom: 10px;
        }

        section > section {
          margin: 0;
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

        .hero {
          width: 100%;
          min-height: 250px;
          margin-bottom: 30px;
        }
        .avatar {
          background-color: ${colors.dark};
          padding: 10px;
          border-radius: 50%;
          overflow: hidden;
        }

        .about-me{
          background-color ${colors.dark};
          color: ${colors.light};
          font-weight: normal;
          font-size: 14px;
          padding: 10px;
          line-height: 28px;
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

        body {
          display: flex;
          flex: 1;
          position: relative;
        }

        main {
          margin: auto;
          max-width: 600px;
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
          width: 100%;
          align-items: center;
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
        h2 ~ h3,
        h3 ~ h2 {
          margin-top: 10px;
        }

        h4 ~ h3 {
          margin-top: 10px;
        }

        section ~ section {
          margin-top: 0px;
        }
        .card > h2 {
          font-size: 14px;
        }
        .card > h3 {
          font-size: 12px;
        }

        .card > h4 {
          font-size: 10px;
        }

        .card, .image-card {
          display: flex;
          flex-direction: column;

          height: 100%;
          justify-content: space-between;
          align-items: center;
          margin-right: 10px;
          padding: 15px;
          background-color: ${colors.light};
        }

        .image-card{
          background-color ${colors.medium};
          min-width: 200px;
          justify-content: center;
          padding: 5px;
        }

        .image-card > img{
          border: 2px solid ${colors.deep};
          margin-top: 10px;

        }
        .image-card > h4 {
          margin-top: 5px;
        }

        hr ~ section {
          margin-top: 50px;
        }
        .videos {
          background-color: ${colors.light};
          padding: 5px;
        }

        .thumbnail > article > img {
          object-fit: cover;
        }

        header {
          display: flex;
          width: 100vw;
          justify-content: space-between;
          background-color: ${colors.deep};

          align-items: center;
          color: ${colors.light};
        }

        header > div > label {
          margin-right: 10px;
        }

        header > div > span {
          margin-right: 5px;
          font-size: 12px;
          border: 1px solid ${colors.light};
          padding: 3px 6px 3px 6px;
          border-radius: 5px;
        }

        header > h1 {
          font-size: 14px;
          font-weight: bold;
          color: ${colors.light};
        }

        header > button {
          background-color: ${colors.bright};
          color: ${colors.light};
        }


        .about-me > h1{
font-size: 30px;

        }

        .about-me > h2 {
          margin-bottom: 10px;
        }

       
        @media (min-width: 600px) {
          main {
            width: 600px;
          }
          .slider {
            width: 600px;
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
