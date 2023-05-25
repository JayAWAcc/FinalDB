import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnifeCommentComponent } from './knife-comment.component';

describe('KnifeCommentComponent', () => {
  let component: KnifeCommentComponent;
  let fixture: ComponentFixture<KnifeCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnifeCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnifeCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
