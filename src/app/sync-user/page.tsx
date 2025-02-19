import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { db } from '~/server/db'

type Props = {}

const page =async (props: Props) => {
const {userId}=await auth()
if(!userId){
    throw new Error('user not found')
}
const client =await clerkClient()
const user=await client.users.getUser(userId)
if(!user.emailAddresses[0]?.emailAddress){
    return notFound()
}
await db.user.upsert({
    where:{
        emailAddress:user.emailAddresses[0]?.emailAddress??""

    },
    update:{
        imageUrl:user.imageUrl,
        firstName:user.firstName,
        lastName:user.lastName,

    },
    create:{
        id:userId,
        imageUrl:user.imageUrl,
        firstName:user.firstName,
        lastName:user.lastName,
        emailAddress:user.emailAddresses[0]?.emailAddress??""
    }
})

  return redirect('/dashboard')
}

export default page