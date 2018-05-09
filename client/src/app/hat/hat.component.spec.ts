import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatComponent } from './hat.component';

describe('HatComponent', () => {
  let component: HatComponent;
  let fixture: ComponentFixture<HatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
