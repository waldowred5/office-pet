import {InteractionType, Pet, PetStatus, Status} from "../types";
import {baseFrequencies, weightFactors} from "../utils/config";

function calculateHungerStatus(lastInteraction: Date): number {
    return calculateStatus(lastInteraction, baseFrequencies[InteractionType.FEED]);
}

function calculateCleanlinessStatus(lastInteraction: Date): number {
    return calculateStatus(lastInteraction, baseFrequencies[InteractionType.CLEAN]);
}

function calculateStatus(lastInteraction: Date, baseFrequency: number): number {
    const currentTime = new Date();
    const timePassed = (currentTime.getTime() - lastInteraction.getTime()) / 1000;

    return normalizeStatus((baseFrequency - timePassed) / baseFrequency);
}

function calculateOverallStatus(hungerStatus: number, cleanlinessStatus: number): number {
    const normalizedHunger = normalizeStatus(hungerStatus);
    const normalizedCleanliness = normalizeStatus(cleanlinessStatus);

    return (normalizedHunger * weightFactors[InteractionType.FEED]) + (normalizedCleanliness * weightFactors[InteractionType.CLEAN]);
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

function normalizeStatus(status: number): number {
    return Math.min(1, Math.max(0, status));
}


export async function getPetStatus(pet: Pet): Promise<PetStatus> {

    const lastFeedInteraction = pet.interactions[InteractionType.FEED];
    const lastCleanInteraction = pet.interactions[InteractionType.CLEAN];

    const hungerStatus = calculateHungerStatus(new Date(lastFeedInteraction?.lastInteraction || pet.adopted));
    const cleanlinessStatus = calculateCleanlinessStatus(new Date(lastCleanInteraction?.lastInteraction || pet.adopted));
    const overallStatus = calculateOverallStatus(hungerStatus, cleanlinessStatus);

    return {
        hunger: mapStatus(hungerStatus),
        cleanliness: mapStatus(cleanlinessStatus),
        overall: mapStatus(overallStatus)
    }
}