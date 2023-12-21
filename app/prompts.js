"use client"
import { useEffect, useState } from "react";


export default function getAllPrompts() {
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
  return prompts
};
