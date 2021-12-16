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

  const value_blocks = [
    {
      vision: true,
      h1: "VISION",

      svgX: [20, 10, 0, -10, -20, 10, 0, -10, -2.5, 2.5, -2.5, 2.5],
      svgY: [0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, -2.5, 2.5, 2.5, -2.5],
    },
    {
      h1: "VALIDATE",
      validate: true,
      svgX: [15, 10, 5, 0, -5, -10, -15],
      svgY: [0, -7.5, -15, -7.5, 0, 7.5, 15],
    },
    {
      h1: "VELOCITY",
      velocity: true,
      svgX: [15, 5, -5, -15, -5, 5, -15, -15],
      svgY: [-15, -5, 5, 15, 15, 15, 5, -5],
    },
  ];
  const service_blocks = [
    {
      h1: "SEO",
      ul: [
        "server rendered pages",
        "engagement driving custom user tools",
        "niche copy",
      ],
      svgX: [20, 10, 0, -10, -20, 10, 0, -10, -2.5, 2.5, -2.5, 2.5],
      svgY: [0, 7.5, 10, 7.5, 0, -7.5, -10, -7.5, -2.5, 2.5, 2.5, -2.5],
    },
    {
      h1: "DIGITAL",
      ul: ["ad creation"],
      svgX: [15, 10, 5, 0, -5, -10, -15],
      svgY: [0, -7.5, -15, -7.5, 0, 7.5, 15],
    },
    {
      h1: "UI/UX",
      ul: ["Graphics, Logos, Spinners"],
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
      <h1>Values</h1>
      <BlockManager blocks={value_blocks} animateCount={6} />

      <div className='spacer-vh' />
      <h1>Services</h1>
      <BlockManager blocks={service_blocks} animateCount={0} />
      <footer></footer>
      <style jsx>{`
        .spacer-vh {
          height: 100vh;
        }
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
