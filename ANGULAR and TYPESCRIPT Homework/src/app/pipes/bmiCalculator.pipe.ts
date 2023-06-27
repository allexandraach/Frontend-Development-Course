import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'bmiCalculator'})

export class BmiCalculatorPipe implements PipeTransform {

    constructor(private decimalPipe: DecimalPipe) {

    }

    transform(weight: number, height: number): string | null {
       const bmi = weight / Math.pow(height, 2);
       return this.decimalPipe.transform(bmi, '1.1-1');
}}