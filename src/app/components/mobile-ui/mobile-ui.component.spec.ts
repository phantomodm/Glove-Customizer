import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUiComponent } from './mobile-ui.component';

describe('MobileUiComponent', () => {
  let component: MobileUiComponent;
  let fixture: ComponentFixture<MobileUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
