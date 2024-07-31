import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appIsPassed]',
  standalone: true,
  providers: [IsPassedDirective]
})
export class IsPassedDirective implements OnChanges{
  @Input() grade: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    if (this.grade > 65) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#00FF00');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ff4081');
    }
  }
}
