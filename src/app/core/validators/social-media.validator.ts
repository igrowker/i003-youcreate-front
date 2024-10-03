import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function selectSocialMedia(): ValidatorFn{
  return ( control: AbstractControl): ValidationErrors | null =>{
    const youtube = control.get('youtube')?.value;
    const twitch = control.get('twitch')?.value;

    //Verifica si al menos uno de los checkbox estan activados
    if(!youtube && !twitch){
      return { noSocialMediaSelected: true };
    }
    return null;
  };
}