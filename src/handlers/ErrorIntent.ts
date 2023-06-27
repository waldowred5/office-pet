const ErrorIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error);
    const reprompt = 'Something went wrong, please try again';

    return handlerInput.responseBuilder
      .speak(reprompt)
      .reprompt(reprompt)
      .getResponse();
  }
};

export default ErrorIntent;
