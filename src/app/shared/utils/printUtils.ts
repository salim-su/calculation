declare var LODOP: any;
import * as moment from 'moment';

export interface Dcthlxd {
    shipName: string;
    cargoName: string;
    yardName: string;
    billNo: string;
    licenseNumber: string;
    bizNo: string;
    driverName: string;
    year?: string;
    month?: string;
    day?: string;
}

/**
 * 单位 mm
 * [top, left, weight, height, fontSize]
 */
const dcthOptions = {
    padding: .5,
    shipName: [27, 36, 41, 17, 20],
    cargoName: [27, 93, 41, 17, 20],
    yardName: [27, 150, 27, 17, 20],
    billNo: [44, 36, 46, 20, 20],
    licenseNumber: [44, 93, 41, 17, 20],
    bizNo: [44, 150, 27, 17, 20],
    driverName: [61, 145, 33, 17, 20],
    year: [113, 135, 15, 10, 12],
    month: [113, 152, 10, 10, 12],
    day: [113, 165, 10, 10, 12]
};

// LODOP.ADD_PRINT_TEXT("113.14mm","135.84mm","13.41mm","6.67mm","2021");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT("113.14mm","152.56mm","8.31mm","6.67mm","06");
// LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
// LODOP.SET_PRINT_STYLEA(0,"Bold",1);
// LODOP.ADD_PRINT_TEXT("113.14mm","165.15mm","8.04mm","7.2mm","21");
/**
 *
 * @param option 字段配置
 * @param cellData  打印字段数据 {列名： 值}
 */
function getPrintInita(option, cellData) {
    for (const cellDataKey in cellData) {
        if (option.hasOwnProperty(cellDataKey)) {
            const config = option[cellDataKey] as number[];
            let top = '';
            let left = '';
            let weight = '';
            let height = '';
            let fontSize = 20;
            const padding = option.padding;
            const data = cellData[cellDataKey];
            config.forEach((item, index) => {
                switch (index) {
                    case 0:
                        // top
                        switch (cellDataKey) {
                            case 'billNo':
                                if (data.length <= 8) {
                                    item = item + 3;
                                }
                                break;
                            case 'licenseNumber':
                                item = item + 3;
                                break;
                            default:
                                if (data.length <= 5) {
                                    item = item + 3;
                                }
                                break;
                        }
                        top = (item + padding) + 'mm';
                        break;
                    case 1:
                        switch (cellDataKey) {
                            case 'yardName':
                                item = item + 3;
                                break;
                            case 'bizNo':
                                item = item + 3;
                                break;
                        }
                        left = (item + padding) + 'mm';
                        break;
                    case 2:
                        weight = (item - 2 * padding) + 'mm';
                        break;
                    case 3:
                        height = (item - 2 * padding) + 'mm';
                        break;
                    case 4:
                        fontSize = item;
                        break;
                }
            });
            LODOP.ADD_PRINT_TEXT(top, left, weight, height, cellData[cellDataKey]);
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', fontSize);
            LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        }
    }
}

/**
 * 单车提货联系单
 */
export function printDCTHLXD(data: Dcthlxd) {
    const now = new Date();

    data.year = moment(now).format('YYYY');
    data.month = moment(now).format('MM');
    data.day = moment(now).format('DD');

    if (!LODOP) {
        return;
    }

    LODOP.SET_LICENSES('', '0ED39D1FB762DDDF2D4F7A7A0C29273C', '', '');
    LODOP.PRINT_INITA(-27, -100, 800, 600, '单车提货联系单');
    LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1);
    LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '190.00mm');
    LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '130.00mm');
    getPrintInita(dcthOptions, data);
    // LODOP.ADD_PRINT_TEXT('28.00mm', '36.00mm', '36.00mm', '16.00mm', data.shipName);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('28.00mm', '93.00mm', '36.00mm', '16.00mm', data.cargoName);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('28.00mm', '150.00mm', '27.00mm', '16.00mm', data.yardName);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('44.00mm', '36.00mm', '36.00mm', '16.00mm', data.billNo);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('44.00mm', '93.00mm', '36.00mm', '16.00mm', data.licenseNumber);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('44.00mm', '150.00mm', '27.00mm', '16.00mm', data.bizNo);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT('60.00mm', '145.00mm', '27.00mm', '16.00mm', data.driverName);
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT(431, 509, 50, 20, moment(now).format('YYYY'));
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT(431, 573, 30, 20, moment(now).format('MM'));
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    // LODOP.ADD_PRINT_TEXT(431, 617, 30, 20, moment(now).format('DD'));
    // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    // LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);

    LODOP.PRINT();
    // LODOP.PRINT_DESIGN();
}

export interface HZD {
    entrustingParty: string; // 委托单位
    shipName: string; // 船名
    times: number; // 次数
    date: string; // 日期
    operationMode: string; // 作业方式
    time: string; // 时刻
    billNo: string; // 提单号
    plateNo: string; // 车号
    cargoOwner: string; // 货主
    cargoName: string; // 货名
    grossWeight: number; // 毛重
    tareWeight: number; // 皮重
    netWeight: number; // 净重
    correctionWeight: string; // 修正重量
    totalTimes: number; // 汇总：车
    totalWeight: number; // 汇总：吨
}

/**
 * 天津港第四港
 */
export function printHZD(hzd: HZD) {
    LODOP.SET_LICENSES('', '0ED39D1FB762DDDF2D4F7A7A0C29273C', '', '');
    LODOP.SET_PRINT_PAGESIZE(1, '75.0mm', '152.5mm', '7.5x15.25');
    LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '75.0mm');
    LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '152.5mm');
    LODOP.ADD_PRINT_TEXT('15.31mm', '24.34mm', '38.63mm', '6.61mm', hzd.entrustingParty);
    LODOP.SET_PRINT_STYLEA(0, 'FontName', '黑体');
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('22.52mm', '18.52mm', '45.24mm', '6.61mm', hzd.shipName);
    LODOP.SET_PRINT_STYLEA(0, 'FontName', '黑体');
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('32.51mm', '20.28mm', '11.11mm', '6.61mm', hzd.times);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('33.05mm', '42.44mm', '21.78mm', '6.61mm', hzd.date);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('40.24mm', '20.55mm', '10.85mm', '6.61mm', hzd.operationMode);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('41.52mm', '42.33mm', '21.7mm', '6.61mm', hzd.time);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('49.97mm', '20.55mm', '40.63mm', '6.61mm', hzd.billNo);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('58.44mm', '20.81mm', '40.63mm', '6.61mm', hzd.plateNo);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('67.64mm', '20.81mm', '40.63mm', '6.61mm', hzd.cargoOwner);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('75.85mm', '20.08mm', '40.63mm', '6.61mm', hzd.cargoName);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('84.58mm', '20.08mm', '40.63mm', '6.61mm', hzd.grossWeight);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('92.78mm', '20.08mm', '40.63mm', '6.09mm', hzd.tareWeight);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('101.98mm', '20.08mm', '40.63mm', '6.61mm', hzd.netWeight);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    // LODOP.ADD_PRINT_TEXT('108.65mm', '24.08mm', '40.63mm', '6.61mm', hzd.correctionWeight);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('118.12mm', '22.49mm', '33.07mm', '6.61mm', hzd.totalTimes);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('124.53mm', '22.49mm', '33.07mm', '6.61mm', hzd.totalWeight);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('135.53mm', '22.49mm', '33.07mm', '6.61mm', '☆');
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.PRINT();
    // LODOP.PREVIEW();
    // LODOP.PRINT_DESIGN();
}

