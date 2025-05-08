import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getDateinformation, SearchEvents } from "./helper.js";

const server = new McpServer({
  name: "jalali date server",
  version: "1.0.0",
});

server.resource(
  "date",
  "get currect date and time in IOS format",
  async () => ({
    content: [
      {
        type: "text",
        text: "today date is " + new Date().toISOString(),
      },
    ],
  })
);

server.tool(
  "jalaliCalendar",
  "Provides structured calendar data based on a given date. Outputs Jalali (Persian), Gregorian, and Hijri calendar information, including Iranian national holidays, Islamic events, and seasonal metadata.",
  {
    date: z.string().describe("ISO 8601 date string (example: '2025-05-08')"),
  },
  async ({ date }) => ({
    content: [
      {
        type: "text",
        text: getDateinformation(date),
      },
    ],
  })
);



server.tool(
  "findHolidayOrEvent",
  "Helps find Iranian (Persian) holidays, cultural events, or important dates based on a Persian name or keyword. Useful for answering user questions about national or Islamic events.",
  {
    query: z
      .string()
      .describe("Event name or part of it, in Persian (Farsi) text"),
  },
  async ({ query }) => {
    return {
      content: [
        {
          type: "text",
          text: SearchEvents(query),
        },
      ],
    };
  }
);

server.prompt(
  "today-date-information",
  "User asks for today's date and calendar information.",
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: getDateinformation(),
        },
      },
    ],
  })
);

server.prompt(
  "specific-date-information",
  "User asks about a specific date's information in Jalali, Gregorian, and Hijri calendars.",
  {
    date: z.string().describe("ISO 8601 date string (example: '2025-05-08')"),
  },
  ({ date }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: getDateinformation(date),
        },
      },
    ],
  })
);

server.prompt(
  "current-timestamp",
  "User asks for the current system date and time in ISO format.",
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: "Today date is: " + new Date().toISOString(),
        },
      },
    ],
  })
);

server.prompt(
  "is-today-holiday",
  "User asks if today is a holiday or if there are any events.",
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: getDateinformation(),
        },
      },
    ],
  })
);

server.prompt(
  "weekday-name-specific-date",
  "User asks for the weekday name of a specific date.",
  {
    date: z.string().describe("ISO 8601 date string (example: '2025-05-08')"),
  },
  ({ date }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: getDateinformation(date),
        },
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Jalali Date MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
