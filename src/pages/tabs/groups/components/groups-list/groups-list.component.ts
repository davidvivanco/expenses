import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/models/interfaces/group.interface';
import { User } from 'firebase';
import { IonItemSliding } from '@ionic/angular';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit {

  @Input() groups: Array<Group>;
  @Input() user: User;

  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onClick: EventEmitter<Group>;
  @Output() onActivity: EventEmitter<{ group: Group, slidingItem: IonItemSliding }>;
  @Output() onDelete: EventEmitter<{ index: number, group: Group }>;
  @Output() onEdit: EventEmitter<{ group: Group, slidingItem: IonItemSliding }>;


  constructor(
    private commonService: CommonService
  ) {
    this.onItemsOrderChanged = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onActivity = new EventEmitter();
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
  }

  ngOnInit() {
  }

  clickInItem(group: Group, slidingItem) {
    if (!Object.values(slidingItem.el.classList).includes('item-sliding-active-options-end'))
      this.onClick.emit(group);
  }

  async delete(index: number, group: any,slidingItem:IonItemSliding) {
    slidingItem.close();
    await this.commonService.deleteWarningAlert({
      collection:'groups',
      id:group.id,
      header: 'Eliminar grupo A',
      message: 'Estas seguro',
      element:group
    })
  }

  edit(group: Group, slidingItem: IonItemSliding) {
    this.onEdit.emit({ group, slidingItem });
  }

  activity(group: Group, slidingItem) {
    this.onActivity.emit({ group, slidingItem });
  }

}
