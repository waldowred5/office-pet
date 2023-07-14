import { Pet, InteractionType, Interaction } from "../types";
import { baseFrequencies, interactionBlockedFor } from "../utils/config";
import templateString from "../utils/template-string";
import petFed from "../assets/pet-feeding.json";

export async function feed(pet: Pet): Promise<[Pet, string]> {
  const count = pet.interactions.FEED?.count || 0;
  const lastCleanInteractionDate =
    pet.interactions.FEED?.lastInteraction || null;

  if (!canFeedPet(lastCleanInteractionDate))
    return [pet, templateString(petFed.wait, { name: pet.name })];

  const updatedInteraction: Interaction = {
    count: count + 1,
    lastInteraction: new Date().toISOString(),
  };

  return [
    {
      ...pet,
      interactions: { ...pet.interactions, [InteractionType.FEED]: updatedInteraction },
    },
    templateString(petFed.fed, { name: pet.name }),
  ];
}

function canFeedPet(lastInteraction: string | null): boolean {
  if (lastInteraction == null) return true;

  const diff = (Date.now() - Date.parse(lastInteraction)) / 1000; // time difference in seconds
  const cooldown = baseFrequencies.FEED * interactionBlockedFor.FEED;

  return diff >= cooldown;
}
