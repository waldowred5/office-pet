import {Pet, Status} from "../types";
import petGreetings from '../assets/pet-greetings.json';
import templateString from "../utils/template-string";

export function greet(pet: Pet): string {
  const status = Status.POSITIVE;

  return templateString(petGreetings[status][Math.ceil(Math.random() * petGreetings[status].length - 1)], { name: pet.name });
}
