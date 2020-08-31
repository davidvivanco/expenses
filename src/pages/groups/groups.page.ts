import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { Group } from 'src/models/interfaces/group.interface';
import { SlideOptions } from 'src/models/interfaces/slide-options.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  @ViewChild('mainSlide') slide: IonSlides;

  private component: string;
  private title: string;
  private itemIcon: Array<object>;
  private groups: Array<object>;
  private group: Group;
  private user: User;
  private slideOptions: SlideOptions;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router

  ) {
    this.slideOptions = {
      initialSlide: 1
    }
    this.group = null;
    this.component = 'groups'
    this.title = 'Mis grupos'
    this.itemIcon = [{ size: 'small', name: 'add' }, { name: 'people-outline' }]
    this.getGroups().then();

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

  deleteGroup = (e) => {
    console.log('delete', e);
  }

  editGroup(e) {
    console.log('edit', e);
    e.slidingItem.close()
    this.group = e.item;
    this.slideTo(0);
  }

  async getGroups() {
    this.user = await this.userService.getUser();
    if (this.userBelongsToAGroup()) {
      this.firebaseService.findByOneQuery('groups', ['id', 'in', this.user.groups]).subscribe((groups: any) => {
        this.lockSlides();
        this.reorderGroupsWithUserPreferences(groups)
      });
    }
  }

  async submit(group: Group) {
    const newGroup: Group = await this.createGroup(group);
    await this.updateUserGroups(newGroup);
    this.goToMainPage();
  }

  async createGroup(group: Group): Promise<Group> {
    const newGroup: Group = await this.firebaseService.insertOne('groups', group);
    this.groups.push(group);
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
    console.log(e);
    e.slidingItem.close()
    this.slideTo(2);
  }

  goToUsers = async (group: Group) => {
    console.log(group);
    this.router.navigate([`/users/${group.id}`], { state: { group } });
  }

  goToMainPage = async () => {
    this.slideTo(1);
  }

}



