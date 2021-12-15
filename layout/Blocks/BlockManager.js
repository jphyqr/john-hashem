import Block from "./Block";

import React, { useEffect, useState } from "react";

const BlockManager = ({ blocks, animateCount }) => {
  const [showIndex, setShowIndex] = useState(0);
  const [cubeRefs, setCubeRefs] = useState({});
  const [animationDone, setAnimationDone] = useState(false);
  useEffect(() => {
    const nextBlock = () => {
      setTimeout(() => {
        setShowIndex(showIndex + 1);
      }, [showIndex < 2 ? 1000 : 100]);
    };

    if (showIndex === blocks.length - 1) return;

    if (showIndex < animateCount - 1) {
      nextBlock();
    } else {
      setAnimationDone(true);
    }
  }, [showIndex]);
  return (
    <div className={`block-manager-container`}>
      {blocks.map((block, i) => {
        return (
          <Block
            animationDone={animationDone}
            appear={i <= showIndex}
            data={block}
            index={i}
            total={blocks.length}
            key={i}
            setCubeRefs={setCubeRefs}
            previousBlockPosition={cubeRefs[`${i - 1}`] || null}
          />
        );
      })}
    </div>
  );
};

export default BlockManager;
