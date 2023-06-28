import {getIntentName, getRequestType} from "ask-sdk-core";
import commit from "../pet/commit";

const CancelAndStopIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  async handle(handlerInput) {
    await commit(handlerInput.pet); // Save pet after session ends abnormally

    const speechText = 'Catch ya later skater!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Catch ya later skater in the title!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

export default CancelAndStopIntent;
