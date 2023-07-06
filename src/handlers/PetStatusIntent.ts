import {getIntentName, getRequestType} from "ask-sdk-core";
import {getPetStatus} from "../pet/getStatus";

const PetStatusIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'PetStatusIntent';
  },
  async handle(handlerInput) {
    const { pet } = handlerInput;

    if (!pet) {
      return handlerInput.responseBuilder
        .speak(`You don't have a pet, go adopt one`)
        .reprompt(`You don't have a pet, go adopt one`)
        .getResponse();
    }

    const petStatus = await getPetStatus(pet);

    return handlerInput.responseBuilder
      .speak(`Overall status: ${petStatus.overall}. Cleanliness status: ${petStatus.cleanliness}. Hunger status: ${petStatus.hunger}`)
      .reprompt(`Overall status: ${petStatus.overall}. Cleanliness status: ${petStatus.cleanliness}. Hunger status: ${petStatus.hunger}`)
      .getResponse();
  }
}

export default PetStatusIntent;
