import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlideOptions } from 'src/models/interfaces/slide-options.interface';
import { IonSlides, Platform } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/interfaces/user.interface';
import { Group } from 'src/models/interfaces/group.interface';
import { ModalController } from '@ionic/angular';
import { ContactsComponent } from './modals/contacts/contacts.component';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { CommonService } from 'src/services/common.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  slideOptions: SlideOptions
  groupId: string;
  title: string;
  group: Group;
  users: Array<User>;
  user: User;
  userLogged: User;
  activity: any;

  @ViewChild('mainSlide') slide: IonSlides;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public modalController: ModalController,
    private platform: Platform,
    private contacts: Contacts,
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.slideOptions = {
      initialSlide: 1
    }

    this.userService.getUser().then((user: User) => {
      this.userLogged = user;
    })
  }

  ngOnInit() {
    this.title = `Usuarios`
    this.route.params.subscribe((params: Params) => {
      this.groupId = params.groupId;
      this.getGroup()
      this.getUsers()
    });
  }

  getGroup() {
    this.firebaseService.findByOneQuery('groups', ['id', '==', this.groupId]).subscribe(groups => {
      this.group = groups[0];
    });
  }

  getUsers() {
    this.firebaseService.findByTwoQueries('users', ['fakeUser', '==', true], ['groups', 'array-contains', this.groupId]).subscribe(users => {
      this.getTotalExpensesPerUser(users).then(res => {
        this.users = users;
        this.lockSlides();
      })
    });
  }

  async getTotalExpensesPerUser(users?: Array<User>) {
    if (!users) users = this.users;
    for (const user of users) {
      user.totalExpenses = await this.firebaseService.getTotalExpenses(user.id, 'userId')
    }
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

  goToActivity(user: User) {
    console.log(user);
    this.getActivity(user);
  }

  getActivity(user: User) {
    this.firebaseService.findByTwoQueries('activity',
      ['userId', '==', user.id],
      ['groupId', '==', this.groupId]
    ).subscribe((activity: any) => {
      console.log(activity);
      this.activity = activity;
      this.slideTo(2);
    })
  }

  editGroup(e: any) {
      this.router.navigate([`/tabs/groups`], { queryParams: { groupId: this.groupId } })

  }

  goEditUserView(user: User) {
    this.user = user;
    this.slideTo(0)
  }

  goToMainPage = async () => {
    this.slideTo(1);
  }

  async editUser(user: User) {
    await this.firebaseService.updateById('users', user.id, user)
    this.goToMainPage();
    await this.firebaseService.insertOne('activity', {
      type: 'editUser',
      userLogged: this.userLogged,
      user: user,
      img: this.userLogged.imageUrl || this.userLogged.img,
      group: this.group,
      date: new Date().getTime(),
      message: `${this.userLogged.name} ha editado al usuario ${user.name}`
    })
  }

  goToExpenses(e) {
  }

  async addUser(user?: User) {
    if (user) {
      this.firebaseService.insertOne(
        'users',
        {
          ...user,
          groups: [this.groupId],
          fakeUser: true
        }
      )
      this.slideTo(1);
      await this.firebaseService.insertOne('activity', {
        type: 'addUser',
        userLogged: this.userLogged,
        user,
        img: this.userLogged.imageUrl || this.userLogged.img,
        group: this.group,
        date: new Date().getTime(),
        message: `${this.userLogged.name} ha añadido al usuario ${user.name}`
      })
    }
    else {
      if (this.platform.is('cordova')) {
        this.contacts.find(['*'], {
          filter: '',
          multiple: true,
          hasPhoneNumber: true
        }).then(async (contacts: Contact[]) => {
          await this.contactsModal(contacts);

        });
      } else {
        await this.contactsModal();
      }
    }
  }

  slideTo = (index: number) => this.setSlidePage(index);

  setSlidePage = (index: number) => {
    if (index === 1) this.user = null;
    this.slide.lockSwipes(false);
    this.slide.slideTo(index);
  }

  async addExpense(user: User) {
    await this.addExpenseModal(user)

  }

  activityGroup(group: Group) {
    this.router.navigate([`/tabs/groups`], { queryParams: { groupId: this.groupId, activity: true } })
  }

  async deleteGroup() {
    await this.commonService.deleteWarningAlert({
      collection: 'groups',
      id: this.groupId,
      header: 'Eliminar grupo A',
      message: 'Estas seguro',
      element: this.group
    })
  }

  async addExpenseModal(user: User) {
    await this.commonService
      .addExpenseAlert(user, this.group, this.userLogged, { users: this.users });

  }

  async contactsModal(contacts?) {
    const modal = await this.modalController.create({
      component: ContactsComponent,
      componentProps: {
        data: contacts
      }
    });
    modal.onDidDismiss().then((res: any) => {
      if (res?.data?.contact) {
        this.user = {
          name: res.data.contact.displayName
        }
        this.slideTo(0);
      }
    })

    return await modal.present();

  }
}
