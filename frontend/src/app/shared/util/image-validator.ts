import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const imageUrl = control.value as string;

        if (Validators.required(control) !== null) {
            return null;
        }

        const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;

        if (!imageUrlPattern.test(imageUrl)) {
            return { 'invalidImageUrl': true };
        }

        return null;
    };
}
