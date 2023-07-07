import { getIntentName, getRequestType } from "ask-sdk-core";
import commit from "../pet/commit";

const CancelAndStopIntent = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  async handle(handlerInput) {
    if (!handlerInput.pet) {
      return handlerInput.responseBuilder
        .speak("See you next time!")
        .getResponse();
    }

    await commit(handlerInput.pet);

    const speechText = `${handlerInput.pet.name} says bye! Until next time, catch you later skater!`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export default CancelAndStopIntent;
