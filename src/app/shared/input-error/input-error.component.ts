import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent {
  @Input() control!: AbstractControl | any;
  @Input() formSubmitted: boolean = false;
  @Input() customMsg!: {
    required?: string,
    min?:string,
    max?:string,
    maxLength?:string,
    minLength?:string,
    pattern?:string,
  }

  get errors() {
    const errors = [];
    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key)) {
        errors.push(key);
      }
    }
    return errors;
  }

}
