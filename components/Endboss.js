import _, { each } from "lodash";
import withRouter from "next/dist/client/with-router";
import React, { useEffect, useRef, useState } from "react";
import { useScreenWidth } from "../hooks/outsideClick";

const Endboss = (props) => {
  const {
    alignment,
    attributes,
    race,
    height,
    width,
    fill,
    size,
    armour,
    environment,
    max,
    scale,
    attack,
    solidFill,
    fillColor,
    showLabels,
    onExpandClick,
    centered,
    ringColor,

    title,
  } = props;
  const n = attributes.length;
  const bossRef = useRef(null);

  useEffect(() => {
    if (!bossRef?.current) return;

    console.log(
      "bossRef",
      bossRef.current.parentElement,
      bossRef.current.parentElement.offsetHeight,
      bossRef.current.parentElement.offsetWidth
    );
    setParentsSide(
      Math.min(
        bossRef.current.parentElement.offsetHeight,
        bossRef.current.parentElement.offsetWidth
      )
    );
  }, [bossRef?.current]);

  const [_parentsSide, setParentsSide] = useState(0);
  const [_shortSide, setShortSide] = useState(Math.min(width, height));

  useEffect(() => {}, [_parentsSide]);
  const sideLength = fill ? _parentsSide : Math.min(width, height);

  const xHalf = sideLength / 2;
  const yHalf = sideLength / 2;
  const angle = parseFloat(360 / n);
  let points = [];

  const getXOffset = (n, i, sideLength, value) => {
    const final =
      (((Math.sin((Math.PI / 180) * (angle * i)) * value) / max) * sideLength) /
      2;

    return final;
  };

  const getYOffset = (n, i, sideLength, value) => {
    const final =
      (((Math.cos((Math.PI / 180) * (angle * i)) * value) / max) * sideLength) /
      2;

    return final;
  };

  const generatePath = (points) => {
    const first = points.shift();

    let string = `M ${first.x + xHalf} ${first.y + yHalf} L ${
      first.finalX + xHalf
    } ${first.finalY + yHalf}`;

    for (const point of points) {
      string =
        string +
        ` L ${point.x + xHalf} ${point.y + yHalf} L ${point.finalX + xHalf} ${
          point.finalY + yHalf
        }`;
    }
    // string = string + ` L ${first.x + xHalf} ${first.y + yHalf}`;

    return string;
  };
  for (var i = 0; i < n; i++) {
    let nextHalfI = i + 1 / 2;
    let finalI = i + 1;
    const attr = attributes[i];
    const nextAttr = i == n - 1 ? attributes[0] : attributes[i + 1];
    points.push({
      x: getXOffset(n, i, sideLength, attr[Object.keys(attr)[0]]),
      y: getYOffset(n, i, sideLength, attr[Object.keys(attr)[0]]),
      //   midX: getXOffset(n, nextHalfI, sideLength, size),
      //   midY: getYOffset(n, nextHalfI, sideLength, size),
      chargeFor: attr.chargeFor ? true : false,
      workingOn: attr.workingOn ? true : false,
      partnering: attr.partnering ? true : false,
      finalX: getXOffset(
        n,
        finalI,
        sideLength,
        nextAttr[Object.keys(nextAttr)[0]]
      ),
      finalY: getYOffset(
        n,
        finalI,
        sideLength,
        nextAttr[Object.keys(nextAttr)[0]]
      ),
      maxX: getXOffset(n, i, sideLength, 100),
      maxY: getYOffset(n, i, sideLength, 100),
      label: Object.keys(attr)[0],
    });
  }

  return (
    <div
      ref={bossRef}
      className='endboss-container'
      onClick={() => onExpandClick(props)}
    >
      {title && <div className='absolute-title'>{title}</div>}
      {showLabels &&
        points.map((p, i) => {
          return (
            <div
              className={`${p.chargeFor ? "charge" : ""} ${
                p.workingOn ? "working" : ""
              }   ${p.partnering ? "partnering" : ""}`}
              style={{
                position: "absolute",
                color: "white",
                left: `${p.maxX * 0.75 + xHalf}px`,
                top: `${p.maxY * 0.75 + yHalf}px`,
                transform: "translateX(-50%)",
                fontSize: 12,
                fontWeight: "lighter",
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
              height: (ring / max) * sideLength,
              width: (ring / max) * sideLength,
              border: `2px solid ${ringColor}`,
              opacity: 0.2,
              zIndex: 1,
              borderRadius: "100%",
            }}
            className='size centered'
          />
        );
      })}
      <div
        style={{
          height: (size / max) * sideLength,
          width: (size / max) * sideLength,
          border: `${armour}px solid ${fillColor}`,
          backgroundColor: attack,
          opacity: 0.5,
          zIndex: 1,
          borderRadius: "100%",
        }}
        className='size centered'
      />

      <div className='svg-container'>
        <svg style={{ width: sideLength, height: sideLength }}>
          <defs>
            <linearGradient id='linear' x1='0%' y1='0%' x2='100%' y2='100%'>
              {race?.map((gene, i) => {
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
            fill={solidFill ? fillColor : `url(#linear)`}
            stroke='black'
            strokeWidth={armour}
            style={{ padding: 0, margin: 0 }}
          />
        </svg>
      </div>
      <style jsx>{`
        svg {
          background-color: ${environment};
        }
        .endboss-container {
          position: relative;
          width: ${sideLength}px;
          height: ${sideLength}px;
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
        .expand-click {
          position: absolute;
          bottom: 2px;
          right: 2px;
        }

        .absolute-title {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 12px;

          color: white;
        }
      `}</style>
    </div>
  );
};

export default Endboss;
