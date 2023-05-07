import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[redHighlight]'
})

export class redHighlightDirective {

constructor(private el: ElementRef) {
    el.nativeElement.style.background = 'red';
}

}