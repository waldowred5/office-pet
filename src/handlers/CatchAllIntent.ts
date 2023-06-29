import {getIntentName, getRequestType} from "ask-sdk-core";
import getReplyCompletion from "../pet/getReplyCompletion";
import templateString from "../utils/template-string";
import general from '../assets/general.json';

const CatchAllIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'CatchAllIntent';
  },
  async handle(handlerInput) {
    const {pet} = handlerInput;

    if (!pet) {
      return handlerInput.responseBuilder
        .speak('Sorry I missed that, what would you like to do?')
        .reprompt('Sorry I missed that, what would you like to do?')
        .getResponse();
    }

    const phrase = handlerInput.requestEnvelope.request.intent.slots.phrase.value;

    const completion = await getReplyCompletion(pet, phrase);

    return handlerInput.responseBuilder
      .speak(completion)
      .reprompt(templateString(general.promptForAction, {name: pet.name}))
      .getResponse();
  }

};

export default CatchAllIntent;
