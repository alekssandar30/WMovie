import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from './shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Srbilix';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'keywords',
        content:
          'Movie, Online, Free, watch, Watch, movies, online, new, tv, TV series, serije online, novi filmovi, serije, film, serija, filmovi, srbilix, besplatni, sa prevodom, filmovi sa prevodom, serije sa prevodom',
      },
      { name: 'author', content: 'Aleksandar Novakovic' },
      { name: 'description', content: 'Online movie watching application' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' },
    ]);

    // canonical urls
    this.canonicalService.setCanonicalURL();
  }
}
