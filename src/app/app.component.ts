import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';

import { GlobalVar } from './global-var';

import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title ='BookPicker'
  @ViewChild('sidenav') sidenav: MatSidenav;
  close() {
    this.opened = false
  }
  sidenav_toggle() {
    this.sidenav.toggle();
    if (this.sidenav.opened) {
      this.backdrop = true
    } else {this.backdrop = false}
    console.log("clicked");
  }
  color;
  nav_bar = true;
  sidenav_visible;
  url;
  pageHeight = 93
  scrHeight:any
  scrWidth:any
  minHeight

  backdrop = false

  nickname;
  login_button;
  menu_icon: boolean = true;
  opened: boolean;
  current_url;
  mediasub: Subscription;

  @HostListener('window:resize',['$event'])
  onresize(event){
    if(this.scrWidth != window.innerWidth){
      this.fix_height();
    }
  }
  fix_height(){
    this.scrWidth = window.innerWidth
    this.scrHeight = window.innerHeight
    console.log(this.scrHeight,this.scrWidth)
    this.minHeight = this.scrHeight
  }
  constructor(public router: Router, public gv: GlobalVar, public mo: MediaObserver, public authservice: AuthService) { 
    
  }
  IsLoggedIn() {
    if (localStorage.getItem('IsLoggedIn') === null || localStorage.getItem('IsLoggedIn') === 'undefined') {
      this.login_button = true
    } else this.login_button = false
    this.nickname = localStorage.getItem('nickname');
  }
  ngOnInit() {
    this.fix_height();
    if (localStorage.getItem('IsLoggedIn') === null || localStorage.getItem('IsLoggedIn') === "undefined") {
      this.router.navigate(['/home'])
    } else {
    }

    this.mediasub = this.mo.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      if (result.mqAlias === "xs") {
        this.gv.deviceXs = true;
        this.gv.deviceLg = false;
        this.gv.deviceMd = false;
        this.gv.deviceSm = false;
      } else if (result.mqAlias === "sm") {
        this.gv.deviceXs = false;
        this.gv.deviceLg = false;
        this.gv.deviceMd = false;
        this.gv.deviceSm = true;
      } else if (result.mqAlias === "md") {
        this.opened = true;
        this.gv.deviceXs = false;
        this.gv.deviceLg = false;
        this.gv.deviceMd = true;
        this.gv.deviceSm = false;
      } else {
        this.opened = true;
        this.gv.deviceXs = false;
        this.gv.deviceLg = true;
        this.gv.deviceMd = false;
        this.gv.deviceSm = false;
      }
    });
  }
  ngOnDestroy() {
    this.mediasub.unsubscribe();
  }

  RouterAction() {
    this.pageHeight = 93
    this.backdrop = false
    window.scroll(0,0)
    this.current_url = this.router.url;
    if (this.current_url === '/home') {
      this.IsLoggedIn()
      if (this.gv.deviceXs){
        this.close()
      }
      this.menu_icon = true;
      this.color = "primary";
      this.sidenav_visible = true;
      this.nav_bar = true;
      if (this.gv.deviceLg) {
        this.opened = true;
      }
    } else
      if (this.current_url === '/select-genre') {
        this.IsLoggedIn()
        this.menu_icon = false;
        this.color = "primary";
        this.nav_bar = true;
        this.sidenav_visible = false;
      } else
        if (this.current_url === '/login') {
          this.pageHeight = 100
          this.nickname = ''
          this.login_button = false
          this.menu_icon = false;
          this.color = "accent";
          this.nav_bar = false;
          this.sidenav_visible = false;
        } else
          if (this.current_url === '/location') { 
            this.pageHeight = 100
            this.IsLoggedIn()
            this.menu_icon = false;
            this.color = "accent";
            this.nav_bar = false;
            this.sidenav_visible = false;
          } else
          if (this.current_url === '/profile' || this.current_url === '/add-book' || this.current_url === '/my-books' || this.current_url === '/chats' || this.current_url === '/notifications') {
            this.IsLoggedIn()
            if (this.gv.deviceXs){
              this.close()
            }
            this.menu_icon = true;
            this.color = "primary";
            this.nav_bar = true;
            this.sidenav_visible = true;
            if (this.gv.deviceLg) {
              this.opened = true;
            }
          }else
          if (this.current_url === '/home/book-info' || this.current_url === '/my-books/book-info') {
            this.IsLoggedIn()
            if (this.gv.deviceXs){
              this.close()
            }
            this.menu_icon = true;
            this.color = "primary";
            this.nav_bar = true;
            this.sidenav_visible = true;
            if (this.gv.deviceLg) {
              this.opened = true;
            }
          }
  }
}
