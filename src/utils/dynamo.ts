import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { AWS } from "./config";



export const PET_TABLE = 'office-pet_pets';
let instance = null;

export default function getDynamo(): DynamoDBDocumentClient {
  if (!instance) {
    const client = new DynamoDBClient({ region: AWS.REGION });
    instance = DynamoDBDocumentClient.from(client);
  }

  return instance;
}
