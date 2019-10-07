import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BooksService } from './books.service';
import { Component } from '@angular/core';

@Component({template: ''})
class MockComponent {}

describe('Books Service', () => {
  let service: BooksService;
  let backend: HttpTestingController;

  const mockResponseBody = {
    id: 9,
    title: 'architecto aut quod qui ullam vitae expedita delectus',
    thumbnailUrl: 'https://via.placeholder.com/150/e9603b'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BooksService,
        {
          provide: HTTP_INTERCEPTORS,
          multi: true
        }
      ],
      declarations: [
        MockComponent
      ]
    });

    service = TestBed.get(BooksService);
    backend = TestBed.get(HttpTestingController);
  });

  describe('getDetails Method', () => {
    it('should call photos endpoint', () => {
      service.getBooks().then(data => {
        expect(data).toBeTruthy();
        expect(data['id']).toEqual(mockResponseBody.id);
      });

      const mockRequest = backend.expectOne('https://jsonplaceholder.typicode.com/photos/');
      expect(mockRequest.request.responseType).toEqual('json');
      mockRequest.flush(mockResponseBody);
      backend.verify();
    });

    it('should raise rejection on request error',  () => {
      service.getBooks().catch((err) => {
        expect(err.status).toEqual(404 );
        expect(err.statusText).toEqual('Not Found');
      });

      const mockRequest = backend.expectOne('https://jsonplaceholder.typicode.com/photos/');
      mockRequest.error(new ErrorEvent('Not Found'), {
        status: 404,
        statusText: 'Not Found'
      });

      backend.verify();
    });
  });
});
