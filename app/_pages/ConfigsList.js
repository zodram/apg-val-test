import React from 'react';
// import { useEffect, useState } from "react";



function ConfigsList({configs}) {


  return(
      <>
      <h1>Configs</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>System Prompt</th>
            <th>Max Tokens</th>
            <th>Temperature</th>
            <th>Top P</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {configs
            .map((config) => {
              return (
                <tr key={config.id}>
                  <td className="align-middle">{config.id}</td>
                  <td className="align-middle">{config.system_prompt}</td>
                  <td className="align-middle">{config.max_tokens}</td>
                  <td className="align-middle">{config.temperature}</td>
                  <td className="align-middle">{config.top_p}</td>
                  <td className="align-middle">{config.model_id}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </>
    );
  }

export default ConfigsList;
