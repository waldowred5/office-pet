import { getIntentName, getRequestType } from "ask-sdk-core";
import { clean } from "../pet/clean";
import templateString from "../utils/template-string";
import general from "../assets/general.json";

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
