import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlideOptions } from 'src/models/interfaces/slide-options.interface';
import { IonSlides } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/interfaces/user.interface';
import { Group } from 'src/models/interfaces/group.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  slideOptions: SlideOptions
  groupId: string;
  title: string;
  group:Group;
  users: Array<User>;

  @ViewChild('mainSlide') slide: IonSlides;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
    this.slideOptions = {
      initialSlide: 1
    }
  }

  ngOnInit() {
    this.group = this.router.getCurrentNavigation().extras.state.group;
    this.title = `Usuarios`
    this.route.params.subscribe((params: Params) => {
      console.log('parmas', params);
      this.groupId = params.groupId;
      this.getUsers().then();
    });
  }


  async getUsers() {
    this.firebaseService.findByOneQuery('users', ['groups', 'array-contains', this.groupId]).subscribe(users => {
      this.users = users;
      this.lockSlides();

    });
  }

  goBack() {
    this.router.navigate(['/tabs/groups'])
  }

  onSlidesMove() {
    this.slide.getActiveIndex().then(index => {
      (this.isMainPage(index))
        ? this.lockSlides()
        : this.unLockSlides()
    });
  }

  isMainPage = (index: number): boolean => index === 1;


  lockSlides(): void {
    this.slide.lockSwipes(true);
  }

  unLockSlides(): void {
    this.slide.lockSwipes(false);
  }

  goToActivity(e){
    console.log(e);
  }

  editUser(e){
    console.log(e);
  }

  deleteUser(e){
    console.log(e);
  }

  goToExpenses(e){
    console.log(e);
  }

  addUser() {
    this.slideTo(0);
  }

  slideTo = (index: number) => this.setSlidePage(index);

  setSlidePage = (index: number) => {
    this.slide.lockSwipes(false);
    this.slide.slideTo(index);
  }

}
