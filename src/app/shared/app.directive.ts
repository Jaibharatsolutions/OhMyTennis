import { Directive, Input, forwardRef, Attribute, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[appDecimalNumberOnly]'
})
export class DecimalNumberOnlyDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d+(\.\d{0,2}){0,1}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d+$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[appNumberZeroGreater]'
})
export class NumberZeroGreaterDirective {

  constructor(private el: ElementRef) {
  }
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}

@Directive({
  selector: '[appIBMPhone]'
})
export class IBMPhoneDirective {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^[+-?0-9]*$/g);
  // private regex: RegExp = new RegExp(/^[+-?a-z?0-9]*$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[appCompare]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }
  ]
})
export class CompareValidatorDirective implements Validator {

  @Input('appCompare') controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? {'compare': true} : null;
  }
}

/**
 * This validator works like "required" but it does not allow whitespace either
 * NoWhitespaceDirective
 * {Validator}
 */
import { NoWhitespaceValidator } from './app.no-whitespace.validator';
@Directive({
  selector: '[appNoSpaces]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
      return this.valFn(control);
  }
}

