import getLivingStatus from "../pet/getLivingStatus";

const ErrorIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log('Error:', error);
    const { pet } = handlerInput;
    const {isDead} = getLivingStatus(handlerInput.pet);

    const prompt = `Sorry I missed that, what would you like to do${pet && !isDead ? ` with ${pet.name}` : ''}?`;

    return handlerInput.responseBuilder
      .speak(prompt)
      .reprompt(prompt)
      .getResponse();
  }
};


export default ErrorIntent;
