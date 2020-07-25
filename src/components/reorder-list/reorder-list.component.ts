
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.scss'],
})
export class ReorderListComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() type: string;
  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onCardClick: EventEmitter<string>;


  constructor() { 
    this.onItemsOrderChanged = new EventEmitter();
    this.onCardClick = new EventEmitter();
  }

  ngOnInit() { }

  reorder(e): void {
    const elementToMove = this.items.splice(e.detail.from, 1)[0];
    this.items.splice(e.detail.to, 0, elementToMove);
    e.detail.complete();
    this.onItemsOrderChanged.emit();
  }

  goToDetails(item: any): void {
    this.onCardClick.emit(item);
  }

}
