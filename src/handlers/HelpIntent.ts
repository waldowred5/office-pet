import {getIntentName, getRequestType} from "ask-sdk-core";

const HelpIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me if it\'s daytime, that is it!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Wowza, I\'m a card title', speechText)
      .getResponse();
  }
};

export default HelpIntent;
