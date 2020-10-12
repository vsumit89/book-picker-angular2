import { Component, OnInit, inject, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.sass']
})
export class BookDialogComponent implements OnInit {
items;
display=false;
  constructor(public dialogRef : MatDialogRef<BookDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any) {

      const books = JSON.parse(JSON.stringify(data))
      this.items= books.data.items;
      
      console.log(this.items)
      this.display = true ;
     }

  ngOnInit(): void {
  }

}
