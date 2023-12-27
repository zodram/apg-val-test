"use client"
import { useEffect, useState } from "react";


export default function getAllConfigs() {
  const [configs, setConfigs] = useState([]);
  const getConfigs = async () => {
    await fetch('/api/configurations')
      .then(res => res.json())
      .then(data => {
        setConfigs(data.result.rows);
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getConfigs();
  }, []);
  return configs
};
