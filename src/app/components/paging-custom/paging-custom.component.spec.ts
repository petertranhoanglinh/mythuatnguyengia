import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingCustomComponent } from './paging-custom.component';

describe('PagingCustomComponent', () => {
  let component: PagingCustomComponent;
  let fixture: ComponentFixture<PagingCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagingCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagingCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
