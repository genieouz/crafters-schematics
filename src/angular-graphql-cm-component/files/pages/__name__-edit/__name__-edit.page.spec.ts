import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>EditPage } from './<%= dasherize(name) %>-edit.page';

describe('<%= classify(name) %>EditPage', () => {
  let component: <%= classify(name) %>EditPage;
  let fixture: ComponentFixture<<%= classify(name) %>EditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>EditPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(<%= classify(name) %>EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
