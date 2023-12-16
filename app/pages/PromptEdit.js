import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";




function PromptEdit() {
  const promptId = useParams();
  const id = parseInt(promptId.promptId);
  console.log("id:", id);
  const [promptData, setPromptData] = useState([]);
  const getPromptData = async () => {
    const promptUrl = `http://localhost:8001/prompts/${id}`;
    const promptResponse = await fetch(promptUrl);
    if (promptResponse.ok) {
      const data = await promptResponse.json();
      console.log("data:", data);
      setPromptData(data[0]);
      console.log("prompt data:", promptData);
    }
  };


  useEffect(() => {
    getPromptData();
  }, []);


  // const [promptQue, setPromptQue] = useState(prompt.prompt);
  // console.log("promptQue:", promptQue);
  // const [response, setResponse] = useState(prompt.response);
  // const [expRes, setExpRes] = useState(prompt.expected_response);


  // const handlePromptQueChange = (event) => {
  //   const value = event.target.value;
  //   setPromptQue(value);
  // };

  // const handleResponseChange = (event) => {
  //   const value = event.target.value;
  //   setResponse(value);
  // };

  // const handleExpResPromptQueChange = (event) => {
  //   const value = event.target.value;
  //   setPromptQue(value);
  // };






  return(
      <>
      <h1>Prompt Edit</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prompt</th>
            <th>Response</th>
            <th>Expected Response</th>
          </tr>
        </thead>
        <tbody>
               <tr key={prompt.id}>
                  <td className="align-middle">{prompt.id}</td>
                  <td className="align-middle">{prompt.prompt}</td>
                  {/* <td className="align-middle">
                  <input onChange={handlePromptQueChange} defaultValue={promptQue} placeholder="Prompt" required type="text" name="text" id="promptQue" className="form-control align-middle" />
                  </td> */}
                  <td className="align-middle">{prompt.response}</td>
                  <td className="align-middle">{prompt.expected_response}</td>
                </tr>

        </tbody>
      </table>
      </>
    );
  }

export default PromptEdit;
