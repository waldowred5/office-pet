import {Configuration, OpenAIApi} from "openai";
import {Pet} from "../types";
import templateString from "../utils/template-string";
import general from '../assets/general.json';


export default async function getReplyCompletion(pet: Pet, prompt: string) {
  if (!process.env.OPENAI_API_KEY) {
    return `Sorry I missed that, what would you like to do with ${pet.name}?`
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: templateString(general.fallbackPrompt, {name: pet.name, ...pet.attributes})},
      {role: "user", content: templateString(general.fallbackPromptReply, {prompt})},
    ],
  });

  return completion.data.choices[0].message.content;
}
