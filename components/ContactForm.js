import React from "react";

const ContactForm = ({ backgroundColor, fields = [] }) => {
  return (
    <table className='contact-form'>
      {fields.map((field, i) => {
        return (
          <tr key={i}>
            <td>{field.name}</td> <td>{field.value}</td>
            {field.url ? (
              <td>
                {" "}
                <a href={field.url} target='_blank'>
                  Visit{" "}
                </a>
              </td>
            ) : (
              <td onClick={() => window.alert("todo/DIDNT COPY")}> Copy</td>
            )}
          </tr>
        );
      })}
      <style jsx>{`
        td > a {
          color: blue;
        }
        tr {
          line-height: 30px;
        }
        tr:nth-child(2n + 1) {
          background-color: white;
        }
        .contact-form {
          display: table;

          width: 100%;
          background-color: ${backgroundColor};
        }
      `}</style>
    </table>
  );
};

export default ContactForm;
