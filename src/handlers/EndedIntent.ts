import {getRequestType} from "ask-sdk-core";
import commit from "../pet/commit";

/**
 * abnormally ended intent
 */
const EndedIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  async handle(handlerInput) {
    if (handlerInput.pet) await commit(handlerInput.pet); // Save pet after session ends abnormally
    return handlerInput.responseBuilder
      .withShouldEndSession(true)
      .getResponse();
  }
};

export default EndedIntent;
