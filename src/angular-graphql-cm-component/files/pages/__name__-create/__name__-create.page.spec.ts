import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>CreatePage } from './<%= dasherize(name) %>-create.page';

describe('<%= classify(name) %>CreatePage', () => {
  let component: <%= classify(name) %>CreatePage;
  let fixture: ComponentFixture<<%= classify(name) %>CreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>CreatePage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(<%= classify(name) %>CreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
