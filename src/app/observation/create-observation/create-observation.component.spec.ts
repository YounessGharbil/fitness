import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObservationComponent } from './create-observation.component';

describe('CreateObservationComponent', () => {
  let component: CreateObservationComponent;
  let fixture: ComponentFixture<CreateObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateObservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
