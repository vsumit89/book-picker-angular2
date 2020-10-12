import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Book } from '../book';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GetBookService } from '../services/get-book.service';
import { GlobalBooks } from '../global-books';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

interface Genre{
  value: string;
  viewValue : string
}
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.sass']
})
export class AddBookComponent implements OnInit {
  isbn : string;
  bookName : string;
  edition : number;
  author : string;
  genre : string;
  opinion: string;
  mobile: string;
  Show: boolean;
  items;
  display = false;
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

  bookDetails: FormGroup= new FormGroup({});
  book: FormGroup= new FormGroup({})
  public newbookDetails: Book = new Book();
  constructor(
    public _fb: FormBuilder,
    public _http: HttpClient,
    public  bookService: GetBookService,
    public gb: GlobalBooks,
    public dialog : MatDialog
    ){  }  

  ngOnInit(){ 
  }

  getBookFuction(){
    this.bookService.GetBooks(this.isbn).subscribe(response => {
      // const books = JSON.parse(JSON.stringify(response));
      // this.items = books.items
      const dialogRef = this.dialog.open(BookDialogComponent, {
        data:{data:response}
        });
        dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    });
    
  }z
  SelectOption(genre){this.genre=genre;}
  
  addBookToLibrary(){
    this.bookDetails = this._fb.group({
      mobile: ['100'],
      book: this._fb.group({
         isbn:[this.isbn],
         bookName:[this.bookName],
         author:[this.author],
         edition:[this.edition],
         genre:[this.genre],
         opinion:[this.opinion]
      })
    })

    this.newbookDetails = <Book>this.bookDetails.value;
    console.log(this.newbookDetails);
    var Header = new HttpHeaders();
    Header.append("Content-Type", "application/json").append('Cache-Control', 'no-cache');
    this._http.post('/', JSON.stringify(this.newbookDetails), { headers: Header }).subscribe(
    (data) => console.log(data),
    (response) => console.log(response),
    // (error) => console.log(error)
    )
  }

}
