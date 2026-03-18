import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { tool } from "langchain";
import z from "zod";

const Wikipedia = new WikipediaQueryRun({
  topKResults: 3,
  maxDocContentLength: 4000,
});

export const FetchWikipedia = async ({topic}) => {
    const result = await Wikipedia.invoke(topic)
    // console.log(result)
    return result
}

export const WikipediaTool = tool(
    FetchWikipedia,
    {
        name:"Wikipedia",
        description:"Give topic and get info about that",
        schema:z.object({
            topic:z.string().describe("Topic you want to search")
        })
    }
)