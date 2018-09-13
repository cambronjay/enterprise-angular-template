import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
//import { slideInDownAnimation } from '../../app/app.animations';
@Component({
  selector: 'pending-screen',
  templateUrl: './pending.template.html',
  styleUrls: ['./pending.scss'],
  //animations: [slideInDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PendingScreenComponent implements OnInit, OnDestroy {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position')  position = 'absolute';
  constructor() { }

  ngOnInit() { }

  ngOnDestroy() { }

}