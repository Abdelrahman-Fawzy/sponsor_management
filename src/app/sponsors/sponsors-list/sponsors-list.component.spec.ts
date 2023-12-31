import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsListComponent } from './sponsors-list.component';

describe('SponsorsListComponent', () => {
  let component: SponsorsListComponent;
  let fixture: ComponentFixture<SponsorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorsListComponent]
    });
    fixture = TestBed.createComponent(SponsorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
