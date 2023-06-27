import {Pet} from "../types";
import getDynamo, {PET_TABLE} from "../utils/dynamo";
import {QueryCommand} from "@aws-sdk/lib-dynamodb";

export default async function getMostRecentPetByUserId(userId: string): Promise<Pet> {
  if (!userId) throw new Error('Call load() first.');

  const {Items} = await getDynamo().send(
    new QueryCommand({
      TableName: PET_TABLE,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {":userId": userId},
      ScanIndexForward: false,
    })
  );

  const [latest] = Items || [];

  return latest as Pet;
}
