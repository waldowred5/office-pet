import { getIntentName, getRequestType } from "ask-sdk-core";
import { clean } from "../pet/clean";
import templateString from "../utils/templateString";
import general from "../assets/general.json";
import getLivingStatus from "../pet/getLivingStatus";

const CleanPetIntent = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "CleanPetIntent"
    );
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

    const [pet, phrase] = await clean(handlerInput.pet);
    handlerInput.pet = pet;

    return handlerInput.responseBuilder
      .speak(phrase)
      .reprompt(
        templateString(general.promptForAction, { name: handlerInput.pet.name })
      )
      .getResponse();
  },
};

export default CleanPetIntent;
