import axios from "axios"
import { tool } from "langchain"
import z from "zod"

export const AddTodo = async ({name,description}) => {
    const result = await axios.post("http://localhost:8080/todo/new",{name,description})

    return JSON.stringify(result.data)
}

// await getAllTodo()

export const AddTodoTool = tool(
    AddTodo,
    {
        name:"Add Todo",
        description:"Add a new todo by name and description",
        schema:z.object({
            name:z.string().describe("Name of Todo"),
            description:z.string().describe("Description of Todo")
        })
    }
)

