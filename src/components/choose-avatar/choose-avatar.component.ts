import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss'],
})
export class ChooseAvatarComponent {

  @Input() type: string

  private userAvatarsData;

  constructor() {
    this.userAvatarsData = [
      [
        {
          value: 'women_flowers.png',
          img: '../../../../assets/img/users-avatar/women_flowers.png',
        },
        {
          value: 'arab_women.png',
          img: '../../../../assets/img/users-avatar/arab_women.png',
        },
        {
          value: 'black_beard.png',
          img: '../../../../assets/img/users-avatar/black_beard.png',
        },
        {
          value: 'blonde_beard.png',
          img: '../../../../assets/img/users-avatar/blonde_beard.png',
        },
        {
          value: 'bold_men.png',
          img: '../../../../assets/img/users-avatar/bold_men.png',
        },
        {
          value: 'fringe.png',
          img: '../../../../assets/img/users-avatar/fringe.png',
        }
      ],
      [
        {
          value: 'himalaya_hat.png',
          img: '../../../../assets/img/users-avatar/himalaya_hat.png',
        },
        {
          value: 'men_flowers.png',
          img: '../../../../assets/img/users-avatar/men_flowers.png',
        },
        {
          value: 'pink_hair.png',
          img: '../../../../assets/img/users-avatar/pink_hair.png',
        },
        {
          value: 'selena_tee.png',
          img: '../../../../assets/img/users-avatar/bold_men.png',
        },
        {
          value: 'throw_up.png',
          img: '../../../../assets/img/users-avatar/throw_up.png',
        },
        {
          value: 'white_hair_women.png',
          img: '../../../../assets/img/users-avatar/white_hair_women.png',
        }
      ]
    ];



  }

}
