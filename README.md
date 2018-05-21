# web-components
## Custom Web Components

[Code for the Medium article: Web Components — How we created a Web component with Stencil JS](https://medium.com/ionic-book/web-components-how-to-create-a-component-with-stencil-3753c20b1b12)

Usage sample:

```javascript

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
  ```
