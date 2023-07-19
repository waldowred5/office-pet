import {InteractionType, Pet} from "../types";
import {expiresAfter} from "../utils/config";
import petDeath from '../assets/pet-death.json';
import general from "../assets/general.json";
import templateString from "../utils/templateString";

function getPseudoRandomNumber(isBelow: number, { seed, dayOfDeath }: { seed: string, dayOfDeath: number }): number {
  const nameValue = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const raw = (Math.sin(nameValue * dayOfDeath) + 1) * 10000;
  return Math.floor(raw) % isBelow;
}

type LivingStatus = {
  isDead: boolean;
  causeOfDeath?: InteractionType;
  message?: string;
};

/**
 * Returns isAlive status and optional cause of death
 * cause of death is the greatest gap from the expireAfter time
 */
export default function getLivingStatus(pet: Pet): LivingStatus {
  if (!pet) return { isDead: false };

  const currentTime = Date.now();

  let earliestDeathDay = null;
  let earliestDeathType = null;

  for (const type of Object.keys(expiresAfter)) {
    const lastInteraction = new Date(pet.interactions[type]?.lastInteraction || pet.adopted);
    const timePassed = (currentTime - lastInteraction.getTime());

    if (timePassed > expiresAfter[type] || Number.isNaN(lastInteraction)) {

      const lastDay = lastInteraction.getTime() + expiresAfter[type];
      if (earliestDeathDay === null || lastDay < earliestDeathDay) {
        earliestDeathDay = lastDay;
        earliestDeathType = type;
      }
    }
  }

  if (!earliestDeathType) {
    return { isDead: false };
  }

  const messageIndex = getPseudoRandomNumber(petDeath[earliestDeathType].length, { seed: pet.name, dayOfDeath: earliestDeathDay });

  return {
    isDead: true,
    causeOfDeath: earliestDeathType,
    message: `${templateString(petDeath[earliestDeathType][messageIndex] || general.deadPet, { name: pet.name })} ${general.newPetNeeded}`,
  };
}

