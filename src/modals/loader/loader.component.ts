import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'loader-modal',
    templateUrl: './loader.template.html',
    styleUrls: ['./loader.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderModalComponent implements OnInit, OnDestroy {
    @Input() message: string;

    constructor(private dialogRef: MatDialogRef<LoaderModalComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        this.message = data.message;
    }

    ngOnInit() {

    }  

    ngOnDestroy() {

    }

}