import { Component, Output, EventEmitter, Input } from '@angular/core';

interface Avatar {
  checked: boolean,
  img: string,
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  private avatars: Array<Avatar>;
  private avatarSlide: any

  @Output() onAvatarSelected: EventEmitter<string>;
  @Input() avatarSelected: string;


  constructor() {
    this.avatarSlide = {
      slidesPerView: 3.5
    };
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
