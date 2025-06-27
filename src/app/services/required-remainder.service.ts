import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TestCase {
  x: number;
  y: number;
  n: number;
}

export interface TestCaseResult {
  result: number;
}

@Injectable({ providedIn: 'root' })
export class RequiredRemainderService {
  private apiUrl = '/api/required-remainder';

  constructor(private http: HttpClient) {}

  sendTestCases(testCases: TestCase[]): Observable<TestCaseResult[]> {
    return this.http.post<TestCaseResult[]>(this.apiUrl, { testCases });
  }
} 