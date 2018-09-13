import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
//import { slideInDownAnimation } from '../../app/app.animations';
@Component({
  selector: 'not-found-screen',
  templateUrl: './not-found.template.html',
  styleUrls: ['./not-found.scss'],
  //animations: [slideInDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotFoundScreenComponent implements OnInit, OnDestroy {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position')  position = 'absolute';
  constructor() { }

  ngOnInit() { }

  ngOnDestroy() { }

}