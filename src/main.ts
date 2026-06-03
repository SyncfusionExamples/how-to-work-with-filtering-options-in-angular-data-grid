import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {registerLicense} from '@syncfusion/ej2-base';
registerLicense('Add your generated license key here');


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
