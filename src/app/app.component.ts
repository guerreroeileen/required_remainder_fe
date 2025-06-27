import { Component } from '@angular/core';
import { TestCasesComponent } from './components/test-cases.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TestCasesComponent],
  template: '<app-test-cases></app-test-cases>',
  styleUrl: './app.component.css'
})
export class AppComponent {}
