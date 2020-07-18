import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
  }

  goBack(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() { }

}
