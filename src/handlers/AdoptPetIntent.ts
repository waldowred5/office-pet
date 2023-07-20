import {getIntentName, getRequestType, getUserId} from "ask-sdk-core";
import create from "../pet/create";
import getLivingStatus from "../pet/getLivingStatus";

const AdoptPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'AdoptPetIntent';
  },
  async handle(handlerInput) {
    const livingStatus = getLivingStatus(handlerInput.pet);

    if (!!handlerInput.pet && !livingStatus.isDead) {
      return handlerInput.responseBuilder
        .speak(`You've already got a pet, what's wrong with ${handlerInput.pet.name}`)
        .reprompt(`You've already got a pet, what's wrong with ${handlerInput.pet.name}`)
        .getResponse();
    }

    const userId = getUserId(handlerInput.requestEnvelope);
    handlerInput.pet  = await create(userId);

    return handlerInput.responseBuilder
      .speak(`Congratulations! You have successfully adopted your new pet. Their name is ${handlerInput.pet.name}. Say hi to ${handlerInput.pet.name}`)
      .reprompt(`Say hi to ${handlerInput.pet.name}`)
      .getResponse();
  }
}

export default AdoptPetIntent;
