import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [],
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
  ngOnInit() {}

  @Input({ required: true }) inputType!:
    | 'Text'
    | 'Number'
    | 'Date'
    | 'Dropdown'
    | 'Switch';
  @Input({ required: true }) fieldName!: string;
  @Input({ required: true }) formControlName!: string;
  @Input() inputClass: string = '';
  @Input() dropdownOption: any[] = [];
  @Input() optionValue: string = 'value';
  @Input() optionName: string = 'label';
  private onValidatorChange: () => void = () => {};
  private _onValidate:
    | ((control: AbstractControl) => ValidationErrors | null)
    | null = null;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  get getControl() {
    return this.ngControl.control;
  }

  value: any;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ✅ Called by Angular when parent provides validator
  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // ✅ This allows parent validators to work
  validate(control: AbstractControl): ValidationErrors | null {
    if (this._onValidate) {
      return this._onValidate(control);
    }
    return null;
  }

  // ✅ Called automatically by Angular’s forms
  setValidator(fn: (control: AbstractControl) => ValidationErrors | null) {
    this._onValidate = fn;
    this.onValidatorChange(); // trigger validator update
  }

  onInput(event: any) {
    console.log(this.ngControl.control);
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
