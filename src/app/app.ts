import {Component, inject, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import {Layout} from './shared/presentation/components/layout/layout';

@Component({
  imports: [ Layout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eaAlexVasquez');
  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
