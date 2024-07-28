"use client";

import { useState } from "react";
import axios from "axios";
import DependencyGraph from "./components/dependencygraph";

interface Dependency {
  name: string;
  version: string;
}

export default function Home() {
  const [dependencies, setDependencies] = useState<Dependency[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File to upload:', file.name, file.type, file.size);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.data);
      setDependencies(response.data.dependencies);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.error || 'Failed to upload file');
      } else {
        console.error('Error details:', error);
        setError('Failed to upload file');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        DepViz - Dependency Visualizer
      </h1>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {dependencies && <DependencyGraph dependencies={dependencies} />}
    </div>
  );
}
