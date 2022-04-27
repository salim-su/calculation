// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  SERVER_URL: `/api/`,
  OSS_URL: 'blade-system/business-oss/',
  FILE_PREVIEW_URL: 'http://10.163.200.140:10499/',
  SUPER_MAP_BASE_URL: 'http://10.163.200.111:30100/iserver/services/map-ugcv5-TJGDZDTWGS84/rest/maps/TJGDZDTWGS84',
  production: false,
  useHash: true,
  hmr: false,
  redirectTo: '',
  dict: {
    yesNo: [
      {
        dictKey: 0,
        dictValue: '否',
      },
      {
        dictKey: 1,
        dictValue: '是',
      },
    ],
  },
  subsystem: {
    auth: {
      id: '1370253599861944322',
      code: 'system',
      name: '权限',
    },
    calculation: {
      id: '1515941891865182210',
      code: 'calculation',
      name: '计费系统',
    },
  },
};
