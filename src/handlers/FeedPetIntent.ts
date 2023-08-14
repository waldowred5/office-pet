import {getIntentName, getRequestType} from "ask-sdk-core";
import {feed} from "../pet/feed";
import templateString from "../utils/templateString";
import general from "../assets/general.json";
import getLivingStatus from "../pet/getLivingStatus";

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

    const livingStatus = getLivingStatus(handlerInput.pet);

    if (livingStatus.isDead) {
      return handlerInput.responseBuilder
        .speak(livingStatus.message)
        .reprompt(general.newPetNeeded)
        .getResponse();
    }

    const petNameSlot = handlerInput.requestEnvelope.request.intent.slots.Name.value || "";

    if (petNameSlot && petNameSlot.toUpperCase() !== handlerInput.pet.name.toUpperCase()) {
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
