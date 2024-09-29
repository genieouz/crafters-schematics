import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteDetailPage } from './<%= dasherize(name) %>-detail.page';

describe('ActualiteDetailPage', () => {
  let component: ActualiteDetailPage;
  let fixture: ComponentFixture<ActualiteDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualiteDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
