import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserRequest } from './models/user-request.model';
import { UserResult } from './models/user-result.model';
import { User } from './models/user.model';
import { UserResource } from './resources/user.resource';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  public totalCount: number = 0;
  public users: User[] = [];

  private resource = inject(UserResource);
  private request: UserRequest = new UserRequest();
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private getData() {
    this.resource.search(this.request)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: UserResult) => {
          this.totalCount = data.totalCount;
          this.users = data.results;
        }
      })
  }
}
