import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-genre',
  templateUrl: './select-genre.component.html',
  styleUrls: ['./select-genre.component.sass']
})
export class SelectGenreComponent implements OnInit {


  i;
  user = 'user';
  // show = []
  selected = ['', '', '', '', '', '', '', ''];
  style = [, , , , , , , , ,];
  styler = {
    border: '2px solid #3A3592',
    opacity: 0.7,
    'transform': 'translateY(-4px)',
    'box-shadow': '0 8px 25px rgba(0, 0, 0, 0.35)',
  };
  a = 0;
  constructor(public router : Router) { }
  ngOnInit() {
    const check = localStorage.getItem('genres')
    if (check != null) {
      this.i = 0
      this.selected = JSON.parse(localStorage.getItem('genres'))
      for (let genre of this.selected) {
        if (genre === "") {
          this.style[this.i] = {
            border: 'none',
            opacity: 1,
            'transform': 'translateY(0px)',
            'box-shadow': '0 0px 0px rgba(0, 0, 0, 0.35)',}
        } else {
          this.style[this.i] = this.styler
        }
        this.i++
      }
    }
  }

  select(a, value) {
    if (this.selected[a] === '') {
      this.selected[a] = value;
      console.log('selected', a);
      
      this.style[a] = this.styler;
    } else {
      this.selected[a] = '';
      this.style[a] = {};
    }
  }
  select_genre() {
    if (this.empty()) {
      window.alert('please select atleast one genre')
    }else{
      localStorage.setItem('genres', JSON.stringify(this.selected))
      this.router.navigate(['/home'])
    }
  }
  empty() {
    for (let genre of this.selected) {
      if (genre != '') {return false}
    }
    return true
  }

}
