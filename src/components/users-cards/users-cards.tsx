import {Component, EventEmitter, Listen, Method, Prop, State, Event} from '@stencil/core';

@Component({
  tag: 'users-cards',
  styleUrl: 'users-cards.scss',
  shadow: true
})
export class UsersCards {

  @Prop() columns: string;
  @State() cardsPerRow: number;
  @Event() initCompleted: EventEmitter;

  getCardsPerRow(): number {
    if(this.columns) {
      this.cardsPerRow = +this.columns
      return this.cardsPerRow;
    } else {
      return this.cardsPerRow;
    }
  }

  @Method()
  initComponent(users_cards) {
    window.localStorage.removeItem("users_cards")
    window.localStorage.setItem("users_cards", JSON.stringify(users_cards))

    this.initCompleted.emit("done");
    this.windowResize()
  }

  @Listen('window:resize')
  windowResize() {
    console.log('Params columns: ' + this.columns);
    if(this.columns) {
      this.cardsPerRow = +this.columns
    } else {
      let width = window.innerWidth
      console.log(width)
      if (width <= 540) {
        this.cardsPerRow = 2;
      }
      if (width > 540 && width <= 960) {
        this.cardsPerRow = 4;
      }
      if (width > 960 && width <= 1140) {
        this.cardsPerRow = 6;
      }
      if (width > 1140) {
        this.cardsPerRow = 10;
      }
    }
    console.log('Component is about to be rendered. Columns: ' + this.cardsPerRow);
  }

  /**
   * Component Lifecycle Method
   */
  componentWillLoad() {
    this.windowResize()
  }

  getCardsMatrix(): Array<Array<any>>  {
    let cards = JSON.parse(window.localStorage.getItem("users_cards"))
    if(cards) {
      let rows = cards.reduce((acc, card, currentIndex) => {
        if (currentIndex % this.getCardsPerRow() == 0 && currentIndex !== 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(card);
        return acc;
      }, [[]]);
      // console.log(JSON.stringify(rows, null, 2))
      return rows
    } else {
      return []
    }
  }

  render() {
    return (
      <ion-grid class="ion-cards-container">
        {this.getCardsMatrix().map((row) =>
          <ion-row>
            {row.map((card) =>

              <ion-col class="ion-card" style={{ backgroundImage: "url(" + card.avatarUrl + ")"}}>
                <div class="overlay"></div>
                <div class="content-wrapper">
                  <h4>{card.title}</h4>
                  <div>
                    <a>
                      <span class="number"><strong>{card.views}</strong></span>
                      <ion-icon color="primary" name="eye"></ion-icon>
                    </a>
                    <a>
                      <span class="number"><strong>{card.streams}</strong></span>
                      <ion-icon color="primary" name="videocam"></ion-icon>
                    </a>
                    <a>
                      <span class="number"><strong>{card.likes}</strong></span>
                      <ion-icon  color="primary"name="flag"></ion-icon>
                    </a>
                  </div>
                </div>
                <div>
                  <div class="content-badge">
                    { card.online == 'online'
                      ? <ion-badge color="secondary" item-end>{card.online}</ion-badge>
                      : ( card.online == 'offline'
                          ? <ion-badge color="primary" item-end>{card.online}</ion-badge>
                          : <ion-badge color="twitter" item-end>{card.online}</ion-badge>
                      )
                    }
                  </div>
                  <div class="provider-badge">
                    { card.provider == 'facebook.com'
                      ? <a target="_blank" href="https://www.facebook.com/{card.uid}">
                        <ion-badge color="facebook" item-end class="facebook">
                          <ion-icon name="logo-facebook"></ion-icon>
                        </ion-badge>
                      </a>
                      : ( card.provider == 'google.com'
                          ? <a target="_blank" href="https://plus.google.com/{card.uid}">
                            <ion-badge color="google" item-end class="google">
                              <ion-icon name="logo-google"></ion-icon>
                            </ion-badge>
                          </a>
                          : <a target="_blank" href="https://twitter.com/intent/user?user_id={card.uid}">
                            <ion-badge color="twitter" item-end class="twitter">
                              <ion-icon name="logo-twitter"></ion-icon>
                            </ion-badge>
                          </a>
                      )
                    }
                  </div>

                  <div class="gender-badge">
                    { card.gender == 'female'
                      ? <ion-badge item-end class="female">
                          <ion-icon name="female" ></ion-icon>
                        </ion-badge>
                      : <ion-badge item-end>
                          <ion-icon name="male"></ion-icon>
                        </ion-badge>
                    }
                  </div>

                  <div class="locale-badge">
                    { card.country
                      ? <img src={'/assets/img/flags_iso/24/' + card.country + '.png'}/>
                      : <div/>
                    }

                  </div>
                </div>
              </ion-col>
            )}
          </ion-row>
        )}
      </ion-grid>
    );
  }
}
