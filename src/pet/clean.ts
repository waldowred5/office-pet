import {InteractionType, Pet} from "../types";

export async function clean(pet: Pet): Promise<Pet> {
    pet.interactions[InteractionType.CLEAN].lastInteraction = new Date().toISOString();
    return pet;
}
