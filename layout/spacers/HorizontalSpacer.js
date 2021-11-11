import React from "react";
//TEST
const HorizontalSpacer = ({ width, ...props }) => {
  return (
    <div {...props} className='spacer'>
      <style jsx>
        {`
          .spacer {
            width: ${width}px;
            border: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default HorizontalSpacer;
