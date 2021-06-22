import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesserrorComponent } from './accesserror.component';

describe('AccesserrorComponent', () => {
  let component: AccesserrorComponent;
  let fixture: ComponentFixture<AccesserrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesserrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesserrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
