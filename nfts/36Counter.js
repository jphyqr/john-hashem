import React from "react";

const Counter36 = () => {
  return (
    <div className='page'>
      <div className='container'>
        {/* <div className='player center chalk-border square-draw' />
        <div className='player  chalk-border-circle circle-draw left-guard' /> */}{" "}
        <div className='vertical-line' />
        <div className='vertical-line' />
        <div className='vertical-line' />
        <div className='vertical-line' />
        <div className='vertical-line' />
        <svg viewBox='0 0 500 500'>
          <path
            className='path run'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M240,450 L200,430 C250 430 400 400 400 300 C 450 200 450 100 450 10 L 430 50 L 455 5 L460 60'
          />
          <path
            className='path follow'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M50,320 C80,300 120 ,300 120, 240 L 100 240 L 140 240 C60,220, 60,420 70,340'
          />
          <path
            className='path pull'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M100,290 C200,400, 420,400 420 ,150 L400,150 L440 160'
          />

          <path
            className='path'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M280,240L230,240L230 290,L280,290L278,239'
          />

          <path
            className='path lg'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M163,236 C301,304 34,310 173,236'
          />
          <path
            className='path lt'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M64,261 C208,208 6,379 92,241'
          />
          <path
            className='path rg'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M314,261 C458,208 256,379 342,241'
          />
          <path
            className='path rt'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M364,261 C508,208 306,379 392,241'
          />

          <path
            className='path te'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M04,301 C138,288 0,449 12,311'
          />

          <path
            className='path tb'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M224,451 C338,428 200,559 232,441'
          />

          <path
            className='path le'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M5,183 C51,260 12,258 36,185'
          />

          <path
            className='path nt'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M175,203 C231,260 182,238 230,185'
          />

          <path
            className='path dt'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M345,203 C401,260 352,238 400,185'
          />

          <path
            className='path wlb'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M55,103 C111,160 62,138 110,85'
          />

          <path
            className='path re'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M435,183 C451,260 422,238 480,165'
          />

          <path
            className='path mlb'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M215,103 C271,160 222,138 270,85'
          />

          <path
            className='path slb'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M365,103 C421,160 372,138 420,85'
          />

          <path
            className='path deuce1'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M360,250 L370,220'
          />
          <path
            className='path deuce2'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M390,250 L360,220'
          />
          <path
            className='path deuce3'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M370,220 L370 180 L330 150 L340 130 L320 180'
          />

          <path
            className='path back-block'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M232,240 L220,220 L240,200 L200 250'
          />

          <path
            className='path upfield'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M440,230 C451,300 451,300 390,400 L400,350 L390,420 L420,350'
          />

          <path
            className='path trap'
            fill='mediumseagreen'
            stroke='white'
            stroke-width='4'
            //             d='M66.039,133.545c0,0-21-57,18-67s49-4,65,8
            // s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
            // C46.039,146.545,53.039,128.545,66.039,133.545z'
            d='M180,290 L180,310 L400,340 L410,310 L400,350'
          />
        </svg>
      </div>
      <style jsx>{`
        .vertical-line {
          height: 100%;
          width: 1px;
          background-color: red;
          position: absolute;
          bottom: 0;
          left: 5px;
          display: none;
        }

        .vertical-line:nth-child(1) {
          left: 250px;
        }
        .vertical-line:nth-child(2) {
          left: 100px;
        }
        .vertical-line:nth-child(3) {
          left: 200px;
        }
        .vertical-line:nth-child(4) {
          left: 300px;
        }
        .vertical-line:nth-child(5) {
          left: 400px;
        }
        .path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 0.3s linear forwards;
        }

        @keyframes dash {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .center {
          animation-delay: 0s;
        }
        .lg {
          animation-delay: 0.3s;
        }

        .lt {
          animation-delay: 0.6s;
        }

        .rg {
          animation-delay: 1s;
        }
        .rt {
          animation-delay: 1.2s;
        }

        .te {
          animation-delay: 1.6s;
        }
        .tb {
          animation-delay: 2s;
        }

        .le {
          animation-delay: 2.3s;
        }

        .nt {
          animation-delay: 2.5s;
        }
        .dt {
          animation-delay: 2.7s;
        }
        .re {
          animation-delay: 2.9s;
        }
        .wlb {
          animation-delay: 3.1s;
        }

        .mlb {
          animation-delay: 3.2s;
        }

        .slb {
          animation-delay: 3.3s;
        }

        .deuce1 {
          animation-delay: 4.6s;
          animation-duration: 0.1s;
        }
        .deuce2 {
          animation-delay: 4.7s;
          animation-duration: 0.1s;
        }
        .deuce3 {
          animation-delay: 4.8s;
          animation-duration: 1.5s;
        }

        .upfield {
          animation-delay: 6s;
          animation-duration: 0.5s;
          animation-timing-function: ease-in;
        }

        .back-block {
          animation-delay: 5.5s;
          animation-duration: 1.5s;
        }

        .trap {
          animation-delay: 7s;
          animation-duration: 0.2s;
          animation-timing-function: ease-in;
        }

        .pull {
          animation-delay: 8s;
          animation-duration: 1s;
          z-index: -1;
        }

        .follow {
          animation-delay: 9s;
          animation-duration: 1s;
        }

        .run {
          animation-delay: 10s;
          animation-duration: 0.5s;
          animation-timing-function: ease-in;
        }
        .chalk-border {
          border: 5px solid rgba(255, 255, 255, 0.8);
          border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png")
            20;
          position: relative;
        }

        .chalk-border-circle {
          border: 5px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png")
            20;
          position: relative;
          background-origin: border-box;
          background-clip: content-box, border-box;
        }
        .square-draw:before {
          content: "";
          position: absolute;
          height: 45px;
          width: 49px;
          background-color: mediumseagreen;
          left: -5px;
          bottom: 0px;
          animation: narrow 0.5s forwards 1s;
        }

        .square-draw:after {
          content: "";
          position: absolute;
          height: 45px;
          width: 49px;
          background-color: mediumseagreen;
          right: -5px;
          top: 0px;
          animation: second-narrow 0.5s forwards 1.5s;
        }
        @keyframes second-narrow {
          50% {
            width: 5px;
            height: 45px;
          }
          100% {
            width: 5px;
            height: 0px;
          }
        }
        @keyframes narrow {
          50% {
            width: 5px;
            height: 45px;
          }
          100% {
            width: 5px;
            height: 0px;
          }
        }
        .player {
          position: absolute;
          height: 50px;
          width: 50px;
        }
        .page {
          height: 100vh;
          width: 100vw;
          background-color: black;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .container {
          width: 500px;
          height: 500px;
          border-radius: 5px;
          background-color: mediumseagreen;
          position: relative;
        }

        .center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .left-guard {
          background-color: green;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-150%, -50%);
        }
      `}</style>
    </div>
  );
};

export default Counter36;
