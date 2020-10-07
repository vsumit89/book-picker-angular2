import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalBooks } from '../global-books';
import { GetBookService } from '../services/get-book.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  isbn = [
    '9780070669116',
    '9789332570405',
    '9780074636824',
    '9788120311770',
    '9789339204457',
    '9788177867398',
    '9788174349620',
    '9788177667288',
    '9789353212872',
    '8174092080',
    '9788121927833',
    '9789180860454',
    '8177660640',
  ]
  user: any;
  Arr = Array;
  book = [
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' },
    { src: '../../assets/images/book.svg', title: '' }
  ]; constructor(public router: Router, public bookService: GetBookService, public gb: GlobalBooks) { }

  ngOnInit(): void {
    if (localStorage.getItem('location') === null || localStorage.getItem('location') === "undefined") {
      this.router.navigate(['/location'])
    } else
      if (localStorage.getItem('genres') === null) {
        this.router.navigate(['/select-genre'])
      }
      // for (let i of [1,2,3,4,5,6,7,8,9,0,1,2,3]) {
        this.bookService.GetBooks('pleasure box').subscribe(response => {
          const items = JSON.stringify(response)
          console.log(items)
        })
      // }
    
    // for (let i of [0,1,2,3,4,5,6,7,8]) {
    //   this.bookService.GetBooks(this.isbn[i]).subscribe(
    //     response => {
    //       const items = JSON.parse(JSON.stringify(response))
    //       this.gb.items.push(items.items)
    //       if (this.gb.items[i].volumeInfo.imageLinks.thumbnail != undefined ) {
    //         this.book[i].src = this.gb.items[i].volumeInfo.imageLinks.thumbnail
    //       }
    //       if (this.gb.items[i].volumeInfo.title != undefined) {
    //         this.book[i].title = this.gb.items[i].volumeInfo.title
    //       }
    //       console.log(this.gb.items)
    //     },
    //     error => console.log(error)
    //   )
  }

}
