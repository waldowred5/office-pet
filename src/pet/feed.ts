import {Pet} from "../types";

export async function feed(pet: Pet): Promise<void> {
  throw new Error('feed not implemented');
}
