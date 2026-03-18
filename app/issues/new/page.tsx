'use client';
import React, { useState } from 'react'
import { Button, Callout } from "@radix-ui/themes";
import dynamic from 'next/dynamic';
import {useForm,Controller} from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface IssueForm{
  title: string;
  description: string;
}


const NewIssuePage = () => {
  const router = useRouter();
  const {register,control,handleSubmit} = useForm<IssueForm>();
  const [error,setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text> {error}  </Callout.Text>
      </Callout.Root>}
    <form className='space-y-3' onSubmit={handleSubmit(async (data)=>{
        try {
          await axios.post('/api/issues',data);
          router.push('/issues');
          
        } catch (error) {
          setError('An Unexpected Error Occurred.');
        }
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

        <Button type="submit" className="cursor-pointer">Submit New Issue</Button>

    </form>
    </div>
  )
}

export default NewIssuePage
