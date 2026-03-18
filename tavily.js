import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { tool } from "@langchain/core/tools";
import { configDotenv } from "dotenv";
import z from "zod";
configDotenv()

const retriever = new TavilySearchAPIRetriever({
  k: 3,
});

// const query = "what is the current weather in Sachin?";

// console.log(result)

const GetSearchResult =  async ({query}) => {
    
    const result = await retriever.invoke(query);

    // console.log(JSON.stringify(result));
    
    return JSON.stringify(result)
} 

// const res = await GetSearchResult({"query":"IPL 2026 champion"})
// console.log(res)
export const SearchTool = tool (
    GetSearchResult,
    {
        name:"Search On Web",
        description:"Get search result by query for latest data.",
        schema:z.object({
            query:z.string().describe("Topic You want to search")
        })
    }
)
