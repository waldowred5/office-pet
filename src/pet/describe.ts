import {Pet, Status} from "../types";
import petAttributes from '../assets/pet-attributes.json';
import templateString from "../utils/template-string";

export function describe(pet: Pet): string {
  const attributes = Object.entries(pet.attributes);
  const [key, value] = attributes[Math.floor(Math.random() * attributes.length)];
  const description = petAttributes[key].find((attribute) => attribute.short === value).long;

  return templateString(templateString(description, { name: pet.name }));
}
