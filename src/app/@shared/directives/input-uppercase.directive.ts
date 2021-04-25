import {
  A,
  Z,
} from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[inputUppercase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUppercaseDirective),
      multi: true,
    },
  ],
})
export class InputUppercaseDirective implements ControlValueAccessor {

  _onChange: (_: any) => void;
  _touched: () => void;

  constructor(
    @Self() private element: ElementRef,
    private _renderer: Renderer2
  ) { }

  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const key = event.key;

    if (keyCode >= A && keyCode <= Z) {
      const value = this.element.nativeElement.value.toUpperCase();
      this._renderer.setProperty(this.element.nativeElement, 'value', value);
      this._onChange(value);
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this._touched();
  }

  /** Implementation for ControlValueAccessor interface */
  writeValue(value: any): void {
    this._renderer.setProperty(this.element.nativeElement, 'value', value);
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
  }
}
