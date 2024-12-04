import { ValidatorFn } from '@angular/forms';

export function passValidator(
  pass: string,
  rePass: string
): ValidatorFn {
  return (control) => {
    const password = control.get(pass)?.value;
    const rePassword = control.get(rePass)?.value;
    const match = password === rePassword;
    return match ? null : { passValidator: true };
  };
}
