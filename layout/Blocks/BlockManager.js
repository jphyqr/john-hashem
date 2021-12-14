import Block from "./Block";

import React, { useEffect, useState } from "react";

const BlockManager = ({ blocks }) => {
  const [showIndex, setShowIndex] = useState(0);
  const [cubeRefs, setCubeRefs] = useState({});
  useEffect(() => {
    const nextBlock = () => {
      setTimeout(() => {
        setShowIndex(showIndex + 1);
      }, [2000]);
    };

    if (showIndex === blocks.length - 1) return;

    nextBlock();
  }, [showIndex]);
  return (
    <div className={`block-manager-container`}>
      {blocks.map((block, i) => {
        return (
          <Block
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
