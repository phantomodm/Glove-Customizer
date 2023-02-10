import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveViewComponent } from './glove-view.component';

describe('GloveViewComponent', () => {
  let component: GloveViewComponent;
  let fixture: ComponentFixture<GloveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloveViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GloveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
