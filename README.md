1) What is the difference between var, let, and const?
answer: var=
            Scope: Function-scoped (if declared inside a function, only accessible there; otherwise, global).
            Hoisting: Hoisted to the top of its scope and initialized as undefined.
            Re-declaration: Can be re-declared and updated within the same scope.
        
        let=
            Scope: Block-scoped ({} → if, loop, function, etc.).
            Hoisting: Hoisted but not initialized (lives in the Temporal Dead Zone until declared).
            Re-declaration: Cannot be re-declared in the same scope, but can be updated.

        const=
            Scope: Block-scoped (like let).

            Hoisting: Hoisted but not initialized (also has Temporal Dead Zone).

            Re-declaration: Cannot be re-declared or updated in the same scope.

            Mutability: The variable itself can’t be reassigned, but objects/arrays inside can be

2) What is the difference between map(), forEach(), and filter()?
answer: map()

            Purpose: Creates a new array by applying a function to each element.
            Return: Returns a new array of the same length.
            Mutates original array?  No.

        forEach()

            Purpose: Executes a function for each array element.
            Return: Always undefined (doesn’t return a new array).
            Mutates original array? No (but you can modify elements manually inside).

        filter()

            Purpose: Creates a new array with elements that pass a test (condition).

            Return: Returns a new array (possibly shorter).

            Mutates original array? No.

3) What are arrow functions in ES6?
answer: Arrow functions are a new feature in ES6 that helps in writing functions smaller and simpler.
        #Key Points
        `=>` is used instead of `function` keyword 
        `return` is not required if it is one line (implicit return) 
        It does not have its own `this`, it takes `this` from the outer scope 
        It cannot be used as a constructor, and it does not have `arguments` object

4) How does destructuring assignment work in ES6?
answer: Destructuring is a shortcut syntax that allows you to easily extract values ​​from an array
        or object and pass them to a variable.
        # Array Destructuring
        js
        const numbers = [10, 20, 30];
        const [a, b, c] = numbers;
        console.log(a, b, c); // 10 20 30

5) Explain template literals in ES6. How are they different from string concatenation?
answer: Template Literals are a new string feature in ES6 that allows us to easily write strings and 
        add variables/expressions. 
        They are written with backtick (`` ` ``).

        # Key Features
            Multi-line string can be written
            Variables or expressions can be embedded using `${}`
            Much easier than string concatenation
        