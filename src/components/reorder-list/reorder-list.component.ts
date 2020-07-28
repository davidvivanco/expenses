
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';



@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.scss'],
})
export class ReorderListComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() type: string;
  @Input() activityButton: boolean
  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onCardClick: EventEmitter<{item}>;
  @Output() onDelete: EventEmitter<{ index: number, item: any }>;
  @Output() onEdit: EventEmitter<{ item: any, slidingItem: IonItemSliding }>;
  @Output() onActivity: EventEmitter<{ item: any, slidingItem: IonItemSliding }>;
  @Output() onDetails: EventEmitter<{ item: any, slidingItem: IonItemSliding }>;


  constructor() {
    this.activityButton = true;
    this.onItemsOrderChanged = new EventEmitter();
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
    this.onActivity = new EventEmitter();
    this.onDetails = new EventEmitter();
    this.onCardClick = new EventEmitter();
  }

  ngOnInit() { }

  reorder(e): void {
    const elementToMove = this.items.splice(e.detail.from, 1)[0];
    this.items.splice(e.detail.to, 0, elementToMove);
    e.detail.complete();
    this.onItemsOrderChanged.emit();
  }

  clickOnCard(item: any, slidingItem): void {
    if (!Object.values(slidingItem.el.classList).includes('item-sliding-active-options-end')
    && !Object.values(slidingItem.el.classList).includes('item-sliding-active-options-start')){
      this.onCardClick.emit({item});
    }
  }

  delete(index: number, item: any) {
    this.onDelete.emit({ index, item });
  }

  edit(item: any, slidingItem: IonItemSliding) {
    this.onEdit.emit({ item, slidingItem });
  }

  activity(item: any, slidingItem: IonItemSliding) {
    this.onActivity.emit({ item, slidingItem });
  }

  details(item: any, slidingItem: IonItemSliding) {
    this.onDetails.emit({ item, slidingItem });
  }

}
