import {InteractionType, Pet} from "../types";

export async function feed(pet: Pet): Promise<Pet> {
  pet.interactions[InteractionType.FEED].lastInteraction = new Date().toISOString();
  return pet;
}
