import { Pet, InteractionType, Interaction } from "../types";
import { baseFrequencies, interactionBlockedFor } from "../utils/config";
import templateString from "../utils/template-string";
import petCleaned from "../assets/pet-cleaning.json";

export async function clean(pet: Pet): Promise<[Pet, string]> {
  const count = pet.interactions.CLEAN?.count || 0;
  const lastCleanInteractionDate =
    pet.interactions.CLEAN?.lastInteraction || null;

  if (!canCleanPet(lastCleanInteractionDate))
    return [pet, templateString(petCleaned.wait, { name: pet.name })];

  const updatedInteraction: Interaction = {
    count: count + 1,
    lastInteraction: new Date().toISOString(),
  };

  return [
    {
      ...pet,
      interactions: { ...pet.interactions, CLEAN: updatedInteraction },
    },
    templateString(petCleaned.cleaned, { name: pet.name }),
  ];
}

function canCleanPet(lastInteraction: string | null): boolean {
  if (lastInteraction == null) return true;

  const diff = (Date.now() - Date.parse(lastInteraction)) / 1000; // time difference in seconds
  const cooldown = baseFrequencies.CLEAN * interactionBlockedFor.CLEAN;

  return diff >= cooldown;
}
