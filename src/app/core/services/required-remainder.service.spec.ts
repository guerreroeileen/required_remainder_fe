import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequiredRemainderService, TestCase } from './required-remainder.service';

describe('RequiredRemainderService', () => {
  let service: RequiredRemainderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequiredRemainderService]
    });
    service = TestBed.inject(RequiredRemainderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST test cases and return results', () => {
    const testCases: TestCase[] = [
      { x: 7, y: 5, n: 123 },
      { x: 5, y: 0, n: 4 }
    ];
    const mockResults = [123, 4];

    service.sendTestCases(testCases).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testCases);
    req.flush(mockResults);
  });
}); 