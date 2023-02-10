import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccordionPanelComponent } from './sub-accordion-panel.component';

describe('SubAccordionPanelComponent', () => {
  let component: SubAccordionPanelComponent;
  let fixture: ComponentFixture<SubAccordionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAccordionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAccordionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
