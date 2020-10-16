import { animate, style, state, transition, trigger } from '@angular/animations';
import { flatten } from '@angular/compiler';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
interface styler {
  disabled ;
  style ;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
})
export class SidenavComponent implements OnInit {

  colored = 'rgba(234,234,234,0.1)'
  style : styler[] = [
    {disabled : false, style : {}},
    {disabled : false, style : {}},
    {disabled : false, style : {}},
    {disabled : false, style : {}},
    {disabled : false, style : {}},
    {disabled : false, style : {}},
  ]
  constructor(public router : Router) { }

  ngOnInit(): void {
    if (this.router.url === '/home') {this.disableHome()}
    if (this.router.url === '/add-book') {this.disableAddBook()}
    if (this.router.url === '/profile') {this.disableProfile()}
    if (this.router.url === '/my-books') {this.disableMyBooks()}
    if (this.router.url === '/chats') {this.disableChats()}
    if (this.router.url === '/notifications') {this.disableNotifications()}
  }
  disableAddBook() {
    this.style[0].disabled = true
    this.style[0].style = {'background': 'rgba(97,89,229,0.65)'}
    this.style[2]= this.style[3]= this.style[4]= this.style[5]= this.style[1] = this.style[6]= {disabled : false, style : {}}
  }
  disableHome() {
    this.style[1].disabled = true
    this.style[1].style = {'background': '#EAEAEA'}
    this.style[2]= this.style[3]= this.style[4]= this.style[5]= this.style[0] = this.style[6]= {disabled : false, style : {}}
  }
  disableSearch() {
    this.style[2].disabled = true
    this.style[2].style = {'background': '#EAEAEA'}
    this.style[1]= this.style[3]= this.style[4]= this.style[5]= this.style[0] = this.style[6] = {disabled : false, style : {}}
  }
  disableMyBooks() {
    this.style[3].disabled = true
    this.style[3].style = {'background': '#EAEAEA'}
    this.style[2]= this.style[1]= this.style[4]= this.style[5]= this.style[0] = this.style[6] = {disabled : false, style : {}}
  }
  disableProfile() {
    this.style[4].disabled = true
    this.style[4].style = {'background': '#EAEAEA'}
    this.style[2]= this.style[3]= this.style[1]= this.style[5]= this.style[0] = this.style[6] = {disabled : false, style : {}}
  }
  disableChats() {
    this.style[5].disabled = true
    this.style[5].style = {'background': '#EAEAEA'}
    this.style[2]= this.style[3]= this.style[4]= this.style[1]= this.style[0] = this.style[6] = {disabled : false, style : {}}
  }
  disableNotifications() {
    this.style[6].disabled = true
    this.style[6].style = {'background': '#EAEAEA'}
    this.style[2]= this.style[3]= this.style[4]= this.style[1]= this.style[0] = this.style[5] = {disabled : false, style : {}}
  }
}
