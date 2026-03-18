import { tool } from "@langchain/core/tools";
import { createAgent, HumanMessage, SystemMessage } from "langchain";
import z from "zod";
import {llm} from "./Config/llm.js"
import { WikipediaTool } from "./wikipediatool.js";
import { SearchTool } from "./tavily.js";

// const msg = [
//     new SystemMessage("Reply peacfully")
// ]

// const CheckLLM = async (prompt) => {
//     msg.push(new HumanMessage(prompt))
//     const llmCall = await llm.invoke(msg)
//     console.log(llmCall)
// }

// await CheckLLM("Hyy")

export const RandomFacts = async ({type}) => {
    if(type == "car"){
        return "Car has 4 wheels"
    }
    if(type == "bike"){
        return "Bike has 2 wheels"
    }
}

const result = await RandomFacts({"type":"car"})
// console.log(result)

const RandomFactTool = tool(
    RandomFacts,
    {
        name:"Random Fact",
        description:"Get random fact by name",
        schema:z.object({
            type:z.string().describe("Type of fact , eg. car , bike, truck, etc.")
        })
    }
)

const agent = createAgent({
    model:llm,
    tools:[RandomFactTool,WikipediaTool,SearchTool]
})

const response = await agent.invoke({
    messages : [
        new SystemMessage("For reasearch Related topic use wikipedia and for latest info use search tools , If you are confuse use both tool and try to recieve accurate information and answer."),
        new HumanMessage("Who was the defending champion of IPL 2025?")]
})
console.log(response)

