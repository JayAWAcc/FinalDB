import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryCommentComponent } from './accessory-comment.component';

describe('AccessoryCommentComponent', () => {
  let component: AccessoryCommentComponent;
  let fixture: ComponentFixture<AccessoryCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
