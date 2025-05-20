# NgCalculator
Angular CLI version 19.1.0.

## Installation Guide
- Node.js setup (Project requires Node.js version > 18)

- Install project dependencies using npm: 
```
npm install
```

- Start project locally: 
```
npm start
```

## Structure Decisions
The project follows Angular's good practice of keeping components and their classes as lean as possible. 
The code is split into reusable components and shared services that manage data. 
The app has the following hierarchy: /shared, /calculator, /services - this makes it easy to scale, extend and reuse components.

### Standalone components
The project uses standalone components which Angular 19 by default makes standalone - this simplifies and improves reusability.
### Shared components
Reusable UI components like CardComponent and ButtonComponent are both reusable standalone components placed in the /shared folder.
Each component encapsualtes own logic and styling. This makes the code clean, scalable and easy to maintain. 
### Routing 
The root path ('/') redirects to /calculator. The /calculator route loads the CaclulatorComponent.


## Assumptions Made
- The app is developed accordingly to the native Windows calculator.
- An operator value is displayed in the top right corner to show the currently selected operation.
- Input's lenght: numbers that exceed 12 characters (including digits and the decimal point) are displayed with scientific notation.
- The calculator supporst addition, subtraction, multiplication, division and modulo operations.
- The result of calculations is rounded to 6 decimal places.


## How Algorithms work
### Service Logic
The CalculationService handles mathematical calculations. The service is injected into the CalculatorComponent with Angular’s dependency injection. It has a calculate() method that expects 3 arguments: two numbers and operation from predefined Operation types.
The method performs the calculations and returns a result, in cases like division by 0, the method returns NaN.
### Component Logic
- the handleClick function helps to determine the type of button pressed - digit, operation or equals. It routes to different functions based on the button type.
- onDigitClick() handles number formatting, prevents more than one decimal points (Also handles the case when decimal point is inputted first by appending a 0) Also checks if input exceeds 12 characters and uses scientific notation if so.
- Core functionality of the program is to store values in previousInputValue, currentInpuValue and currentOperation. After a calculation is performed, the result is stored as the previous value, and the system waits for new input.
- onClickEquals() operation completes the current operation by calling compute(), then resets currentOperation and previousInputValue.
- onClear() resets the states of all core values used.
- onClickOperation() is invoked when the user presses and operation. It stores the current value in previousInputValue and changes the flag that tracks if the user starts inputting a new number.
- I have decided to use signals to track state since they are better for simpler, immediate UI updates, while Observables are way better when we fetch from API or we have asynchronous actions. 
- compute() method is private because it is used only within the CalculatorComponent class


## Edge Cases Handling
- The buttons are defined in an array in the service and rendered with @for in the html inside a grid layout with 4 columns where each button gets equal fraction of the available space. (Buttons like clear and equal are twice the size of all other buttons).
- The app prevents division and modulo by zero (it returns NaN).
- The logic prevents inputting multiple decimal points and also adds leading zero if user presses the decimal point first.
- Numbers that exceed 12 characters (including digits and the decimal point) are displayed with scientific notation.
- The UI components are responsive and adapt to different screen sizes.

