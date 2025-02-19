'use client'
import { Button } from "~/components/ui/button"
import React from 'react'
import { CardHeader,Card,CardTitle, CardContent } from "~/components/ui/card"
import { Textarea } from "~/components/ui/textarea"
import useProject from "~/hooks/use-project"
import { Dialog, DialogHeader,DialogContent, DialogTitle } from "~/components/ui/dialog"
import Image from "next/image"

const AskQuestionCard = () => {
  const {project}=useProject()
  const [question ,setQuestion]=React.useState("")
  const [open ,setOpen]=React.useState(false)
  const onSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setOpen(true)


  }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>

      <DialogHeader>
        <DialogTitle>
          <Image src="/logo.png" width={24} height={24} alt="ask question"/>

        </DialogTitle>
      </DialogHeader>
      </DialogContent>
    </Dialog>
    <Card className="relative col-span-3">
        <CardHeader>
            <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={onSubmit} onChange={e=>setQuestion(e.target.value)}>
                <Textarea value={question} placeholder="Which file should i edit to change the home page"/>
                <div className="h-4"></div>
                <Button type="submit" >Ask MythicCodebase</Button>
            </form>
        </CardContent>
    </Card>
    </>
  )
}

export default AskQuestionCard