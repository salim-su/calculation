export class MyJsonUtils {


    static parse(text) {
        return JSON.parse(text, (k, v) => {
            if (typeof v === 'number' && v > Number.MAX_SAFE_INTEGER) {
                const key = '"' + k + '":';
                const start = text.indexOf(key) + key.length;
                const end = v.toString().length;
                return text.substr(start, end).toString();
            }
            return v;
        });
    }
}

