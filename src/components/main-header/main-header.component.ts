import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  user: User;
  @Input() showGoBackButton: boolean
  @Input() title: string
  @Input() component: string
  @Input() backPath: string

  @Output() onGoBack: EventEmitter<boolean>

  constructor(
    private userService: UserService
  ) {
    this.onGoBack = new EventEmitter();
    this.userService.getUser().then(user => {
      this.user = user;
    });


  }

  ngOnInit() { }


  goBack() {
    this.onGoBack.emit(true);
  }
}
