import { getIntentName, getRequestType } from "ask-sdk-core";
import commit from "../pet/commit";
import getLivingStatus from "../pet/getLivingStatus";

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

    const { isDead } = getLivingStatus(handlerInput.pet);

    const speechText = `${handlerInput.pet.name} ${isDead ? 'would say bye if they could' : 'says bye'}! Until next time, catch you later skater!`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export default CancelAndStopIntent;
