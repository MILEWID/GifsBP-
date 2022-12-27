import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Gif, DataGif } from '../../models/model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data2: DataGif[];
  author_id: number;
  baseUri: string = 'https://iyelrnlkoq7ra5mnxg5cobbkta0uubul.lambda-url.us-east-1.on.aws/?author_id=2001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,

    ) {
      this.data2 = []
      this.author_id = 2001;
    }



  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  getGifs() {
    return this.http.get(`${this.baseUri}`);
  }

  deleteGif(datagif: DataGif):void{
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: datagif,
    };
    this.http.delete<DataGif>('https://iyelrnlkoq7ra5mnxg5cobbkta0uubul.lambda-url.us-east-1.on.aws/',options).subscribe((data) => {
      this.data2 = this.data2.filter((item) => item.id !== datagif.id
      );
    })
  }

  createGifs(data: Gif): Observable<any> {
    let url = `https://iyelrnlkoq7ra5mnxg5cobbkta0uubul.lambda-url.us-east-1.on.aws/`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  get getGifData(): DataGif[] {
    return this.data2;
  }

  }
