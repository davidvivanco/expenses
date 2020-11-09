import { Component, ViewChild, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { Group } from 'src/models/interfaces/group.interface';
import { SlideOptions } from 'src/models/interfaces/slide-options.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/services/common.service';


@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  @ViewChild('mainSlide') slide: IonSlides;


  private title: string;
  private groups: Array<object>;
  private group: Group;
  private groupName: string;
  private user: User;
  private slideOptions: SlideOptions;
  private activity: any;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService

  ) {
    this.slideOptions = {
      initialSlide: 1
    }
    this.group = null;
    this.title = 'Mis grupos'
    this.route.queryParams.subscribe(params => {
      this.getGroups(params).then();
    })
  }

  lockSlides(): void {
    this.slide.lockSwipes(true);
  }

  unLockSlides(): void {
    this.slide.lockSwipes(false);
  }

  reorderGroupsWithUserPreferences(groups: Array<Group>) {
    this.groups = [];
    groups.forEach((group: any) => {
      const index = this.user.groups.findIndex(g => g === group.id);
      this.groups[index] = group;
      this.slide.lockSwipes(true);
    });
  }

  setSlidePage = (index: number) => {
    this.slide.lockSwipes(false);
    this.slide.slideTo(index);
  }

  onSlidesMove() {
    this.slide.getActiveIndex().then(index => {
      (this.isMainPage(index))
        ? this.lockSlides()
        : this.unLockSlides()
    });
  }

  slideTo = (index: number) => this.setSlidePage(index);

  userBelongsToAGroup = (): boolean => this.user.groups.length > 0;

  isMainPage = (index: number): boolean => index === 1;

  addGroup() {
    this.group = null
    this.slideTo(0);
  }

  goEditGroupView(e) {
    if (e.slidingItem) e.slidingItem.close()
    this.group = e.group;
    this.slideTo(0);
  }

  getActivity(group: Group) {
    this.groupName = group.name;
    this.firebaseService.findByOneQuery('activity', ['groupId', '==', group.id]).subscribe((activity: any) => {
      console.log(activity);
      this.activity = activity;
      this.slideTo(2);
    })
  }


  async getGroups(params) {
    this.user = await this.userService.getUser();
    if (this.userBelongsToAGroup()) {
      this.firebaseService.findByOneQuery('groups', ['id', 'in', this.user.groups]).subscribe((groups: any) => {
        this.lockSlides();
        this.getTotalUsersPerGroup(groups).then(res => {
          this.groups = groups || [];
          //this.reorderGroupsWithUserPreferences(groups)
          if (params.groupId) {
            this.unLockSlides()
            const group = this.groups.find((g: Group) => g.id === params.groupId);

            (params.activity)
              ? this.getActivity(group)
              : this.goEditGroupView({ group });
          }
          console.log('GROUPS', this.groups);

        });
      });
    } else this.groups = [];
  }

  async getTotalUsersPerGroup(groups: Array<Group>) {
    for (const group of groups) {
      group.totalExpenses = await this.firebaseService.getTotalExpenses(group.id, 'groupId')
    }
  }

  async submit(group: Group) {
    const newGroup: Group = await this.createGroup(group);
    await this.updateUserGroups(newGroup);
    this.goToMainPage();
    await this.firebaseService.insertOne('activity', {
      type: 'addGroup',
      userId: this.user.id,
      groupId: newGroup.id,
      date: this.commonService.getDate(),
      img: this.user.imageUrl || this.user.img,
      message: `${this.user.name} ha creado el grupo ${group.name}`
    })
  }

  async editGroup(group: Group) {
    this.firebaseService.updateById('groups', group.id, group);
    this.goToMainPage();
    await this.firebaseService.insertOne('activity', {
      type: 'editGroup',
      userId: this.user.id,
      groupId: group.id,
      date: this.commonService.getDate(),
      img: this.user.imageUrl || this.user.img,
      message: `${this.user.name} ha editado el grupo ${group.name}`
    })
  }

  async createGroup(group: Group): Promise<Group> {
    const newGroup: Group = await this.firebaseService.insertOne('groups', group);
    this.groups.push({ ...group, id: newGroup.id });
    return newGroup;
  }

  async updateUserGroups(newGroup) {
    this.user.groups.push(newGroup.id)
    await this.userService.setUser(this.user);
    await this.firebaseService.updateById('users', this.user.id, this.user)
  }

  async reorderGroups() {
    const groupIdsContainer = this.groups.map((group: any) => group.id);
    await this.firebaseService.updateById('users', this.user._id, { groups: groupIdsContainer })
    this.user.groups = groupIdsContainer;
    this.userService.setUser(this.user);
  }

  goToActivity(e) {
    e.slidingItem.close()
    this.getActivity(e.group)
  }

  goToUsers = async (group: Group) => {
    this.router.navigate([`/users/${group.id}`], { state: { group } });
  }

  goToMainPage = async () => {
    this.slideTo(1);
  }

}



