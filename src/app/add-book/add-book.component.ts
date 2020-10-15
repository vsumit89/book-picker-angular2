import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BreakpointObserver, Breakpoints,BreakpointState } from '@angular/cdk/layout';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
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
  title : string;
  authors :[];
  genre : string;
  description: string;
  imageLinks: string;
  mobile: string;
  search_keyword: string;
  items;
  rating;
  display = false;
  volumeInfo;
  selectedBookByUser;
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
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
  BreakpointObserver: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public _fb: FormBuilder,
    public _http: HttpClient,
    public bookService: GetBookService,
    public gb: GlobalBooks,
    public dialog : MatDialog
    ){  }  

  ngOnInit(){ 
  }

  getBookFuction(){
    this.bookService.GetBooks(this.search_keyword).subscribe(response => {
      const dialogRef = this.dialog.open(BookDialogComponent, {
        width: '750px',
        height : 'auto',
        data:{data:response},
        autoFocus:false,
        });        
        dialogRef.afterClosed().subscribe(result => {
        this.selectedBookByUser = result;
        this.display= true;
        if (this.selectedBookByUser.volumeInfo.averageRating >=0.1){
          this.rating = this.selectedBookByUser.volumeInfo.averageRating
        }
      });

    });
    
  }
  SelectOption(genre){this.genre=genre;}
  
  addBookToLibrary(){
    this.bookDetails = this._fb.group({
      mobile: ['100'],
      book: this._fb.group({
         isbn:[this.isbn],
         title:[this.title],
         authors:[this.authors],
         genre:[this.genre],
         description:[this.description],
         rating : [this.selectedBookByUser.volumeInfo.averageRating],
         imageLinks:[this.selectedBookByUser.volumeInfo.imageLinks.thumbnail]
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
