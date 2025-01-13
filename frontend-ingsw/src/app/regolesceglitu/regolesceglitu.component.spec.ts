import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegolesceglituComponent } from './regolesceglitu.component';

describe('RegolesceglituComponent', () => {
  let component: RegolesceglituComponent;
  let fixture: ComponentFixture<RegolesceglituComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegolesceglituComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegolesceglituComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
