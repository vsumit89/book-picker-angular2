import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.sass']
})
export class BookInfoComponent implements OnInit {
  num = [1,2,3,4,5,6]
  num_mob = [1,2,3]
  isbn : number
  phone : string
  private sub : any
  URL : string
  constructor( 
    private route :  ActivatedRoute,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.phone = localStorage.getItem('phone')
    this.sub = this.route.params.subscribe(
      params => {
        this.isbn = +params['isbn']
      }
    )
    this.getBookinfo()

  }

  getBookinfo(){
    let headers = new HttpHeaders()
    headers.append('Content-Type','application/json')
    this.http.post( this.URL, this.isbn, {headers:headers})
  }

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
  }

}
