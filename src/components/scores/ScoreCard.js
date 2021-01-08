import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ScoreCard = ({ selectedSection }) => {
  let history = useHistory();
  return (
    <div>
      <Table bordered hover variant="success" size="sm">
        <thead>
          <tr>
            <th>Quiz name</th>
            <th>Marks</th>
            <th>Time taken(minutes)</th>
          </tr>
        </thead>
        <tbody>
          {selectedSection &&
            selectedSection.map((sec) => (
              <tr key={sec._id}>
                <td
                  onClick={() =>
                    history.push(`/subscription/${sec.exam._id}/question`)
                  }
                >
                  {sec.exam.name}
                </td>
                <td>{sec.score}</td>
                <td>{sec.timeTaken[0].minutes}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ScoreCard;
