import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

// Simple rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

type Message = {
  role: "user" | "model";
  content: string;
};

const messages: Message[] = [];

export const aiRouter = createTRPCRouter({
  generateText: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const { prompt } = input;

      messages.push({
        role: "user",
        content: prompt,
      });

      try {
        // Rate limiting
        const now = Date.now();
        if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Please wait a moment before sending another message",
          });
        }
        lastRequestTime = now;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Use generateContent instead of chat for simpler implementation
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();

        if (generatedText) {
          messages.push({
            role: "model",
            content: generatedText,
          });
        }

        return {
          generatedText: generatedText ?? "<no text generated>",
        };
      } catch (error: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }),

  reset: publicProcedure.mutation(() => {
    messages.length = 0;
  }),
});
