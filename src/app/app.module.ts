// tslint:disable: no-duplicate-imports
// #region Http Interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
// #region default language
// Reference: https://ng-alain.com/docs/i18n
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
import { zhCN as dateLang } from 'date-fns/locale';
import { NZ_DATE_LOCALE, NZ_I18N, zh_CN as zorroLang, en_US } from 'ng-zorro-antd/i18n';
// register angular
import { registerLocaleData } from '@angular/common';
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared';
// #region Startup Service
import { DefaultInterceptor, StartupService } from '@core';
import { SimpleInterceptor } from '@delon/auth';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GlobalConfigModule } from './global-config.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SUploadComponent } from './shared/components/s-upload/s-upload.component';
import { SharedModule } from './shared/shared.module';
import { STWidgetModule } from './shared/st-widget/st-widget.module';
import { ComponentsModule } from './shared/components/components.module';
import { FormsModule } from '@angular/forms';
import zh from '@angular/common/locales/zh';
import { default as ngLang } from '@angular/common/locales/zh';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang,
};
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];
// #endregion
const FORM_MODULES = [JsonSchemaModule];
// #endregion
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES: Type<any>[] = [];

// #endregion
export function StartupServiceFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.load();
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

// #endregion

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    STWidgetModule,
    NzMessageModule,
    NzNotificationModule,
    ComponentsModule,
    ...FORM_MODULES,
    ...GLOBAL_THIRD_MODULES,
    FormsModule,
  ],
  providers: [...LANG_PROVIDES, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent],
})
export class AppModule {}
