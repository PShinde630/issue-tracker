'use client';
import React from 'react'
import { TextArea, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
        />

        <SimpleMDE placeholder="Description:" />

        <Button>Submit New Issue</Button>

    </div>
  )
}

export default NewIssuePage
