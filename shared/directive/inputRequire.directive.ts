import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  Optional,
  HostListener,
  Self,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputRequire]',
})
export class InputRequireDirective implements OnInit {
  @Input() fieldName: string = 'This field'; // Default fallback
  @Input('appInputRequire') formControl!: AbstractControl;

  private errorMessageEl: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() @Self() private control: NgControl
  ) {}

  ngOnInit() {
    if (!this.formControl) return;

    const formControl = this.formControl;

    // Watch for value or status changes
    formControl.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });

    formControl.valueChanges.subscribe(() => {
      this.updateErrorMessage();
    });

    setTimeout(() => this.updateErrorMessage());
  }

  private updateErrorMessage() {
    const control = this.formControl;
    if (!control) return;

    const hasError =
      control.invalid &&
      control.errors?.['required'] &&
      (control.dirty || control.touched);

    if (hasError) {
      this.showErrorMessage(`${this.fieldName} is required.`);
    } else {
      this.removeErrorMessage();
    }
  }

  private showErrorMessage(message: string) {
    if (this.errorMessageEl) return;

    const wrapper = this.renderer.createElement('div');
    this.renderer.setStyle(wrapper, 'position', 'relative');
    this.renderer.setStyle(wrapper, 'display', 'inline-block');
    this.renderer.setStyle(wrapper, 'width', '100%');

    // ย้าย input เข้า wrapper
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.insertBefore(parent, wrapper, this.el.nativeElement);
    this.renderer.removeChild(parent, this.el.nativeElement);
    this.renderer.appendChild(wrapper, this.el.nativeElement);

    // สร้าง error message
    this.errorMessageEl = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorMessageEl, 'color', 'red');
    this.renderer.setStyle(this.errorMessageEl, 'fontSize', '0.8em');
    this.renderer.setStyle(this.errorMessageEl, 'position', 'absolute');
    this.renderer.setStyle(this.errorMessageEl, 'left', '0');
    this.renderer.setStyle(this.errorMessageEl, 'bottom', '-1.2em');
    this.renderer.setProperty(this.errorMessageEl, 'innerText', message);

    // เพิ่ม error message เข้า wrapper
    this.renderer.appendChild(wrapper, this.errorMessageEl);
  }

  private removeErrorMessage() {
    if (this.errorMessageEl) {
      const parent = this.renderer.parentNode(this.el.nativeElement);
      this.renderer.removeChild(parent, this.errorMessageEl);
      this.errorMessageEl = null;
    }
  }
}
