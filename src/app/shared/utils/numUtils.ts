export function kg2ton(num): string {
    const res = [];
    if (num) {
        const ton = parseInt(num) / 1000;
        const toFixed = ton.toFixed(2);
        const split = toFixed.split('.');

        const intStr = split[0].split('');

        let index = 0;
        for (let i = 0; i < intStr.length; i++) {
            res.unshift(intStr[intStr.length - i - 1]);
            index++;
            if (index % 3 === 0 && index !== intStr.length) {
                res.unshift(',');
            }
        }

        res.push('.');
        res.push(split[1]);
    }
    return res.join('');
}

export function thousand(num): string {
    const res = [];
    if (num || num === 0) {
        const numStr = num.toString();
        let intStr = num.toString();
        let decimalsStr = '';
        if (numStr.indexOf('.') >= 0) {
            const split = intStr.split('.');
            intStr = split[0];
            decimalsStr = split[1];
        }

        const intStrSplit = intStr.split('');

        let index = 0;
        for (let i = 0; i < intStrSplit.length; i++) {
            res.unshift(intStrSplit[intStrSplit.length - i - 1]);
            index++;
            if (index % 3 === 0 && index !== intStrSplit.length) {
                res.unshift(',');
            }
        }

        if (numStr.indexOf('.') >= 0) {
            res.push('.');
            res.push(decimalsStr);
        }
    }
    return res.join('');
}
