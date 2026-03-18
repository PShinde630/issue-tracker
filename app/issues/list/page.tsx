'use client';
import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';

interface Issue {
  id: number
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}


function IssueListPage() {
    const [issues,setIssues]= useState<Issue[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);


    useEffect(()=>{
        const fetchIssues = async()=>{
            const response = await axios.get(`/api/issues?page=${page}`);
            setIssues(response.data.issues);
            setTotalCount(response.data.totalCount);
        };
        fetchIssues();
    },[page]);

  return (
    <div className="space-y-3 max-w-xl" >
        <h1 className="text-2xl font-semibold">Get Issues</h1>

        {issues.map((issue)=>(
            <div
            key={issue.id}
            className="rounded-md border border-zinc-200 p-4 shadow-sm"
            >
                <h2 className="text-lg font-medium">{issue.title}</h2>
                <p className="text-sm text-zinc-600">{issue.description}</p>
                <p className="text-xs text-zinc-500">Status: {issue.status}</p>
            </div>
        ))}

        <div className="flex items-center gap-3">
        <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
        >
            Previous
        </button>

        <span>Page {page}</span>

        <button
            disabled={totalPages === 0 || page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
        >
            Next
        </button>
        </div>

    </div>
  )
}

export default IssueListPage
