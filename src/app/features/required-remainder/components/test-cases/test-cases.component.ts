import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RequiredRemainderService, TestCase } from '../../../../core/services/required-remainder.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TestCaseCardComponent } from '../test-case-card/test-case-card.component';

@Component({
  selector: 'app-test-cases',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TestCaseCardComponent
  ],
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent {
  form: FormGroup;
  results: (number | undefined)[] = [];

  constructor(private fb: FormBuilder, private rrService: RequiredRemainderService) {
    this.form = this.fb.group({
      numCases: [1, [Validators.required, Validators.min(1)]],
      cases: this.fb.array([this.createTestCaseForm()])
    });

    // Sincronizar dinámicamente el número de tarjetas con numCases
    this.form.get('numCases')!.valueChanges.subscribe((num: number) => {
      this.syncTestCases(num);
    });
  }

  get cases(): FormArray<FormGroup> {
    return this.form.get('cases') as FormArray<FormGroup>;
  }

  createTestCaseForm(): FormGroup {
    return this.fb.group({
      x: [null, [Validators.required, Validators.min(2)]],
      y: [null, [Validators.required, Validators.min(0)]],
      n: [null, [Validators.required, Validators.min(0)]]
    });
  }

  syncTestCases(num: number) {
    if (num < 1) return;
    while (this.cases.length < num) {
      this.cases.push(this.createTestCaseForm());
    }
    while (this.cases.length > num) {
      this.cases.removeAt(this.cases.length - 1);
    }
  }

  calculate() {
    if (this.form.invalid) return;
    const testCases: TestCase[] = this.cases.value;
    this.rrService.sendTestCases(testCases).subscribe(results => {
      this.results = results;
    });
  }
} 