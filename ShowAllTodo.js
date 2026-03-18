import axios from "axios"
import { tool } from "langchain"

export const getAllTodo = async () => {
    const result = await axios.get("http://localhost:8080/todo")

    return JSON.stringify(result.data)
}

// await getAllTodo()

export const getAllTodoTool = tool(
    getAllTodo,
    {
        name:"All Todo",
        description:"Get all Todo",
    }
)

