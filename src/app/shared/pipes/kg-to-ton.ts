import { Pipe, PipeTransform } from '@angular/core';
import {kg2ton} from '../utils/numUtils';

@Pipe({
    name: 'kg2ton',
})
export class KgTransformTon implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return kg2ton(value);
    }

}
