import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";
import {Pet} from "../types";
import templateString from "../utils/template-string";
import general from '../assets/general.json';
import {interfaces} from "ask-sdk-model";

export default async function getReplyCompletion(
  pet: Pet,
  prompt: string,
  history: ChatCompletionRequestMessage[] = []
): Promise<{ response: string, history?: ChatCompletionRequestMessage[] }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      response: `Sorry I missed that, what would you like to do with ${pet.name}?`,
      history: [],
    }
  }

  const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
  const openai = new OpenAIApi(configuration);

  const messages: ChatCompletionRequestMessage[] = !history.length ?
    [
      {role: "system", content: templateString(general.fallbackPrompt, {name: pet.name, ...pet.attributes})},
      {role: "user", content: prompt},
    ]
    : [
      ...history,
      {role: "user", content: prompt},
    ];

  const completion = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: messages});
  const response = completion.data.choices[0].message.content;
  messages.push({ role: 'assistant', content: response});

  return {response, history: messages};
}
