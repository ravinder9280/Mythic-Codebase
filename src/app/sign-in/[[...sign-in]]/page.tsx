import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
     <div className='flex p-5 items-center justify-center'>
    
      <SignIn />
      </div>
  )
}