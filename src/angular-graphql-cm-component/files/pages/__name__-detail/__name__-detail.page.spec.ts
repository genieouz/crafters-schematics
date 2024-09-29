import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>DetailPage } from './<%= dasherize(name) %>-detail.page';

describe('<%= classify(name) %>DetailPage', () => {
  let component: <%= classify(name) %>DetailPage;
  let fixture: ComponentFixture<<%= classify(name) %>DetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>DetailPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(<%= classify(name) %>DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
