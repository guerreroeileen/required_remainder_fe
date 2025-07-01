import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCasesComponent } from './test-cases.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RequiredRemainderService, TestCase } from '../../../../core/services/required-remainder.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockRequiredRemainderService {
  sendTestCases(testCases: TestCase[]) {
    return of([1, 2, 3]);
  }
}

describe('TestCasesComponent', () => {
  let component: TestCasesComponent;
  let fixture: ComponentFixture<TestCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCasesComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: RequiredRemainderService, useClass: MockRequiredRemainderService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync test cases when numCases changes', () => {
    component.form.get('numCases')!.setValue(3);
    expect(component.cases.length).toBe(3);
    component.form.get('numCases')!.setValue(1);
    expect(component.cases.length).toBe(1);
  });

  it('should not call service if form is invalid', () => {
    spyOn(component['rrService'], 'sendTestCases');
    component.form.get('numCases')!.setValue(0); // invalid
    component.calculate();
    expect(component['rrService'].sendTestCases).not.toHaveBeenCalled();
  });

  it('should call service and update results if form is valid', () => {
    spyOn(component['rrService'], 'sendTestCases').and.callThrough();
    component.form.get('numCases')!.setValue(2);
    component.cases.at(0).setValue({ x: 7, y: 5, n: 123 });
    component.cases.at(1).setValue({ x: 5, y: 0, n: 4 });
    component.calculate();
    expect(component['rrService'].sendTestCases).toHaveBeenCalled();
    expect(component.results).toEqual([1, 2, 3]);
  });
}); 