import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMutiImageComponent } from './upload-muti-image.component';

describe('UploadMutiImageComponent', () => {
  let component: UploadMutiImageComponent;
  let fixture: ComponentFixture<UploadMutiImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMutiImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMutiImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
