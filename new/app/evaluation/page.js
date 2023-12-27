"use client"
import { useEffect, useState } from "react";


export default function Evaluation() {
  const [testcases, setTestcases] = useState([]);
  const getTestcases = async () => {
    await fetch('/api/evaluation')
      .then(res => res.json())
      .then(data => {
        setTestcases(data.result.rows);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getTestcases();
  }, []);

  return (
    <div>
      <h1 className="text-center">Evaluation</h1>
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
          {testcases
            .map((testcase) => {
              return (
                <tr key={testcase.id}>
                  <td className="align-middle">{testcase.id}</td>
                  <td className="align-middle">{testcase.lang}</td>
                  <td className="align-middle">{testcase.prompt}</td>
                  <td className="align-middle">{testcase.expected_response}</td>
                  <td className="align-middle">{testcase.response}</td>
                  <td className="align-middle">{testcase.config_id}</td>
                  <td className="align-middle">{testcase.accuracy_score}</td>
                  <td className="align-middle">{testcase.sympathy_score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
