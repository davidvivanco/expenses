import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

interface Avatar {
  checked: boolean,
  img: string,
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit{

  private avatarSlide: any

  @Output() onAvatarSelected: EventEmitter<string>;

  @Input() avatarSelected: string;
  @Input() avatars: Array<Avatar>;
  @Input() folder: string;


  constructor() {
    this.onAvatarSelected = new EventEmitter();
  }

  ngOnInit(): void {
    this.avatarSlide = {
      slidesPerView: 3.5
    };
   
    this.onAvatarSelected.emit(this.getAvatarChecked().img);
  }

  ngOnChanges() {
    if (this.avatarSelected) this.setAvatarChecked(this.avatarSelected)
    else {
      this.resetAvatars()
      this.avatars[0].checked = true
    }
  }

  setAvatarChecked(img: string): void {
    this.resetAvatars();
    this.avatars.forEach(avatar => {
      if (avatar.img === img) avatar.checked = true;
    })
  }

  resetAvatars = (): void => this.avatars.forEach(avatar => avatar.checked = false);

  getAvatarChecked = (): Avatar => this.avatars.find(avatar => avatar.checked);

  checkAvatar(avatar) {
    this.resetAvatars();
    avatar.checked = true;
    this.onAvatarSelected.emit(avatar.img);
  }
}
