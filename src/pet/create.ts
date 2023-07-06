import {InteractionType, Pet, PetAttributes} from "../types";
import {v4 as uuid} from "uuid";
import petAttributes from '../assets/pet-attributes.json';
import petNames from '../assets/pet-names.json';

function generateAttributes(): PetAttributes {
  const getRandom = (list) => list[Math.ceil(Math.random() * list.length - 1)]; // Note: skips first as it is the fallback value

  return {
    color: getRandom(petAttributes.color).short,
    origin: getRandom(petAttributes.origin).short,
    shape: getRandom(petAttributes.shape).short,
    size: getRandom(petAttributes.size).short,
    temperament: getRandom(petAttributes.temperament).short,
  }
}

export default async function create(userId: string): Promise<Pet> {
  return {
    petId: uuid(),
    userId: userId,
    name: petNames[Math.ceil(Math.random() * petNames.length)],
    adopted: new Date().toISOString(),
    attributes: generateAttributes(),
    interactions: {
      [InteractionType.FEED]: {
        count: 0,
        lastInteraction: null,
        allFeedInteractions: {}
      },
      [InteractionType.CLEAN]: {
        count: 0,
        lastInteraction: null
      }
    }
  };
}
