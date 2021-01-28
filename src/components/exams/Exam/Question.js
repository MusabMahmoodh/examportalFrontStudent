import React from "react";

export default function Question({ exam }) {
  return (
    <div>
      <img
        src={exam.question === undefined ? null : exam.question.imageBase64}
        width="100%"
        height="auto"
        alt={exam.name}
      />
    </div>
  );
}
