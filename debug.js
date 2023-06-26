const va = require("virtual-alexa");
const prompts = require("prompts");
const _defaultHandler = va.VirtualAlexa.Builder()
  .handler("./dist/index.js") // Lambda file
  .interactionModelFile("./skill-package/interactionModels/custom/en-AU.json") // Interaction file
  .locale("en-US")
  .create();


(async () => {
    await _defaultHandler.launch();
    await new Promise(resolve => setTimeout(resolve, 100));

    while (true) {
        console.log('started');
        const input = await prompts({ type: 'text', name: 'prompt', message: '>'}, { onCancel: () => {
            _defaultHandler.endSession();
            process.exit(0);
     } });

        try {
            const response = await _defaultHandler.utter(input.prompt);
            console.log('reply>', response.response.outputSpeech.ssml);
        } catch (error) {
            console.log('error>', error);
        }
    }
  })();
