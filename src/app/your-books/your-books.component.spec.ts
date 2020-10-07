import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourBooksComponent } from './your-books.component';

describe('YourBooksComponent', () => {
  let component: YourBooksComponent;
  let fixture: ComponentFixture<YourBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
