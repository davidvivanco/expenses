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
  private newGroup: Group

  @Output() onAvatarSelected: EventEmitter<string>;
  @Output() onSubmit: EventEmitter<Group>;

  @Input() group: Group

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.onAvatarSelected = new EventEmitter();
    this.onSubmit = new EventEmitter();
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
    this.groupDataForm = this.formBuilder.group({
      name: [this.group?.name, [Validators.required, Validators.maxLength(30)]],
      mode: [this.group?.name, [Validators.required]],
      currency: [this.group?.currency, [Validators.required]],
    })
  }

  submit() {
    let newGroup = { ...this.groupDataForm.value, img: this.avatarSelected }
    this.onSubmit.emit(newGroup);
  }

}
