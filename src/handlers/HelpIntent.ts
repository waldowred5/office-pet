import { getIntentName, getRequestType } from 'ask-sdk-core';

const HelpIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const { pet } = handlerInput;

    const prompt = pet
      ? `This is office pet! You can ask me how ${pet.name}, you can also ask me to feed ${pet.name} or even to clean ${pet.name}!`
      : 'This is office pet! To get started ask me to adopt a pet.';

    return handlerInput.responseBuilder.speak(prompt).reprompt(prompt).getResponse();
  }
};

export default HelpIntent;
