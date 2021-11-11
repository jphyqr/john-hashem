import React from "react";

const VerticalSpacer = ({ height, ...props }) => {
  return (
    <span className='spacer' {...props}>
      <style jsx>
        {`
          .spacer {
            min-height: ${height}px;
            width: 100%;
            border: none !important;
            outline: none;
          }
        `}
      </style>
    </span>
  );
};

export default VerticalSpacer;
