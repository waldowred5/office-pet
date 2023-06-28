import {Pet} from "../types";
import {v4 as uuid} from "uuid";
import getDynamo, {PET_TABLE} from "../utils/dynamo";
import {PutCommand} from "@aws-sdk/lib-dynamodb";

export default async function create(userId: string): Promise<Pet> {
  const petName = 'Bob';

  const pet: Pet = {
    petId: uuid(),
    userId: userId,
    name: petName,
    adopted: new Date().toISOString(),
  };

  return pet;
}
