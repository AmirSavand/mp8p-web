import { Component } from '@angular/core';
import { LinkListItem } from 'src/app/shared/interfaces/link-list-item';

@Component({
  selector: 'app-readme',
  templateUrl: './readme.component.html',
  styleUrls: ['./readme.component.scss'],
})
export class ReadmeComponent {

  readonly information: string[] = [
    'Version: v0.1.0',
    'Published: Jan, 2020',
    'License: GPL-3.0',
  ];

  readonly sourceCodes: LinkListItem[] = [
    {
      text: 'Core (back-end)',
      link: 'https://github.com/AmirSavand/mp8p-core',
    },
    {
      text: 'Web (front-end)',
      link: 'https://github.com/AmirSavand/mp8p-web',
    },
  ];

  readonly technologies: LinkListItem[] = [
    {
      text: 'Django',
      link: 'https://djangoproject.com',
    },
    {
      text: 'Flask',
      link: 'https://palletsprojects.com/p/flask',
    },
    {
      text: 'Angular',
      link: 'https://angular.io',
    },
    {
      text: 'Bootstrap',
      link: 'https://getbootstrap.com',
    },
    {
      text: 'Pusher',
      link: 'https://pusher.com',
    },
    {
      text: 'JetBrains',
      link: 'https://jetbrains.com',
    },
    {
      text: 'PyCharm',
      link: 'https://jetbrains.com/pycharm',
    },
    {
      text: 'WebStorm',
      link: 'https://jetbrains.com/webstorm',
    },
  ];

  readonly feedback: LinkListItem[] = [
    {
      text: 'Email Us',
      link: 'mailto:games@savandbros.com',
    },
    {
      text: 'GitHub Issues',
      link: 'https://github.com/AmirSavand/mp8p-web/issues',
    },
  ];

  readonly savandbros = 'https://savandbros.com';

  readonly currentYear: number = new Date().getFullYear();
}
