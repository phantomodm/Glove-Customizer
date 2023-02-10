import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveUiComponent } from './glove-ui.component';

describe('GloveUiComponent', () => {
  let component: GloveUiComponent;
  let fixture: ComponentFixture<GloveUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloveUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloveUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
