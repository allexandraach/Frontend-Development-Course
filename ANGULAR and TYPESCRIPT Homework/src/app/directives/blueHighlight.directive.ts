import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[blueHighlight]'
})

export class blueHighlightDirective {

    constructor(private el: ElementRef) {
        el.nativeElement.style.background = 'blue';
    }
    
    }