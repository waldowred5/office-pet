import { InteractionType } from "../types";

export const AWS = {
  REGION: "us-east-1",
};

export const weightFactors = {
  [InteractionType.FEED]: 0.6,
  [InteractionType.CLEAN]: 0.4,
};

export const baseFrequencies = {
  // in seconds
  [InteractionType.FEED]: 24 * 60 * 60, // 1 day
  [InteractionType.CLEAN]: 2 * 24 * 60 * 60, // 2 day
};

export const interactionBlockedFor = {
  [InteractionType.FEED]: 0.1, // 10% of 1 day = 144 minutes
  [InteractionType.CLEAN]: 0.1, // 10% of 2 day = 288 minutes
};

export const expiresAfter = {
  [InteractionType.FEED]: 30 * 24 * 60 * 60, // 30 days
  [InteractionType.CLEAN]: 60 * 24 * 60 * 60, // 60 days
}
