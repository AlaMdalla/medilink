import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsComponent } from './subs.component';

describe('SubsComponent', () => {
  let component: SubsComponent;
  let fixture: ComponentFixture<SubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsComponent]
    });
    fixture = TestBed.createComponent(SubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
