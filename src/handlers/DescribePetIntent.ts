import {getIntentName, getRequestType} from "ask-sdk-core";
import templateString from "../utils/template-string";
import {describe} from "../pet/describe";
import general from '../assets/general.json';

const DescribePetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'DescribePetIntent';
  },
  async handle(handlerInput) {
    if (!handlerInput.pet) {
      return handlerInput.responseBuilder
        .speak(general.noPet)
        .reprompt(general.noPet)
        .getResponse();
    }

    const phrase = describe(handlerInput.pet);

    return handlerInput.responseBuilder
      .speak(phrase)
      .reprompt(templateString(general.promptForAction, {name: handlerInput.pet.name }))
      .getResponse();
  }
}

export default DescribePetIntent;
