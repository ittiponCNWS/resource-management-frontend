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
      this.showErrorMessage('This field is required.');
    } else {
      this.removeErrorMessage();
    }
  }

  private showErrorMessage(message: string) {
    if (this.errorMessageEl) return;

    this.errorMessageEl = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorMessageEl, 'color', 'red');
    this.renderer.setStyle(this.errorMessageEl, 'fontSize', '0.8em');
    this.renderer.setStyle(this.errorMessageEl, 'marginTop', '4px');
    this.renderer.setProperty(this.errorMessageEl, 'innerText', message);

    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.appendChild(parent, this.errorMessageEl);
  }

  private removeErrorMessage() {
    if (this.errorMessageEl) {
      const parent = this.renderer.parentNode(this.el.nativeElement);
      this.renderer.removeChild(parent, this.errorMessageEl);
      this.errorMessageEl = null;
    }
  }
}
