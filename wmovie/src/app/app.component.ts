import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from './shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Srbilix - Online HD filmovi sa prevodom';

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
          'serije online, novi filmovi, serije, film, serija, filmovi, srbilix, besplatni, sa prevodom, filmovi sa prevodom, serije sa prevodom, online filmovi, filmovi sa prevodom, online filmovi sa prevodom, strani filmovi, besplatni filmovi, najnoviji filmovi, popularni filmovi',
      },
      { name: 'author', content: 'Aleksandar Novakovic' },
      {
        name: 'description',
        content:
          'Gledajte najbolje filmove besplatno , Online strani filmovi sa prevodom, besplatno gledajte filmove',
      },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'og:locale',
        content: 'sr_RS',
      },
      {
        name: 'og:type',
        content: 'website',
      },
      {
        name: 'og:title',
        content: `${this.title}`,
      },
      {
        name: 'og:description',
        content:
          'Gledajte najbolje filmove besplatno , Online strani filmovi sa prevodom, besplatno gledajte filmove',
      },
      {
        name: 'og:site_name',
        content: `${this.title}`,
      },
      { charset: 'UTF-8' },
    ]);

    // canonical urls
    this.canonicalService.setCanonicalURL();
  }
}
