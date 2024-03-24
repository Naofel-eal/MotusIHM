import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingFactoryComponent } from './setting-factory.component';

describe('SettingFactoryComponent', () => {
  let component: SettingFactoryComponent;
  let fixture: ComponentFixture<SettingFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
