import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}
  getBooks() {
    return new Promise((resolve, reject) => {
        return this.http
          .get('https://jsonplaceholder.typicode.com/photos/')
          .subscribe(response => {
            resolve(response);
          }, reject);
      }
    );
  }
}
