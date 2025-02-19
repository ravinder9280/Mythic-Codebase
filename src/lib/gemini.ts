import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
import {Document } from '@langchain/core/documents'


  
  // const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export async function aiSummariseCommit(diff:string) {
    const response = await model.generateContent([`you have been given a github commit file below you have to give a summary just give me the summary in 2 t0 3 lines dont give me any highlight heading what changes have been made in this file
        and the file is ${diff}`])
    //   generationConfig,
    // //   history: [
    // //     {
    // //       role: "user",
    // //       parts: [
    // //         {text: "who is peter griffin\n"},
    // //       ],
    // //     },
    // //     {
    // //       role: "model",
    // //       parts: [
    // //         {text: "Peter Griffin is a fictional character and the main protagonist of the popular animated sitcom **Family Guy**. \n\nHere's a breakdown of who he is:\n\n**Key Characteristics:**\n\n* **Personality:** Peter is often portrayed as a well-meaning but incredibly dim-witted, immature, lazy, and often selfish man. He frequently makes impulsive decisions, acts childishly, and lacks a strong sense of responsibility. He's also prone to outbursts, emotional swings, and a general obliviousness to social cues.\n* **Appearance:** Peter is a large, overweight man with brown hair, often seen wearing a white collared shirt, green pants, and glasses.\n* **Family:** He is married to Lois Griffin and is the father of Meg, Chris, and Stewie. He also has a dog named Brian who is a close friend despite their frequent disagreements.\n* **Job:** While he has held a variety of jobs throughout the series, he is most often employed at the Pawtucket Patriot Brewery.\n* **Humor:** He is the primary source of humor on the show, often through his absurd actions, malapropisms, and lack of common sense. Family Guy's humor often relies on cutaway gags, which frequently involve Peter in ridiculous scenarios.\n\n**Significance:**\n\n* **Iconic Character:** Peter Griffin is one of the most recognizable and iconic characters in contemporary animated television. His portrayal of a flawed and often ridiculous character has resonated with audiences.\n* **Social Commentary:** While he often embodies stupidity and irresponsibility, Peter can also be seen as a satirical reflection of certain aspects of American culture and society.\n* **Cultural Impact:** Family Guy's humor, often considered controversial, has had a significant influence on modern animated sitcoms and comedy. Peter, being central to the show, has played a major role in this cultural impact.\n\n**In summary, Peter Griffin is a beloved but deeply flawed character whose humor stems from his idiocy, impulsiveness, and general cluelessness. He's the central figure in the chaotic world of Family Guy and a significant part of its comedic DNA.**\n"},
    // //       ],
    // //     },
    // //   ],
    // });
  
    // const result = await chatSession.("what is his wife name");
    // console.log(result.response.text());
    return response.response.text()
  }

  export const summariseCode=async (doc:Document)=>{
    console.log(`getting summary for`,doc.metadata.source)
    try {
      
      const code=doc.pageContent.slice(0,1000)
      const response=await model.generateContent([`you are a senior software engineer who specialises in onboarding junior software engineer onto projects
        you are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file 
        here is the code :
        ----
        ${code}
        ----
        Give a summary no more than 100 words of the code above`])
        return response.response.text()
    } catch (error) {
      return ""
      
    }

  }

  export async function generateEmbedding(summary:string){
    const model =genAI.getGenerativeModel({
      model:"text-embedding-004"
    })
    const result=await model.embedContent(summary)
    const embedding=result.embedding
    return embedding.values

  }
  // console.log(await generateEmbedding('hello my sweetylove you'))
  