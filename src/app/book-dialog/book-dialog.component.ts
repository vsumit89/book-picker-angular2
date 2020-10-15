import { Component, OnInit, inject, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { title } from 'process';
@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.sass']
})
export class BookDialogComponent implements OnInit {
items;
selectedBook;
  constructor(public dialogRef : MatDialogRef<BookDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      const books = JSON.parse(JSON.stringify(data))
      this.items= books.data.items;
      console.log(this.items)
     }

  ngOnInit(): void {
   
  }
 
  RowSelected(u:any){
    this.selectedBook = u;
    this.dialogRef.close(this.selectedBook);
    
  }
  Next_button_pressed(){
    this.selectedBook = {volumeInfo :{
                              authors:[""],
                              description:"",
                              imageLinks:{thumbnail:"../../assets/images/book.svg"},
                              title:"",
                              averageRating:"0"
                            }
                            };
    this.dialogRef.close(this.selectedBook);
  }
}
