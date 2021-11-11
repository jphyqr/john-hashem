import React from "react";
import { useSelector } from "react-redux";

const ItemRecord = () => {
  const item = useSelector((state) => state.vibe.item || {});
  return (
    <article>
      <h1>{item.displayName}</h1>
      <table>
        {Object.keys(item).map((key) => {
          return (
            <tr>
              <td>{key}</td> <td>{item[`${key}`]}</td>
            </tr>
          );
        })}
      </table>
      <style jsx>{`
        article {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        table,
        tr,
        td {
          border: 1px solid black;
        }
        dl {
        }
      `}</style>
    </article>
  );
};

export default ItemRecord;
