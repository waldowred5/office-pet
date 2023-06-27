import {getUserId} from "ask-sdk-core";
import {Pet} from "../types";
import getMostRecentPetByUserId from "../pet/getMostRecentPetByUserId";

/**
 * Attach instance of Pet to handlerInput from session or new
 */
export const PetRequestInterceptor = {
  async process(handlerInput): Promise<void> {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    if (!sessionAttributes.pet) {
      sessionAttributes.pet = await getMostRecentPetByUserId(getUserId(handlerInput.requestEnvelope));
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    }

    handlerInput.pet = sessionAttributes.pet as Pet;
  }
};

/**
 * Save any pet changes to session
 */
export const PetResponseInterceptor = {
  async process(handlerInput): Promise<void> {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.pet = handlerInput.pet;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  }
}
