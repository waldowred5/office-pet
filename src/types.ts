export enum InteractionType {
  FEED = 'FEED',
  CLEAN = 'CLEAN',
}

export enum Status {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
  CRITICAL = 'CRITICAL'
}

export type Interaction = {
  count: number;
  lastInteraction: string;
}

export type PetAttributes = {
  color: string;
  origin: string;
  shape: string;
  size: string;
  temperament: string;
}

export type Pet = {
  petId: string;
  userId: string;
  name: string;
  adopted: string;
  attributes: PetAttributes;
  interactions: {
    [InteractionType.FEED]: Interaction;
    [InteractionType.CLEAN]: Interaction;
  }
}

export type PetStatus = {
  hunger: Status;
  cleanliness: Status;
  overall: Status;
}
