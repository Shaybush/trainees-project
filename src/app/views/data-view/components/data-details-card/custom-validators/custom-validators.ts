import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function validYear(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Return null if there's no value, other validators will handle required check
    }

    const currentYear = new Date().getTime();
    const enteredYear = new Date(control.value).getTime();

    return enteredYear <= currentYear ? null : { invalidYear: { message: 'Year cannot be in the future' } };
  };
}
