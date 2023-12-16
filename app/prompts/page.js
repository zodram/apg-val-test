import React from 'react';
// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import prompts from '@/app/api/prompts';




const PromptsList = () =>{
 const prompts = prompts.getPrompts();
 console.log(prompts)
  // const [prompts, setPrompts] = useState([]);
  // const getPromptsData = async () => {
  //   const promptsUrl = "http://localhost:8001/prompts/";
  //   const promptsResponse = await fetch(promptsUrl);
  //   if (promptsResponse.ok) {
  //     const data = await promptsResponse.json();
  //     setPrompts(data);
  //     console.log("prompts data:", data);
  //   }
  // };


  // const navigate = useNavigate();
  // const edit = (id) => {
  //   console.log(id);
  //   navigate(`/prompts/${id}`);
  // };

  return(
      <>
      <h1>Prompts</h1>
      {/* <table className="table table-striped">
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
                    <button type="button" className="btn btn-danger" onClick={ () => edit(prompt.id) }>Edit</button>

                  </td>
                  <td className="align-middle">{prompt.parent_id}</td>
                  <td className="align-middle">{prompt.accuracy_score}</td>
                  <td className="align-middle">{prompt.sympathy_score}</td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
      </>
    );
  }

export default PromptsList;
