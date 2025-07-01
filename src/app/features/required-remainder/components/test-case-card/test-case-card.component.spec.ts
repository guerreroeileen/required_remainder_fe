import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCaseCardComponent } from './test-case-card.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TestCaseCardComponent', () => {
  let component: TestCaseCardComponent;
  let fixture: ComponentFixture<TestCaseCardComponent>;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCaseCardComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [FormBuilder]
    }).compileComponents();
    fixture = TestBed.createComponent(TestCaseCardComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    form = fb.group({ x: [7], y: [5], n: [123] });
    component.form = form;
    component.index = 0;
    component.result = 42;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render result if present', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('42');
  });
}); 