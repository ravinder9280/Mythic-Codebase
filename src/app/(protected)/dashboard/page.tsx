'use client'
import { useUser } from '@clerk/nextjs'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import useProject from '~/hooks/use-project'
import CommitLog from './commit-log'
import AskQuestionCard from './ask-question-card'
import NewMeeting from './new-meeting'

type Props = {}

const page = (props: Props) => {
  const {user}=useUser()
  const {project}=useProject()
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        <div className="w-fit rounded-md bg-primary px-4 py-3">

          <div className="flex items-center">
            <Github className='text-white size-5'/>
            <div className="ml-2">

            <p className='text-sm font-medium text-white' > This project is linked to {''}
              <Link className='inline-flex items-center text-white/80 hover:underline' href={project?.githubUrl??""}>
              {project?.githubUrl}
              <ExternalLink className='ml-1 size-4'/>
              </Link>
            </p>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-2"></div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-5 '>

      <AskQuestionCard />
      <NewMeeting/>
      </div>
      <CommitLog/>

    </div>
  )
}

export default page