import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTestimonialsComponent } from './about-testimonials.component';

describe('AboutTestimonialsComponent', () => {
  let component: AboutTestimonialsComponent;
  let fixture: ComponentFixture<AboutTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTestimonialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
