import {getIntentName, getRequestType} from "ask-sdk-core";
import {feed} from "../pet/feed";
import templateString from "../utils/template-string";
import general from "../assets/general.json";

const FeedPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'FeedPetIntent';
  },
  async handle(handlerInput) {
    if (!handlerInput.pet) {
      return handlerInput.responseBuilder
        .speak(general.noPet)
        .reprompt(general.noPet)
        .getResponse();
    }

    const petNameSlot = handlerInput.requestEnvelope.request.intent.slots.Name.value || "";

    if (petNameSlot && petNameSlot != handlerInput.pet.name) {
      return handlerInput.responseBuilder
        .speak(
          templateString(general.wrongPet, { name: petNameSlot })
        )
        .reprompt(
          templateString(general.promptForAction, { name: handlerInput.pet.name })
        )
        .getResponse();
    }

    const [pet, phrase] = await feed(handlerInput.pet);

    handlerInput.pet = pet;

    return handlerInput.responseBuilder
      .speak(phrase)
      .reprompt(
        templateString(general.promptForAction, { name: handlerInput.pet.name })
      )
      .getResponse();
  }
}

export default FeedPetIntent;
