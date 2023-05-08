import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/*
he IsFiveDigitNumber decorator function takes an optional validationOptions object as an argument,
which is passed to the registerDecorator function. 
The registerDecorator function registers a new decorator with the name isFiveDigitNumber.
*/

export function IsFiveDigitNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({                      // The registered decorator uses an object's property and validates that it is a 5-digit number.
            name: 'isFiveDigitNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {  // alidate function takes two arguments: value and args. The value argument contains the value of the property being validated, and args contains the validation arguments.
                    if (!/^\d{5}$/.test(value)) {  // alidate function uses a regular expression to check whether the value of the property is a 5-digit number. If it's not, the function returns false
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
