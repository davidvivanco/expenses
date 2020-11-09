import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from 'src/models/interfaces/group.interface';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {

  private groupDataForm: FormGroup;
  private avatarSelected: string;
  private newGroup: Group;
  private editing: boolean;
  public avatars: any;


  @Output() onAvatarSelected: EventEmitter<string>;
  @Output() onSubmit: EventEmitter<Group>;
  @Output() onEdit: EventEmitter<Group>;

  @Input() group: Group

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.avatars = [
      {
        checked: true,
        img: 'beer.png',
      },
      {
        checked: false,
        img: 'heart.png',
      },
      {
        checked: false,
        img: 'pizza.png',
      },
      {
        checked: false,
        img: 'plane.png',
      },
      {
        checked: false,
        img: 'fuel.png',
      },
      {
        checked: false,
        img: 'hamburguer.png',
      },
      {
        checked: false,
        img: 'gift.png',
      },
      {
        checked: false,
        img: 'shopping_cart.png',
      },
      {
        checked: false,
        img: 'tools.png',
      }
    ];
    this.onAvatarSelected = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onEdit = new EventEmitter();
  }

  ngOnChanges() {
    this.createGroupDataForm(this.group);
    this.avatarSelected = (this.group) ? this.group.img : null
  }

  get nameIsNoValid() {
    return this.groupDataForm.get('name').invalid && this.groupDataForm.get('name').touched
  }

  avatarChange(img: string): void { this.avatarSelected = img }

  createGroupDataForm(group: Group): void {
    this.editing = this.group ? true : false;
    this.groupDataForm = this.formBuilder.group({
      name: [this.group?.name, [Validators.required, Validators.maxLength(30)]],
      mode: [this.group?.mode, [Validators.required]],
      currency: [this.group?.currency, [Validators.required]],
    })
  }

  submit() {
    const group = { ...this.groupDataForm.value, img: this.avatarSelected };
    if (!this.editing) {
      this.newGroup = group
      this.onSubmit.emit(this.newGroup);
    } else {
      this.onEdit.emit({ ...group, id: this.group.id })
    }
  }

}
