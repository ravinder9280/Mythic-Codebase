import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import useProject from '~/hooks/use-project'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'

type Props = {}

const CommitLog = (props: Props) => {
    const {projectId,project}=useProject()
    const {data:commits}=api.project.getCommits.useQuery({projectId})
    console.log(commits)
  return (
    <div className='flex flex-col gap-4'>
        {commits?.map((commit,idx)=>{
            return <div key={idx} className={cn(idx==0?'mt-4':'','flex border rounded-lg  gap-2 items-start p-4 px-2')}>
                <img alt='avatar' className='h-12  rounded-[50%]' src={commit.commitAuthorAvatar} />
                <div className=''>
                    <div className='flex gap-1'>

                    <p className='text-gray-800'>@{commit.commitAuthorName} </p>
                    <span className='text-gray-400 '>commited </span>
                    <ExternalLink height={20} className='text-xs text-gray-400'/>
                    </div>

                <p className='font-semibold mb-2'> {commit.commitMessage}</p>
                <p className='text-gray-500'> {commit?.summary}</p>
                </div>
            </div>

        })}
    </div>
  )
}

export default CommitLog