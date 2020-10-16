import { Injectable } from '@angular/core';
@Injectable()
export class GlobalVar {
    deviceXs: boolean = false;
    deviceLg: boolean = false;
    deviceSm: boolean = false;
    deviceMd: boolean = false;
    token: string;
    bar: boolean = false
}
