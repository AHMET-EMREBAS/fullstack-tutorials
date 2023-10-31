import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[tbSetAttributes]', standalone: true })
export class SetAttributeDirective implements OnInit {
  @Input() tbSetAttributes: Partial<HTMLInputElement> = {};
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    const entries = Object.entries(this.tbSetAttributes);

    for (const [key, value] of entries) {
      if (value != undefined) {
        this.elementRef.nativeElement.setAttribute(key, value + '');
      }
    }
  }
}
