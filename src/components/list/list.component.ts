import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

   @Input() items: Array<any>; 
   @Input() user: User; 
  
  @Input() type: string;
  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onClick: EventEmitter<{ item }>;
  @Output() onClickMenu: EventEmitter<{ item }>;


  constructor() {
    this.onItemsOrderChanged = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onClickMenu = new EventEmitter();
  }

  ngOnInit() { }

  reorder(e): void {
    const elementToMove = this.items.splice(e.detail.from, 1)[0];
    this.items.splice(e.detail.to, 0, elementToMove);
    e.detail.complete();
    this.onItemsOrderChanged.emit();
  }

  clickInItem(e, item) {
    console.log('object');
    (e.target.localName === 'ion-icon')
      ? this.onClickMenu.emit(item)
      : this.onClick.emit(item);
  }

  clickInMenu(item) {
    this.onClickMenu.emit(item);
  }

}
