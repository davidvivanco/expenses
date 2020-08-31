import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() user: User;
  @Input() group: any;
  @Input() component: string;
  @Input() itemLabel: string
  @Input() title: string
  @Input() avatar: string;
  @Input() itemIcon: Array<object>;

  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onClick: EventEmitter<{ item }>;
  @Output() onClickButton: EventEmitter<boolean>;
  @Output() onActivity: EventEmitter<{ item: any, slidingItem: IonItemSliding }>;
  @Output() onDelete: EventEmitter<{ index: number, item: any }>;
  @Output() onEdit: EventEmitter<{ item: any, slidingItem: IonItemSliding }>;


  constructor() {
    this.onItemsOrderChanged = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onClickButton = new EventEmitter();
    this.onActivity = new EventEmitter();
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
  }

  ngOnInit() {
    console.log('items', this.items);
    console.log('component', this.component);

  }


  reorder(e): void {
    const elementToMove = this.items.splice(e.detail.from, 1)[0];
    this.items.splice(e.detail.to, 0, elementToMove);
    e.detail.complete();
    this.onItemsOrderChanged.emit();
  }


  clickInItem(item, slidingItem) {
    if (!Object.values(slidingItem.el.classList).includes('item-sliding-active-options-end'))
      this.onClick.emit(item);
  }

  clickInMenu(item) {
    this.onActivity.emit(item);
  }

  clickInButton() {
    this.onClickButton.emit(true);
  }

  delete(index: number, item: any) {
    this.onDelete.emit({ index, item });
  }

  edit(item: any, slidingItem: IonItemSliding) {
    this.onEdit.emit({ item, slidingItem });
  }

  activity(item: any, slidingItem) {
    this.onActivity.emit({ item, slidingItem });
  }

}
