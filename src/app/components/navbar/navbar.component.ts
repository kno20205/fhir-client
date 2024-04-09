import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

interface RouteOption {
  path: string;
  displayName: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  selectedRoute: string = '';
  routeOptions: RouteOption[] = [
    { path: '/patients', displayName: 'Patients' },
    { path: '/practitioners', displayName: 'Practitioners' },
    { path: '/conditions', displayName: 'Condition' },
    { path: '/medicinalproduct', displayName: 'Medicinal Product' },
    { path: '/conditiondefinitions', displayName: 'Condition Definition' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Set the default or current route
    this.selectedRoute =
      this.router.url !== '/' ? this.router.url : '/patients';

    // Subscribe to router events and filter for NavigationEnd
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.selectedRoute = event.urlAfterRedirects || event.url;
      });
  }

  onRouteChange(newRoute: string) {
    console.log('Route changed to ' + newRoute);
    this.router.navigate([newRoute]);
  }
}
