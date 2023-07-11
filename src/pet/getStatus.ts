import {InteractionType, Pet, Status} from "../types";
import {baseFrequencies, weightFactors} from "../utils/config";
import templateString from "../utils/template-string";
import petStatus from "../assets/pet-status.json";

function calculateHunger(lastInteraction: Date): number {
    return calculate(lastInteraction, baseFrequencies[InteractionType.FEED]);
}

function calculateCleanliness(lastInteraction: Date): number {
    return calculate(lastInteraction, baseFrequencies[InteractionType.CLEAN]);
}

function calculate(lastInteraction: Date, baseFrequency: number): number {
    const currentTime = new Date();
    const timePassed = (currentTime.getTime() - lastInteraction.getTime()) / 1000;

    return normalizeValue((baseFrequency - timePassed) / baseFrequency);
}

function calculateOverallMood(hungerValue: number, cleanlinessValue: number): number {
    const normalizedHunger = normalizeValue(hungerValue);
    const normalizedCleanliness = normalizeValue(cleanlinessValue);

    return (normalizedHunger * weightFactors[InteractionType.FEED]) + (normalizedCleanliness * weightFactors[InteractionType.CLEAN]);
}

function normalizeValue(status: number): number {
    return Math.min(1, Math.max(0, status));
}

function mapStatus(statusValue: number): Status {
    if (statusValue >= 0.75) {
        return Status.POSITIVE;
    }
    else if (statusValue >= 0.3) {
        return Status.NEUTRAL;
    }
    else if (statusValue >= 0.01) {
        return Status.NEGATIVE;
    }
    else {
        return Status.CRITICAL;
    }
}

export async function getPetStatus(pet: Pet): Promise<String> {

    const lastFeedInteraction = pet.interactions[InteractionType.FEED];
    const lastCleanInteraction = pet.interactions[InteractionType.CLEAN];

    const hungerValue = calculateHunger(new Date(lastFeedInteraction?.lastInteraction || pet.adopted));
    const cleanlinessValue = calculateCleanliness(new Date(lastCleanInteraction?.lastInteraction || pet.adopted));
    const overallValue = calculateOverallMood(hungerValue, cleanlinessValue);

    const hungerStatus = mapStatus(hungerValue);
    const cleanlinessStatus = mapStatus(cleanlinessValue);
    const overallStatus = mapStatus(overallValue);

    const hungerStatusPhrase = templateString(petStatus.hungerStatus[hungerStatus][Math.ceil(Math.random() * petStatus.hungerStatus[hungerStatus].length - 1)], { name: pet.name });
    const cleanlinessStatusPhrase = templateString(petStatus.cleanlinessStatus[cleanlinessStatus][Math.ceil(Math.random() * petStatus.cleanlinessStatus[cleanlinessStatus].length - 1)], { name: pet.name });
    const overallStatusPhrase = templateString(petStatus.overallStatus[overallStatus][Math.ceil(Math.random() * petStatus.overallStatus[overallStatus].length - 1)], { name: pet.name });

    return `${overallStatusPhrase} ${hungerStatusPhrase} ${cleanlinessStatusPhrase}`;
}