import {getRequestType} from "ask-sdk-core";

const LaunchIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { pet } = handlerInput;

    if (!pet) {
      return handlerInput.responseBuilder
        .speak('Welcome to Office Pet, adopt a pet to get started')
        .reprompt('Welcome to Office Pet, adopt a pet to get started')
        .getResponse();
    }

    // Note: if the pet has passed away, the user will still be asked to check up on the pet
    return handlerInput.responseBuilder
      .speak(`Welcome to Office Pet, ask me how ${pet.name} is doing`)
      .reprompt(`Welcome to Office Pet, ask me how ${pet.name} is doing`)
      .getResponse();
  }
};

export default LaunchIntent;
