import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConclusaoPage } from './conclusao.page';

describe('ConclusaoPage', () => {
  let component: ConclusaoPage;
  let fixture: ComponentFixture<ConclusaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConclusaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
