import {InteractionType} from "../types";

export const AWS = {
  REGION: 'us-east-1',
}

export const weightFactors = {
  [InteractionType.FEED]: 0.6,
  [InteractionType.CLEAN]: 0.4
}

export const baseFrequencies = { // in seconds
  [InteractionType.FEED]: 24 * 60 * 60, // 1 day
  [InteractionType.CLEAN]: 2 * 24 * 60 * 60, // 2 day
}

const interactionBlockedFor = {
  [InteractionType.FEED]: .1, // 10% of 1 day = 144 minutes
  [InteractionType.CLEAN]:  .1, // 10% of 2 day = 288 minutes
}
