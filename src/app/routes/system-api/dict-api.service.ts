import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {environment} from '@env/environment';
import {ArrayService} from '@delon/util';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DictApiService {

    constructor(
        private http: _HttpClient,
        private arraySrv: ArrayService
    ) {
    }

    dictionary(code) {
        return this.http.get(environment.SERVER_URL + 'blade-system/dict/dictionary', {code}).pipe(
            map((item: any[]) => {
                item.sort((a, b) => {
                    return a.sort - b.sort;
                });
                return item;
            }),
        );
    }
}
