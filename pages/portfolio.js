import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import _ from "lodash";
import BlockNightBackground from "../layout/BlockNightBackground";
import Block from "../layout/Blocks/Block";
import BlockManager from "../layout/Blocks/BlockManager";
import BasicCube from "../layout/Blocks/BasicCube";
const Portfolio = () => {
  const colors = {
    purple: "#ab66ff",
  };

  const blocks = [
    {
      h1: "VISION",
      ul: ["trend analysis", "user modeling", "web branding"],

      svgX: [20, 10, 0, -10, -20, 10, 0, -10, -2.5, 2.5, -2.5, 2.5],
      svgY: [0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, -2.5, 2.5, 2.5, -2.5],
    },
    {
      h1: "VALIDATE",
      ul: [
        "validated learning",
        "A/B testing",
        "24 Hour MVPS",
        "Live Web Studies",
        "more stuff",
        "validated learning",
        "A/B testing",
        "24 Hour MVPS",
        "Live Web Studies",
        "more stuff",
      ],
      svgX: [15, 10, 5, 0, -5, -10, -15],
      svgY: [0, -7.5, -15, -7.5, 0, 7.5, 15],
    },
    {
      h1: "VELOCITY",

      svgX: [15, 5, -5, -15, -5, 5, -15, -15],
      svgY: [-15, -5, 5, 15, 15, 15, 5, -5],
    },

    {
      h1: "SEO",
      ul: [
        "validated learning",
        "A/B testing",
        "24 Hour MVPS",
        "Live Web Studies",
        "more stuff",
        "validated learning",
        "A/B testing",
        "24 Hour MVPS",
        "Live Web Studies",
        "more stuff",
      ],
      svgX: [20, 10, 0, -10, -20, 10, 0, -10, -2.5, 2.5, -2.5, 2.5],
      svgY: [0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, -2.5, 2.5, 2.5, -2.5],
    },
    {
      h1: "DIGITAL",

      svgX: [15, 10, 5, 0, -5, -10, -15],
      svgY: [0, -7.5, -15, -7.5, 0, 7.5, 15],
    },
    {
      h1: "UI/UX",

      svgX: [15, 5, -5, -15, -5, 5, -15, -15],
      svgY: [-15, -5, 5, 15, 15, 15, 5, -5],
    },
  ];

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

      {/* {_.times(200, (i) => {
        return (
          <BasicCube
            absolute
            key={i}
            x={Math.random() * 100}
            y={Math.random() * 100}
            side={10}
          />
        );
      })} */}
      {/* <h1>Portfolio</h1>
      <h2>Advanced website building</h2>
      <p>I am a web developer in Los Angeles</p> */}
      <h1>CUSTOM SITES</h1>
      <h2>built with the future in mind</h2>
      <BlockManager blocks={blocks} animateCount={6} />

      <footer></footer>
      <style jsx>{`
        hr {
          margin-top: 100px;
          margin-bottom: 100px;
        }
        h1 {
          font-size: 50px;
          margin-top: 0px;
          margin-bottom: 0px;
        }
        .container {
          min-height: 100vh;
          width: 100vw;
          background-color: black;
          color: white;
          font-family: Inter;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
