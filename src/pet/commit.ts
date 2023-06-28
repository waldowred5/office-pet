import {Pet} from "../types";
import getDynamo, {PET_TABLE} from "../utils/dynamo";
import {PutCommand} from "@aws-sdk/lib-dynamodb";

export default async function commit(pet: Pet): Promise<void> {
  await getDynamo()
    .send(new PutCommand({TableName: PET_TABLE, Item: pet}));
}
