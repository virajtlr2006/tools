import axios from "axios"
import { tool } from "langchain"
import z from "zod"

export const UpdateTodo = async ({id,name,description}) => {
    const result = await axios.post(`http://localhost:8080/todo/update/${id}`,{name,description})

    return JSON.stringify(result.data)
}

// await getAllTodo()

export const UpdateSingleTodo = tool(
    UpdateTodo,
    {
        name:"Update Todo",
        description:"Update Todo by ID and update description and name",
        schema:z.object({
            id:z.string().describe("Update Todo By using ID."),
            name:z.string().describe("Updated name/new name"),
            description:z.string().describe("Updated description/new description"),
        })
    }
)

