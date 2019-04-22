import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') public isOpen: boolean = false;

// tslint:disable-next-line: no-unsafe-any
  @HostListener('click') public toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
