const va = require('virtual-alexa');
const prompts = require('prompts');

const _defaultHandler = va.VirtualAlexa.Builder()
  .handler('./dist/index.js') // Lambda file
  .interactionModelFile('./skill-package/interactionModels/custom/en-AU.json') // Interaction file
  .locale('en-US')
  .create();

const { ALEXA_USER_ID, ALEXA_SESSION_ID } = process.env;

if (ALEXA_USER_ID) _defaultHandler.context()._user._id = ALEXA_USER_ID;
if (ALEXA_SESSION_ID) _defaultHandler.context()._session._id = ALEXA_SESSION_ID;

async function prompt() {
  const input = await prompts({
    type: 'text',
    name: 'prompt',
    message: '>'
  }, {
    onCancel: () => {
      _defaultHandler.endSession();
      process.exit(0);
    }
  });

  try {
    const response = await _defaultHandler.utter(input.prompt);
    console.log('reply>', response.response);
  } catch (error) {
    console.log('error>', error);
  }
}


(async () => {
  await _defaultHandler.launch().then(({ response }) => console.log(response));
  await new Promise(resolve => setTimeout(resolve, 100));

  while (true) {
    await prompt();
  }
})();
