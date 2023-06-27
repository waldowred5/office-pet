import { getRequestType, getIntentName, SkillBuilders, getUserId } from 'ask-sdk-core';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from 'uuid';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamo = DynamoDBDocumentClient.from(client);
const PET_TABLE = 'office-pet_pets';
const INTERACTION_TABLE = 'office-pet_interactions';

async function getPet(handlerInput) {
  const userId = getUserId(handlerInput.requestEnvelope);

  const { Items } = await dynamo.send(
    new QueryCommand({
      TableName: PET_TABLE,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ":userId": userId },
      ScanIndexForward: false,
    })
  );

  const [latest] = Items || [];

  return latest;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const pet = await getPet(handlerInput);

    if (!pet) {
      return handlerInput.responseBuilder
        .speak('Welcome to Office Pet, adopt a pet to get started')
        .reprompt('Welcome to Office Pet, adopt a pet to get started')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(`Welcome to Office Pet, ask me how ${pet.name} is doing`)
      .reprompt(`Welcome to Office Pet, ask me how ${pet.name} is doing`)
      .getResponse();
  }
};

const CreatePetIntentHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'CreatePetIntent';
  },
  async handle(handlerInput) {

    const pet = await getPet(handlerInput);

    if (pet) {
      return handlerInput.responseBuilder
        .speak(`You've already got a pet, what's wrong with ${pet.name}`)
        .reprompt(`You've already got a pet, what's wrong with ${pet.name}`)
        .getResponse();
    }

    const userId = getUserId(handlerInput.requestEnvelope);
    const petName = 'Bob';

    await dynamo.send(
      new PutCommand({
        TableName: PET_TABLE,
        Item: {
          petId: uuid(),
          userId: userId,
          name: petName,
          adopted: new Date().toISOString(),
        },
      })
    );

    return handlerInput.responseBuilder
        .speak(`Congratulations! You have successfully adopted your new pet. Their name is ${petName}. Say hi to ${petName}`)
        .reprompt(`Say hi to ${petName}`)
        .getResponse();
  }
}

enum InteractionType {
  FEED = 'FEED',
  CLEAN = 'CLEAN',
}

const FeedPetIntentHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'FeedPetIntent';

     // TODO: prevent when no pet selected
  },
  async handle(handlerInput) {
    const pet = await getPet(handlerInput);

    if (!pet) {
      return handlerInput.responseBuilder
        .speak(`You don't have a pet, go adopt one`)
        .reprompt(`You don't have a pet, go adopt one`)
        .getResponse();
    }

    const { petId } = pet;

    await dynamo.send(
      new PutCommand({
        TableName: INTERACTION_TABLE,
        Item: {
          petId,
          interactionType: InteractionType.FEED,
          date: new Date().toISOString()
        },
      })
    );

    return handlerInput.responseBuilder
      .speak(``)
      .reprompt(``)
      .getResponse();
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me if it\'s daytime, that is it!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Wowza, I\'m a card title', speechText)
      .getResponse();
  }
};


const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Catch ya later skater!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Catch ya later skater in the title!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const reprompt = 'I\'m not quite sure, can you please repeat that?';

    return handlerInput.responseBuilder
      .speak(reprompt)
      .reprompt(reprompt)
      .getResponse();
  }
};

let skill;

export async function handler(event, context) {
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        CreatePetIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);

  console.log(response);

  return response;
}
