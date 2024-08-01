import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appIsPassed]',
  standalone: true,
})
export class IsPassedDirective implements OnChanges{
  @Input('appIsPassed') grade: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    if (this.grade > 65) {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#00FF00');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#ff4081');
    }
  }
}
