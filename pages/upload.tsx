import React, { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bucketId, setBucketId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/buckets", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setBucketId(data.bucketId);
    } else {
      console.error("Upload failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload PDF & Create Bucket</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload</button>
      {bucketId && <p>New bucket created: {bucketId}</p>}
    </div>
  );
}