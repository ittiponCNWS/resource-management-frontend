import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
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

  public formControl: FormControl = new FormControl();

  constructor() {}
  ngOnInit(): void {}

  writeValue(value: any) {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }

  registerOnTouched(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }
}
