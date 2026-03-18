'use client';
import React from 'react'
import { TextArea, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm{
  title: string;
  description: string;
}


const NewIssuePage = () => {
  const router = useRouter();
  const {register,control,handleSubmit} = useForm<IssueForm>();
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data)=>{
       await axios.post('/api/issues',data);
       router.push('/issues');
      })}>
        <input
          type="text"
          placeholder="Title"
          {...register('title')}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
        />

        <Controller
          name="description"
          control = {control}
          render = {({field}) => <SimpleMDE placeholder="Description:" {...field} />}

        />

        <Button>Submit New Issue</Button>

    </form>
  )
}

export default NewIssuePage
