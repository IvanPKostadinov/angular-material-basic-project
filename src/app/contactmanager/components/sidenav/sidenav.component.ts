import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public isScreenSmall!: boolean;

  users!: Observable<User[]>;
  isDarkTheme = false;
  changeDirection = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDirection() {
    this.changeDirection = !this.changeDirection;
  }

  ngOnInit(): void {
    this.breakpointObserver
      // .observe([ Breakpoints.XSmall ])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    this.users = this.userService.users;
    this.userService.loadAll();

    // this.users.subscribe((data) => {
    //   if (data.length > 0) {
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   }
    // });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        // close our sidenav when we click on a contact on small screen devices
        this.sidenav.close();
      }
    });
  }
}
