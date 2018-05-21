import { Component } from '@stencil/core';
import {users_cards} from "../users-cards/users-cards-model";


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  componentWillLoad() {
    window.localStorage.removeItem("users_cards")
    window.localStorage.setItem("users_cards", JSON.stringify(users_cards))
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Ionic PWA Toolkit</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <p>
          <users-cards></users-cards>
          <hr/>
          <users-cards columns="4" ></users-cards>
        </p>
        <p>
          Welcome to the Ionic PWA Toolkit.
          You can use this starter to build entire PWAs all with
          web components using Stencil and ionic/core! Check out the readme for everything that comes in this starter out of the box and
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>

        <ion-button href='/profile/stencil'>
          Profile page
        </ion-button>
      </ion-content>
    ];
  }
}
