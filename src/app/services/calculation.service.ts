import { Injectable } from '@angular/core';

export type OperationType = '+' | '-' | '*' | '/' | '%' | null;

export const CALCULATOR_BUTTONS = [
  ['C', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

@Injectable({ providedIn: 'root' })
export class CalculationService {
  calculate(num1: number, num2: number, operation: OperationType): number {
    switch (operation) {
      case '+': 
        return num1 + num2;
      case '-': 
        return num1 - num2;
      case '*': 
        return num1 * num2;
      case '/': 
        return num2 !== 0 ? num1 / num2 : NaN;
      case '%':
        return num2 !== 0 ? num1 % num2 : NaN;
      default: 
        return num2;
    }
  }
}