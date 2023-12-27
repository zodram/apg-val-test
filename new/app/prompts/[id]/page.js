"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";


export default function PromptEdit() {
  const params = useParams();
  const [promptData, setPromptData] = useState([]);
  const getPromptData = async () => {
    await fetch(`/api/prompts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setPromptData(data.result.rows[0]);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getPromptData();
  }, []);

  const [newPrompt, setNewPrompt] = useState(promptData.prompt);
  const [newResponse, setNewResponse] = useState(promptData.response);
  const [newExpRes, setNewExpRes] = useState(promptData.expected_response);

  let defaultValueOfExpRes;
  if (promptData.expected_response) {
    defaultValueOfExpRes = promptData.expected_response;
  } else {
    defaultValueOfExpRes = promptData.response;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.lang = promptData.lang;
    if (!newPrompt) {
      data.prompt = promptData.prompt;
    } else {
      data.prompt = newPrompt;
    };
    if (!newResponse) {
      data.response = promptData.response;
    } else {
      data.response = newResponse;
    };
    if (!newExpRes) {
      data.expected_response = defaultValueOfExpRes;
    } else {
      data.expected_response = newExpRes;
    };
    data.config_id = promptData.config_id;
    data.parent_id = promptData.id;
    const url = `/api/prompts`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      window.location.href = `/prompts`;
    };
  };

  const cancel = (event) => {
    window.location.href = `/prompts`;
  };

  return (
    <div>
      <h1 className="text-center">Prompt Edit</h1>
      <form onSubmit={handleSubmit}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prompt</th>
              <th>Response</th>
              <th>Expected Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea row="20" defaultValue={promptData.prompt} onChange={(e) => setNewPrompt(e.target.value)} placeholder="Prompt" required className="form-control" />
              </td>
              <td>
                <textarea row="20" defaultValue={promptData.response} onChange={(e) => setNewResponse(e.target.value)} placeholder="Response" className="form-control" />
              </td>
              <td>
                <textarea row="20" defaultValue={defaultValueOfExpRes} onChange={(e) => setNewExpRes(e.target.value)} placeholder="Expected Response" required className="form-control" />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary">Create A New Record</button> <button className="btn btn-danger" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
}
