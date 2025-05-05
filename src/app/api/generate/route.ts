import { NextResponse } from "next/server";
import OpenAI from "openai";

// Log whether we have an API key (but don't log the key itself)
console.log("OpenAI API Key present:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OpenAIError {
  message: string;
  code?: string;
  type?: string;
  status?: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ageGroup,
      duration,
      theme,
      hero,
      companions,
      journey,
      ending,
      customTheme,
    } = body;

    // Simplified prompt
    const prompt = `Write a short children's story for age ${ageGroup}.
    Theme: ${theme}${customTheme ? ` (${customTheme})` : ""}
    Main character: ${hero}
    With: ${companions}
    Journey: ${journey}
    Ending: ${ending}
    Length: ${duration} reading time
    Make it engaging and age-appropriate.`;

    console.log("Sending request to OpenAI with prompt:", prompt);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a children's story writer. Keep stories simple and fun.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500, // Reduced from 1000
    });

    console.log("OpenAI response received successfully");
    const story = completion.choices[0].message.content;

    return NextResponse.json({ story });
  } catch (error) {
    const openAIError = error as OpenAIError;
    console.error("Error generating story:", {
      message: openAIError.message,
      code: openAIError.code,
      type: openAIError.type,
      status: openAIError.status,
    });
    return NextResponse.json(
      { error: "Failed to generate story: " + openAIError.message },
      { status: 500 }
    );
  }
}
