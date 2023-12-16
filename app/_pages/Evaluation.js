import React from 'react';
import { useEffect, useState } from "react";



function Evaluation() {
  const [evalSets, setEvalSets] = useState([]);
  const getEvalSetsData = async () => {
    const evalSetsUrl = "http://localhost:8001/testcases/";
    const evalSetsResponse = await fetch(evalSetsUrl);
    if (evalSetsResponse.ok) {
      const data = await evalSetsResponse.json();
      setEvalSets(data);
      console.log("testcase data:", data);
    }
  };

  useEffect(() => {
    getEvalSetsData();
  }, []);



  return (
    <>
      <h1>Evaluation</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Language</th>
            <th>Prompt</th>
            <th>Expected Response</th>
            <th>Response</th>
            <th>Config ID</th>
            <th>Accuracy Score</th>
            <th>Sympathy Score</th>
          </tr>
        </thead>
        <tbody>
          {evalSets
            .map((evalSet) => {
              return (
                <tr key={evalSet.id}>
                  <td className="align-middle">{evalSet.id}</td>
                  <td className="align-middle">{evalSet.lang}</td>
                  <td className="align-middle">{evalSet.prompt}</td>
                  <td className="align-middle">{evalSet.expected_response}</td>
                  <td className="align-middle">{evalSet.response}</td>
                  <td className="align-middle">{evalSet.config_id}</td>
                  <td className="align-middle">{evalSet.accuracy_score}</td>
                  <td className="align-middle">{evalSet.sympathy_score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

    </>
  );
}

export default Evaluation;
