import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletatuComponent } from './completatu.component';

describe('CompletatuComponent', () => {
  let component: CompletatuComponent;
  let fixture: ComponentFixture<CompletatuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletatuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletatuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
