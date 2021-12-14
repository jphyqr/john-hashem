import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BlockNightBackground from "../layout/BlockNightBackground";
import Block from "../layout/Blocks/Block";
import BlockManager from "../layout/Blocks/BlockManager";
const Portfolio = () => {
  const colors = {
    purple: "#ab66ff",
  };

  const blocks = [
    {
      h1: "VISION",
      h2: "Dream Bigger",
      svgX: [20, 10, 0, -10, -20, 10, 0, -10, -2.5, 2.5, -2.5, 2.5],
      svgY: [0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, -2.5, 2.5, 2.5, -2.5],
    },
    {
      h1: "VALIDATE",
      h2: "Define your category",
      svgX: [15, 10, 5, 0, -5, -10, -15],
      svgY: [0, -7.5, -15, -7.5, 0, 7.5, 15],
    },
    {
      h1: "VELOCITY",
      h2: "Create value",
      svgX: [15, 5, -5, -15, -5, 5, -15, -15],
      svgY: [-15, -5, 5, 15, 15, 15, 5, -5],
    },
  ];

  const [dimEnded, setDimEnded] = useState(false);
  useEffect(() => {
    const el = document.querySelector(".container");

    el.addEventListener("animationend", function () {
      setDimEnded(true);
    });
  }, []);

  useEffect;
  return (
    <div className='container'>
      <Head>
        <link
          rel='preload'
          href='/fonts/Inter-Regular.ttf'
          as='font'
          crossOrigin=''
        />
        <link
          rel='preload'
          href='/fonts/Inter-Bold.ttf'
          as='font'
          crossOrigin=''
        />
      </Head>
      {/* <h1>Portfolio</h1>
      <h2>Advanced website building</h2>
      <p>I am a web developer in Los Angeles</p> */}

      {dimEnded && <BlockManager blocks={blocks} />}

      <footer></footer>
      <style jsx>{`
        hr {
          margin-top: 100px;
          margin-bottom: 100px;
        }
        h1 {
          font-size: 100px;
        }
        .container {
          min-height: 100vh;
          width: 100vw;
          animation: dim-background 1s ease forwards;
          color: white;
          font-family: Inter;
          position: relative;
        }

        @keyframes dim-background {
          0% {
            background-color: white;
          }
          100% {
            background-color: black;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
