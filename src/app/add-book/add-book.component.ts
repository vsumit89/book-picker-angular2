import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
// import { Book } from '../book';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

interface Genre{
  value: string;
  viewValue
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.sass']
})
export class AddBookComponent implements OnInit {
  _isbn : string;
  _bookName : string;
  _edition : string;
  _author : string;
  _genre : string;
  _opinion: string;

  genres: Genre[] = [
    {value: 'Biography', viewValue: 'Biography'},
    {value: 'Romantic', viewValue: 'Romantic'},
    {value: 'Fiction', viewValue: 'Fiction'},
    {value: 'Sci-Fi', viewValue: 'Sci-Fi'},
    {value: 'Mystry', viewValue: 'Mystry'},
    {value: 'Poetry', viewValue: 'Poetry'},
    {value: 'Education', viewValue: 'Education'},
    {value: 'Others', viewValue: 'Others'}
  ];

  // bookDetails: FormGroup= new FormGroup({});
  // book: FormGroup= new FormGroup({})
  // public newbookDetails: Book = new Book();
  // constructor(
  //   public _fb: FormBuilder,
  //   public _http: HttpClient
  //   ) {
      

  //     }  
  ngOnInit(){ }
  
  
  addBookToLibrary(){
    // this.bookDetails = this._fb.group({
    //   id: ['5db2ebd3-09bb-4b35-a084-af7c0d880b36'],
    //   book: this._fb.group({
    //     _isbn:[this._isbn],
    //     _bookName:[this._bookName],
    //     _author:[this._author],
    //     _edition:[this._edition],
    //     _genre:[this._genre],
    //     _opinion:[this._opinion]
    //   })
    // })

    // this.newbookDetails = <Book>this.bookDetails.value;
    // console.log(this.newbookDetails);
    // var Header = new HttpHeaders();
    // Header.append("Content-Type", "application/json").append('Cache-Control', 'no-cache');
    // this._http.post('/', JSON.stringify(this.newbookDetails), { headers: Header }).subscribe(
    // (data) => console.log(data),
    // (response) => console.log(response),
    // // (error) => console.log(error)
    // )
  }

}
