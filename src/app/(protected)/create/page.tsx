'use client'
import React, { useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import { toast } from 'sonner'
import useRefatch from '~/hooks/use-refatch'

type FormInput = {
    githubUrl:string,
    projectName:string,
    Token:string
}

const CreatePage = () => {
    const { register, handleSubmit, reset,formState: { errors } }= useForm<FormInput>()
    const createProject=api.project.createProject.useMutation()
    const refetch=useRefatch()
    const onSubmit = (data:FormInput) => {
        // window.alert(JSON.stringify(data))
        createProject.mutate({
            name:data.projectName,
            githubUrl:data.githubUrl,
            githubToken:data.Token,
        },{
            onSuccess: (data) => {
                toast.success('Project Created Successfully')
                refetch()
                reset()

            },
            onError:(data)=>{
                toast.error('Error Creating Project')
            }
        },
        )
        console.log(data); // Data will be the form data
      };
  return (
        <div className="flex w-full h-full items-center justify-center gap-6">
        <img alt='logo' src={'/ill.jpg'} className='h-56' />
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <div className="">

            <h1 className='font-semibold text-xl '>Link Your Github Repository</h1>
            <p className='text-gray-500 text-xs md:text-sm'>Enter the URL of your github repository to link to mythicCodebase</p>
            </div>
            <Input className='text-gray-600' {...register('projectName', { required: 'ProjectName is required' })} required placeholder='Project name'/>
            <Input className='text-gray-600' {...register('githubUrl', { required: 'Github URL is required' })} required placeholder='Github URL'/>
            <Input className='text-gray-600' {...register('Token', )} placeholder='Github Token'/>
            <Button disabled={createProject.isPending} type='submit' >Check Credits <ArrowRight/> </Button>
        </form>

        </div>
  )
}

export default CreatePage