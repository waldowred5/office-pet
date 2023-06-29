const ErrorIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log('Error:', error);
    const { pet } = handlerInput;
    const prompt = `Sorry I missed that, what would you like to do${pet ? ` with ${pet.name}` : ''}?`;

    return handlerInput.responseBuilder
      .speak(prompt)
      .getResponse();
  }
};


export default ErrorIntent;
