import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GetBookService } from '../services/get-book.service';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { GlobalBooks} from '../global-books';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  isbn : string;
  constructor(  
    public _fb: FormBuilder,
    public _http: HttpClient,
    public  bookService: GetBookService,
    public gb: GlobalBooks
  ) {  }

  ngOnInit(): void {
  }

  getBookFuction(){
    this.bookService.GetBooks(this.isbn).subscribe(response => {
      const items = JSON.stringify(response)
      console.log(items)
    })
  }
}
