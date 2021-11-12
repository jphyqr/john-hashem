import React, { useState } from "react";
import ExpandableRow from "../components/ExpandableRow";

const JobRecord = ({ record = {} }) => {
  const [state, setState] = useState();
  return (
    <article className='job-record'>
      <hgroup>
        <h1>{record.displayName}</h1>
        <h2>{record.solution}</h2>

        <ul>
          <a href={record.url} target='_blank'>
            <li> Visit App</li>
          </a>

          <a href={record.retro} target='_blank'>
            <li> Retro</li>
          </a>
        </ul>
      </hgroup>
      <hr />
      <section className='benefits'>
        <h3>Benefits</h3>

        <ul>
          {record.key_benefits?.map((win, i) => {
            return <li key={i}>{win}</li>;
          })}
        </ul>
      </section>

      {record.roles?.map((role, r) => {
        return (
          <section key={r} className='card drawer-container'>
            <ExpandableRow parentComponent={() => <h1>{role.title} </h1>}>
              <section>
                <h4>Wins</h4>
                <ul>
                  {role?.wins?.map((win, i) => {
                    return <li key={i}>{win}</li>;
                  })}
                </ul>
                <h4>Challenges</h4>
                <ul>
                  {role?.challenges?.map((win, i) => {
                    return <li key={i}>{win}</li>;
                  })}
                </ul>
              </section>
            </ExpandableRow>
          </section>
        );
      })}

      <style jsx>{`
        h1,
        h2,
        h3,
        h4 {
          padding: 0px;
          margin: 0px;
        }

        .job-record {
          display: flex;
          height: 100%;
          flex-direction: column;
        }

        a {
          text-decoration: underline;
          color: blue;
        }
      `}</style>
    </article>
  );
};

export default JobRecord;
