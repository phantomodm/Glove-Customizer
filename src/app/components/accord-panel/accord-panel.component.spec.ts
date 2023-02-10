import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordPanelComponent } from './accord-panel.component';

describe('AccordPanelComponent', () => {
  let component: AccordPanelComponent;
  let fixture: ComponentFixture<AccordPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
