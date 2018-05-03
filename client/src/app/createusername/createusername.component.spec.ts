import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateusernameComponent } from './createusername.component';

describe('CreateusernameComponent', () => {
  let component: CreateusernameComponent;
  let fixture: ComponentFixture<CreateusernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateusernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
