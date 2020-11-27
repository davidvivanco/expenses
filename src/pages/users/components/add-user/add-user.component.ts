import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/interfaces/user.interface';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  private userDataForm: FormGroup;
  private avatarSelected: string;
  public avatars: any;
  public editing: boolean;

  @Output() onAvatarSelected: EventEmitter<string>;
  @Output() onAddUser: EventEmitter<User>;
  @Output() onEditUser: EventEmitter<User>;

  @Input() user: User


  constructor(
    private formBuilder: FormBuilder) {
    this.avatars = [
      {
        checked: true,
        img: 'arab_women.png',
      },
      {
        checked: false,
        img: 'black_beard.png',
      },
      {
        checked: false,
        img: 'blonde_beard.png',
      },
      {
        checked: false,
        img: 'bold_men.png',
      },
      {
        checked: false,
        img: 'fringe.png',
      },
      {
        checked: false,
        img: 'himalaya_hat.png',
      },
      {
        checked: false,
        img: 'men_flowers.png',
      },
      {
        checked: false,
        img: 'pink_hair.png',
      },
      {
        checked: false,
        img: 'selena_tee.png',
      },
      {
        checked: false,
        img: 'throw_up.png',
      },
      {
        checked: false,
        img: 'white_hair_women.png',
      },
      {
        checked: false,
        img: 'women_flowers.png',
      }
    ];
    this.onAvatarSelected = new EventEmitter();
    this.onAddUser = new EventEmitter();
    this.onEditUser = new EventEmitter();

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.avatarSelected = (this.user) ? this.user.img : null
    this.createUserDataForm(this.user);
  }

  createUserDataForm(user: User): void {
    this.editing = this.user?.id ? true : false;
    this.userDataForm = this.formBuilder.group({
      name: [this.user?.name, [Validators.required, Validators.maxLength(30)]],
      img: [this.avatarSelected, [Validators.required]]
    })
  }

  avatarChange(e) {
    this.avatarSelected = e;
    this.userDataForm.get('img').setValue(e);
  }

  submit() {  
    this.editing
      ? this.onEditUser.emit({ ...this.userDataForm.value, id: this.user.id })
      : this.onAddUser.emit(this.userDataForm.value);
  }
}
