export enum InteractionType {
  FEED = 'FEED',
  CLEAN = 'CLEAN',
}

export type Interaction = {
  count: number;
  lastInteraction: string;
}

export type Pet = {
  petId: string;
  userId: string;
  name: string;
  adopted: string;
  [InteractionType.FEED]?: Interaction;
  [InteractionType.CLEAN]?: Interaction;
}

