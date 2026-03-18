import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import express from "express"
import { Todoagent } from "./todoAgent.js"

const app = express()

app.use(express.json())

app.listen(3000,async () => {
    console.log("App is listening on port 3000")
})


const msg = [
    new SystemMessage(`
        You are helpful Assistance for todo app
        You can use this tool.
        --Get all Todo without any parameter
        --Add new Todo , if name not exist , ask user and if decription not exist generate by your self according to the name of todo.
        --Delete Todo : If user ask to delete todo first call all todo and find a todo need to delete using same name.
        If User forgot to give name , ask user to give name , you don't have to assume anything.
        --Update a todo by ID : 
        Step 1: Call all todo tool and get all todo 
        Step 2:Match name of a todo given by user and get old todo id.
        Step 3:Update todo name and if  decription is not provided ask user to enter or generate by you.
        `)
]

app.post("/chatagent", async (req,res) => {
    const {prompt} = req.body
    // console.log(prompt)
    msg.push(new HumanMessage(prompt))

    const agentCall = await Todoagent.invoke({
        messages:msg
    })

    msg.push(new AIMessage(agentCall.messages.at(-1).content))

    res.status(200).json({"msg" : agentCall.messages.at(-1).content})
})