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
    await commit(handlerInput.pet); // Save pet after session ends abnormally
    return handlerInput.responseBuilder.getResponse();
  }
};

export default EndedIntent;
