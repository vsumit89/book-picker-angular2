import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit(): void {
  }
  log_out() {
    localStorage.setItem('logOut', 'true')
    localStorage.setItem('number','')
  }
  clear() {
    localStorage.clear()
  }

}
