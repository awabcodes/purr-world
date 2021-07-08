import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private translate: TranslateService
  ) {
    this.initializeTranslate();
  }

  initializeTranslate() {
    const lang = 'en';

    this.translate.setDefaultLang(lang);

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use(lang);
    }
  }
}
