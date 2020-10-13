import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  nickname
  constructor(public router : Router) { }

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname')
  }
  log_out() {
    localStorage.setItem('logOut', 'true')
    localStorage.setItem('number','')
  }

}
