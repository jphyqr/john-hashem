import _, { each } from "lodash";
import withRouter from "next/dist/client/with-router";
import React from "react";

const Endboss = ({
  alignment,
  attributes,
  race,
  height,
  width,
  size,
  armour,
  environment,
  max,
  scale,
  attack,
}) => {
  const n = attributes.length;
  const xHalf = width / 2;
  const yHalf = height / 2;
  const angle = parseFloat(360 / n);
  let points = [];

  const getXOffset = (n, i, width, value) => {
    const final =
      (((Math.sin((Math.PI / 180) * (angle * i)) * value) / max) * width) / 2;
    console.log(i, width, value, angle * i, final);

    return final;
  };

  const getYOffset = (n, i, height, value) => {
    const final =
      (((Math.cos((Math.PI / 180) * (angle * i)) * value) / max) * height) / 2;

    return final;
  };

  const generatePath = (points) => {
    const first = points.shift();
    console.log({ first });
    let string = `M ${first.x + xHalf} ${first.y + yHalf} L ${
      first.finalX + xHalf
    } ${first.finalY + yHalf}`;

    console.log("path", points);
    for (const point of points) {
      string =
        string +
        ` L ${point.x + xHalf} ${point.y + yHalf} L ${point.finalX + xHalf} ${
          point.finalY + yHalf
        }`;
    }
    // string = string + ` L ${first.x + xHalf} ${first.y + yHalf}`;
    console.log("final string", string);
    return string;
  };
  for (var i = 0; i < n; i++) {
    let nextHalfI = i + 1 / 2;
    let finalI = i + 1;
    const attr = attributes[i];
    const nextAttr = i == n - 1 ? attributes[0] : attributes[i + 1];
    points.push({
      x: getXOffset(n, i, width, attr[Object.keys(attr)[0]]),
      y: getYOffset(n, i, width, attr[Object.keys(attr)[0]]),
      //   midX: getXOffset(n, nextHalfI, width, size),
      //   midY: getYOffset(n, nextHalfI, width, size),
      chargeFor: attr.chargeFor ? true : false,
      workingOn: attr.workingOn ? true : false,
      partnering: attr.partnering ? true : false,
      finalX: getXOffset(n, finalI, width, nextAttr[Object.keys(nextAttr)[0]]),
      finalY: getYOffset(n, finalI, width, nextAttr[Object.keys(nextAttr)[0]]),
      maxX: getXOffset(n, i, width, 100),
      maxY: getYOffset(n, i, width, 100),
      label: Object.keys(attr)[0],
    });
  }
  console.log(points);
  return (
    <div className='container'>
      {points.map((p, i) => {
        return (
          <div
            className={`${p.chargeFor ? "charge" : ""} ${
              p.workingOn ? "working" : ""
            }   ${p.partnering ? "partnering" : ""}`}
            style={{
              position: "absolute",
              color: "white",
              left: `${p.maxX + xHalf}px`,
              top: `${p.maxY + yHalf}px`,
              transform: "translateX(-50%)",
              fontSize: 8,
            }}
          >
            {p.label}
          </div>
        );
      })}

      {scale.map((ring, i) => {
        return (
          <div
            key={i}
            style={{
              height: (ring / max) * height,
              width: (ring / max) * width,
              border: "2px solid cyan",
              opacity: 0.5,
              zIndex: 10,
              borderRadius: "100%",
            }}
            className='size centered'
          />
        );
      })}
      <div
        style={{
          height: (size / max) * height,
          width: (size / max) * width,
          border: `${armour}px solid red`,
          backgroundColor: attack,
          opacity: 0.5,
          zIndex: 10,
          borderRadius: "100%",
        }}
        className='size centered'
      />

      <div className='svg-container'>
        <svg style={{ width: width, height: height }}>
          <defs>
            <linearGradient id='linear' x1='0%' y1='0%' x2='100%' y2='100%'>
              {race.map((gene, i) => {
                return (
                  <stop
                    key={i}
                    offset={`${race
                      .filter((r, j) => j <= i)
                      .reduce((total, obj) => total + obj.percent, 0)}%`}
                    stopColor={gene.color}
                  />
                );
              })}
            </linearGradient>
          </defs>

          <path
            d={generatePath(points)}
            fill='url(#linear)'
            stroke='black'
            strokeWidth={armour}
            zIndex={30}
            style={{ padding: 0, margin: 0 }}
          />
        </svg>
      </div>
      <style jsx>{`
        svg {
          background-color: ${environment};
        }
        .container {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .centered {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .gene:before {
          content: "Test";
        }

        .charge:before {
          content: "charge for";
          color: red;
          position: absolute;
          bottom: -20px;
        }

        .partnering:before {
          content: "scouting";
          color: grey;
          position: absolute;
          bottom: -20px;
        }

        .working:before {
          content: "working on";
          color: gold;
          position: absolute;
          bottom: -20px;
        }
      `}</style>
    </div>
  );
};

export default Endboss;
