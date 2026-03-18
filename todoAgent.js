import { createAgent, HumanMessage, SystemMessage } from "langchain";
import { llm } from "./Config/llm.js";
import { getAllTodoTool } from "./ShowAllTodo.js";
import { AddTodoTool } from "./addTodo.js";
import { DeletesingleTodo } from "./deleteTodo.js";
import { UpdateSingleTodo } from "./UpdateTodo.js";

export const Todoagent = createAgent({
    model:llm,
    tools:[getAllTodoTool,AddTodoTool,DeletesingleTodo,UpdateSingleTodo]
})

// const msg = [
//     new SystemMessage(`
//         You are helpful Assistance for todo app
//         You can use this tool.
//         --Get all Todo without any parameter
//         --Add new Todo , if name not exist , ask user and if decription not exist generate by your self according to the name of todo.
//         `)
// ]

// msg.push(new HumanMessage("Show all TODO."))

// const agentCall = await Todoagent.stream({
//     messages:msg
// },
// {
//     streamMode:"updates"
// })
// // console.log(agentCall)

// for await(const chunk of agentCall){
//     console.log(chunk)
// }