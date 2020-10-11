import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBookService {

  token;
  _URL = 'https://www.googleapis.com/books/v1/volumes?q='
  constructor(public _http: HttpClient) { }

  GetBooks(s) {
    const headers = new HttpHeaders({'content-type': 'application/json','Anonymous' : 'true'})
    return this._http.get(this._URL + 'title:'+s+'&fields=items/volumeInfo(title,authors,description,imageLinks/thumbnail,averageRating)', {headers: headers})
     }
}
