import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-books',
  templateUrl: './your-books.component.html',
  styleUrls: ['./your-books.component.sass']
})
export class YourBooksComponent implements OnInit {

  n = 20
  books = ['','1','2','3','4','5','6','7']
  constructor() { }

  ngOnInit(): void {
    console.log(this.books)
    for( let item of this.books) {
      console.log(this.books.indexOf(item))
    }

  }

}
