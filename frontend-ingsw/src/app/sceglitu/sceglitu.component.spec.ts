import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceglituComponent } from './sceglitu.component';

describe('SceglituComponent', () => {
  let component: SceglituComponent;
  let fixture: ComponentFixture<SceglituComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceglituComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceglituComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
