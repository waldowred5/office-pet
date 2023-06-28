import { SkillBuilders } from 'ask-sdk-core';
import {PetRequestInterceptor, PetResponseInterceptor} from "./interceptors/PetInterceptor";
import CancelAndStopIntent from "./handlers/CancelAndStopIntent";
import CleanPetIntent from "./handlers/CleanPetIntent";
import AdoptPetIntent from "./handlers/AdoptPetIntent";
import EndedIntent from "./handlers/EndedIntent";
import ErrorIntent from "./handlers/ErrorIntent";
import FeedPetIntent from "./handlers/FeedPetIntent";
import GreetPetIntent from "./handlers/GreetPetIntent";
import HelpIntent from "./handlers/HelpIntent";
import LaunchIntent from "./handlers/LaunchIntent";
import PetStatusIntent from "./handlers/PetStatusIntent";
import DescribePetIntent from "./handlers/DescribePetIntent";

let skill;

export async function handler(event, context) {
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        LaunchIntent, // Called on start up
        AdoptPetIntent,
        FeedPetIntent,
        HelpIntent,
        CancelAndStopIntent,
        CleanPetIntent,
        GreetPetIntent,
        DescribePetIntent,
        PetStatusIntent,
        EndedIntent, // clean up function
      )
      .addRequestInterceptors(PetRequestInterceptor)
      .addResponseInterceptors(PetResponseInterceptor)
      .addErrorHandlers(ErrorIntent)

      .create();
  }

  return await skill.invoke(event, context);
}
