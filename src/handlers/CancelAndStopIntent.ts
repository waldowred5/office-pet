import {getIntentName, getRequestType} from "ask-sdk-core";

const CancelAndStopIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Catch ya later skater!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Catch ya later skater in the title!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

export default CancelAndStopIntent;
