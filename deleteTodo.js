import axios from "axios"
import { tool } from "langchain"
import z from "zod"

export const DeleteTodo = async ({id}) => {
    const result = await axios.get(`http://localhost:8080/todo/delete/${id}`)

    return JSON.stringify(result.data)
}

// await getAllTodo()

export const DeletesingleTodo = tool(
    DeleteTodo,
    {
        name:"Delete Todo",
        description:"Delete Todo by ID",
        schema:z.object({
            id:z.string().describe("Delete Todo By using ID.")
        })
    }
)

