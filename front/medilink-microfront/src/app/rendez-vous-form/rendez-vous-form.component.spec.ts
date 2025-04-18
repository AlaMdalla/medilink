import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousFormComponent } from './rendez-vous-form.component';

describe('RendezVousFormComponent', () => {
  let component: RendezVousFormComponent;
  let fixture: ComponentFixture<RendezVousFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezVousFormComponent]
    });
    fixture = TestBed.createComponent(RendezVousFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
