import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/solve`;

  constructor(private http: HttpClient) {}

  sendTestCases(testCases: TestCase[]): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrl, testCases);
  }
} 