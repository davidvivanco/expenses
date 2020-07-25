import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardListSlidingComponent } from './card-list-sliding.component';

describe('CardListSlidingComponent', () => {
  let component: CardListSlidingComponent;
  let fixture: ComponentFixture<CardListSlidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListSlidingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardListSlidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
