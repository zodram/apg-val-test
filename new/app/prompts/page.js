"use client"
import { useEffect, useState } from "react";
// import runPromptEval from "@/services/genEval"
import getAllPrompts from "../prompts"
import getAllConfigs from "../configurations"

async function genExpResAndRes(prompt, col) {
  const res = await fetch('/api/genExpResAndRes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      promptData: prompt,
      col: col
    }),
  });
};


export default function PromptList() {
  const edit = (id) => {
    window.location.href = `/prompts/${id}`;
  };
  async function deletePrompt(id) {
    await fetch(`/api/prompts/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        getPrompts();
      }
    })
  };

  const prompts = getAllPrompts();
  const configs = getAllConfigs();

  let promptsForExpRes = prompts.filter(prompt => (prompt.expected_response === null));
  console.log("promptsForExpRes:", promptsForExpRes)
  if (promptsForExpRes.length > 0) {
    for (let i = 0; i < promptsForExpRes.length; i++) {      
      genExpResAndRes(promptsForExpRes[i], "ExpRes");
    };
  };
  
  
  // setInterval(() => {
  //   if (promptsForEval.length > 0) {
  //     runPromptEval(promptsForEval, configs)
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
