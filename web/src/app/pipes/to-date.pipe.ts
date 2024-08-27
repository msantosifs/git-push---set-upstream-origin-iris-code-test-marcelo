import { Pipe, PipeTransform } from '@angular/core';

/**
 * Angular pipe that takes an input of any datatype and checks if it can be parsed to a Date object.
 * If the input value can be parsed to a Date object, it transforms the input into a Date.
 * Otherwise, the pipe returns the original input value.
 *
 * Usage:
 *   value | toDate
 *
 * Example:
 *   {{ '2024-01-01' | toDate }}
 *   formats to: Tue Jan 01 2024 00:00:00 GMT-0500
 *
 *   {{ 'randomString' | toDate }}
 *   formats to: randomString
 */
@Pipe({
    name: 'toDate',
    standalone: true
})
export class ToDatePipe implements PipeTransform {
    transform(value: any): Date | any {
        if(value && (value instanceof Date || !isNaN(Date.parse(value)))) {
            return new Date(value);
        }
        return value;
    }
}
