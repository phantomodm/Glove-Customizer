import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTextAreaComponent } from './ui-text-area.component';

describe('UiTextAreaComponent', () => {
  let component: UiTextAreaComponent;
  let fixture: ComponentFixture<UiTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
