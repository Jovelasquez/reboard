import 'rxjs/add/operator/finally';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GithubService} from '../core/github.service';
// import {Guser} from '../core/models/guser.model';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import {single, multi} from './data';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    //
    users: any;
    founder: any;
    isLoading: boolean;
    // TODO: Use an interface here
    commits: any[] = [
        {
            'name': 'Commits',
            'series': []
        }
    ];
    languages: any[] = [];
    contributors: any[] = [];
    // totalContributors: any;
    repoInfo: any;

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    legendTitle = '';
    showXAxisLabel = true;
    xAxisLabel = 'Week';
    showYAxisLabel = true;
    yAxisLabel = 'Commits';

    colorScheme = {
        domain: ['#FE7675', '#2095F2', '#4DAE4E', '#FE9900']
    };

    // line, area
    autoScale = true;

    folders = [
        {
            name: 'Photos',
            updated: new Date('1/1/16')
        },
        {
            name: 'Recipes',
            updated: new Date('1/17/16')
        },
        {
            name: 'Work',
            updated: new Date('1/28/16')
        }
    ];

    constructor(private githubService: GithubService) {
        Object.assign(this, {single, multi});
    }

    ngOnInit() {
        this.isLoading = true;

        Observable
            .forkJoin([
                this.githubService.getFounder(),
                this.githubService.getUsers(),
                this.githubService.getParticipation(),
                this.githubService.getLanguages(),
                this.githubService.getContributors(),
                this.githubService.getRepoInfo()
            ])
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(results => {
                this.founder = results[0];
                this.users = results[1];
                results[2].all.map((obj: any, idx: number) =>
                    this.commits[0].series.push({
                        'name': idx + 1,
                        'value': obj
                    }));
                Object.keys(results[3]).map(
                    (obj, idx) => this.languages.push(
                        {'name': obj, 'value': results[3][obj]}
                    )
                );
                results[4].map(
                    (obj: any, idx: number) => {
                        if (idx < 10) {
                            this.contributors.push(
                                {'name': obj.login, 'value': obj.contributions}
                            )
                        }
                    }
                );
                // this.totalContributors = results[4].length;
                this.repoInfo = results[5];
            }, err => {
                console.log(err);
            });


        // this.githubService
        //     .getUsers()
        //     .finally(() => {
        //         this.isLoading = false;
        //     })
        //     .subscribe(res => {
        //         this.users = res;
        //     }, err => {
        //         console.log(err);
        //     });

    }

    onSelect(event: any) {
        console.log(event);
    }

}
