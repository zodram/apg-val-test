"use client"
import { useEffect, useState } from "react";
import runPromptEval from "@/app/api/_services/runPromptEval"
import getAllConfigs from "../configurations"


export default function PromptList() {
  const [prompts, setPrompts] = useState([]);
  const getPrompts = async () => {
    await fetch('/api/prompts')
      .then(res => res.json())
      .then(data => {
        setPrompts(data.result.rows);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getPrompts();
  }, []);

  let configs = getAllConfigs();

  const edit = (id) => {
    window.location.href = `/prompts/${id}`;
  };

  async function deletePrompt(id) {
    await fetch(`/api/prompts/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);
        setPrompts(updatedPrompts);
      }
    })
  };

  let promptsForEval = prompts.filter(prompt => (prompt.expected_response === null) || (prompt.response === null) || (prompt.accuracy_score === null) || (prompt.sympathy_score === null))
  // setInterval(() => {
  //   if (promptsForEval.length > 0) {
  runPromptEval(promptsForEval, configs)
  //   }
  // }, 10000);

  return (
    <div>
      <h1 className="text-center">Prompts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Language</th>
            <th>Prompt</th>
            <th>Response</th>
            <th>Config ID</th>
            <th>Expected Response</th>
            <th>Edit</th>
            <th>Parent ID</th>
            <th>Accuracy Score</th>
            <th>Sympathy Score</th>
            <th>Eval Model</th>
          </tr>
        </thead>
        <tbody>
          {prompts
            .map((prompt) => {
              return (
                <tr key={prompt.id}>
                  <td className="align-middle">{prompt.id}</td>
                  <td className="align-middle">{prompt.lang}</td>
                  <td className="align-middle">{prompt.prompt}</td>
                  <td className="align-middle">{prompt.response}</td>
                  <td className="align-middle">{prompt.config_id}</td>
                  <td className="align-middle">{prompt.expected_response}</td>
                  <td className="align-middle">
                    <button type="button" className="btn btn-primary" onClick={() => edit(prompt.id)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => deletePrompt(prompt.id)}>Delete</button>
                  </td>
                  <td className="align-middle">{prompt.parent_id}</td>
                  <td className="align-middle">{prompt.accuracy_score}</td>
                  <td className="align-middle">{prompt.sympathy_score}</td>
                  <td className="align-middle">{prompt.sympathy_score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
