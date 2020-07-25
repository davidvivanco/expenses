import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  user: User;
  @Input() title:string 

  constructor(
    private userService: UserService
  ) {
    this.userService.getUser().then(user => {
      this.user = user;
    });


  }

  ngOnInit() { }

}
