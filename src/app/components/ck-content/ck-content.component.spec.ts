import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkContentComponent } from './ck-content.component';

describe('CkContentComponent', () => {
  let component: CkContentComponent;
  let fixture: ComponentFixture<CkContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
