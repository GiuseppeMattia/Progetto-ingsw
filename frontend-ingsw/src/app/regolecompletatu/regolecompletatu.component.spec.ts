import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegolecompletatuComponent } from './regolecompletatu.component';

describe('RegolecompletatuComponent', () => {
  let component: RegolecompletatuComponent;
  let fixture: ComponentFixture<RegolecompletatuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegolecompletatuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegolecompletatuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
