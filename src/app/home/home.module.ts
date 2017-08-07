import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FlexLayoutModule} from '@angular/flex-layout';

// Angular Material components
import {MdTabsModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdListModule} from '@angular/material';

import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgxChartsModule,
        FlexLayoutModule,
        CoreModule,
        SharedModule,
        HomeRoutingModule,
        MdTabsModule,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdListModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: []
})
export class HomeModule {
}
