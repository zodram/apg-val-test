"use client"
// import React from 'react';
// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import getPrompts from '@/app/lib/prompts.js'





export default function promptList() {
//  const prompts = getPrompts();
//  console.log(prompts);
  // const [prompts, setPrompts] = useState([]);
  // const getPromptsData = async () => {
  //   const promptsUrl = '/api/prompts';
  //   const promptsResponse = await fetch(promptsUrl);
  //   if (promptsResponse.ok) {
  //     const data = await promptsResponse.json();
  //     setPrompts(data);
  //     console.log("prompts data:", data);
  //   }
  // };

  // useEffect(() => {
  //   getPromptsData();
  // }, [])


  // const getData = async () => {
  //   await fetch('/api/prompts')
  //   .then( res => res.json() )
  //   .then( data => {
  //     console.log(data.data.rows);
  //   })
  //   .catch( err => console.log(err) )
  //   .finally( () => {
  //     // set loading to false
  //   })
  // }

  // useEffect(() => {
  //   getData();
  // }, [])

  // const navigate = useNavigate();
  // const edit = (id) => {
  //   console.log(id);
  //   navigate(`/prompts/${id}`);
  // };

  return(
      <div>
      <h1 className="text-center">Prompts</h1>
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
      </div>
    );
  }

