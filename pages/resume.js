import React, { useEffect, useState } from "react";
import SEO from "../layout/seo";
import Image from "next/image";
import Endboss from "../components/Endboss";
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
      role: roles.SOFTWARE_ENGINEER,
      company: "iQMetrix",
      years: "2011-2013",
      role: "Developer",
    },
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
            <h2>Canada - Willing to Relocate</h2>
            <h3>{state.secondsOld} seconds old</h3>
          </hgroup>

          <div className='group'>
            <button>Product</button>
            <button>Software Engineer</button>
            <button>Other</button>
          </div>
        </article>
      </header>
      <body>
        <main>
          <section>
            <h1>Work History</h1>
            {work_history.map((history, i) => {
              return (
                <article key={i}>
                  <h3>{history.company}</h3>
                  <h4>{history.years}</h4>
                </article>
              );
            })}
          </section>

          <section>
            <h1>Skills</h1>
          </section>
          <section>
            <Endboss
              key={"endboss"}
              alignment={"evil"}
              height={200}
              width={200}
              max={100}
              // attack={attack[randomIntFromInterval(0, 3)]}
              scale={[10, 20, 30, 40, 50, 75, 90, 100]}
              attributes={[
                { building: 90, chargeFor: true },
                { writing: 40, workingOn: true },
                { storytelling: 70 },
                { "commiunity building": 10, workingOn: true },
                { problemsolving: 80 },
                { graphics: 20, partnering: true },
                { documentation: 30 },

                { leading: 110 },
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
                  color: "red",
                },
                {
                  percent: 25,
                  color: "orange",
                },
              ]}
              environment={"black"}
            />
          </section>
        </main>
      </body>
      <footer>footer</footer>
      <style jsx>{`
        section {
          background-color: ${colors.deep};
          height: 100px;
        }
        article {
          border: 1px solid red;
        }
        section {
          border: 1px solid red;
        }
        button {
          border: none;
          padding: 5px 10px 5px 10px;
        }
        h1,
        h2,
        h3 {
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
          background-color: ${colors.dark};
          display: flex;
          flex-direction: column;

          color: ${colors.light};
          padding: 5px;
        }

        header {
          display: flex;
          width: 100vw;
          justify-content: space-between;
        }

        body {
          border: 1px solid red;
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
