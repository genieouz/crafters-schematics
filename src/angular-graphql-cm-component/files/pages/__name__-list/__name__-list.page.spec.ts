import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>ListPage } from './<%= dasherize(name) %>-list.page';

describe('<%= classify(name) %>ListPage', () => {
  let component: <%= classify(name) %>ListPage;
  let fixture: ComponentFixture<<%= classify(name) %>ListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>ListPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(<%= classify(name) %>ListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
