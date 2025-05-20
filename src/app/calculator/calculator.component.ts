import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';
import { CalculationService, CALCULATOR_BUTTONS } from '../services/calculation.service';
import { type OperationType } from '../services/calculation.service';

@Component({
  selector: 'app-calculator',
  imports: [CardComponent, ButtonComponent, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})

export class CalculatorComponent {
  buttons = CALCULATOR_BUTTONS;
  functionValue = signal('');
  displayValue = signal('0');
  private currentInputValue = signal(0);
  private previousInputValue = signal<number | null>(null);
  private currentOperation = signal<OperationType>(null);
  private isNewInput = signal(true);

  constructor(private calcService: CalculationService) {}

  handleClick(label: string) {
    if ((label >= '0' && label <= '9') || label === '.') {
      return this.onDigitClick(label);
    }
    if (['+', '-', '*', '/', '%'].includes(label)) {
      this.functionValue.set(label);
      return this.onClickOperation(label as OperationType);
    }
    if (label === 'C') {
      this.functionValue.set('');
      return this.onClear();
    }
    if (label === '=') {
      this.functionValue.set('=');
      return this.onClickEquals();
    }
  }

  onDigitClick(digit: string) {
    const currentDisplayedText = this.displayValue();
    const startingNew = this.isNewInput();

    // We check if the current digit is . because we have to prevent more than one .
    if (digit === '.' && currentDisplayedText.includes('.') && !startingNew) {
      return;
    }

    // Handle the case where we are starting new input after an operation or 0.sth
    let updated: string;
    if (startingNew || currentDisplayedText === '0') {
      updated = digit === '.' ? '0.' : digit;
    } else {
      updated = currentDisplayedText + digit;
    }

    const formattedDisplay =
    updated.replace('.', '').length > 12 ? parseFloat(updated).toExponential(4) : updated;

    this.displayValue.set(formattedDisplay);
    this.currentInputValue.set(parseFloat(updated));
    this.isNewInput.set(false);
  }

  onClickOperation(operation: OperationType) {
    // Executed when pressing an operation - check if we have previous inpouted value and if we have a current one
    if (this.previousInputValue() !== null && !this.isNewInput()) {
      this.compute();
    }
    // Now we store the result in the previous value so we can continue
    this.previousInputValue.set(this.currentInputValue());
    this.currentOperation.set(operation);
    this.isNewInput.set(true);
  }

  onClickEquals() {
    // We have to check if we have an operation and previous value first
    if (this.currentOperation() && this.previousInputValue() !== null) {
      this.compute();
      this.currentOperation.set(null);
      this.previousInputValue.set(null);
      this.isNewInput.set(true);
    }
  }

  onClear() {
    this.displayValue.set('0');
    this.functionValue.set('');
    this.currentInputValue.set(0);
    this.previousInputValue.set(null);
    this.currentOperation.set(null);
    this.isNewInput.set(true);
  }

  private compute() {
    const result = this.calcService.calculate(this.previousInputValue()!, this.currentInputValue(), this.currentOperation());

    let output = Number(result.toFixed(6)).toString();
    if (output.length > 12) {
    output = Number(result).toExponential(4);
    }

    this.displayValue.set(output);
    this.currentInputValue.set(Number(output));
  }

  getButtonClass(label: string): string {
    return label === 'C' || label === '=' ? 'double-span' : '';
  }
}
