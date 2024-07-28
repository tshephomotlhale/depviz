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
    
    <div className="container mx-auto p-4 center">
      <h1 className="text-5xl font-semibold mb-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-pink-500">
        DepViz
      </h1>
      <p className="text-center mb-5 text-2xl" >
        Dependency Visualizer</p>
      <div className="flex justify-center align-content center">
      <input 
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        id="file-upload"
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-pink-300 hover:from-green-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-400 ease-in-out">
        Upload JSON File
        </label>

      </div>
      
      {loading && <p className="text-white-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center align-content center">
      {dependencies && <DependencyGraph dependencies={dependencies} />}
      </div>
    </div>
  
  );
}

