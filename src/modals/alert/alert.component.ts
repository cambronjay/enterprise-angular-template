import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'alert-modal',
    templateUrl: './alert.template.html',
    styleUrls: ['./alert.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertModalComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() message: string;

    constructor(private dialogRef: MatDialogRef<AlertModalComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

}