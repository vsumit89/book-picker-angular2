import { Component, OnInit } from '@angular/core';
import { GlobalVar } from '../global-var';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.sass']
})
export class MyBooksComponent implements OnInit {

  books_in_row = 7
  rows
  size
  book_row = []
  curr_row = 0
  books = [{
    title: '1 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  },
  {
    title: '2 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '3 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '4 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '5 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '6 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '7 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '8 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '9 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '10 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '11 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '12 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '13 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '14 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '15 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }, {
    title: '16 days of summer',
    img_link: '../../assets/images/book.svg',
    book_id: ''
  }]
  constructor(public gv : GlobalVar) { }

  ngOnInit(): void {
    if (this.gv.deviceXs) {
      this.books_in_row = 3
    }
    this.size = this.books.length
    console.log(this.size)
    this.rows = this.size / this.books_in_row
    if (this.rows % 1 != 0) {
      if (this.rows % 1 < 0.5) {
        this.rows = Number(this.rows.toFixed(0)) + 1
      } else {
        this.rows = this.rows.toFixed(0)
      }
    }
    for (let row of Array(this.rows)) {
      this.book_row.push(this.books.slice(this.curr_row * this.books_in_row, (this.curr_row * this.books_in_row) + this.books_in_row))
      this.curr_row += 1
    }
    console.log(this.book_row);

  }
}
