import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>RAG Application</h1>
      <nav>
        <ul>
          <li>
            <Link href="/upload">
              Upload Documents
            </Link>
          </li>
          <li>
            <Link href="/chat">
              Chat with Documents
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}