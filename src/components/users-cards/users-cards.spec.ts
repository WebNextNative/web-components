import { flush, render } from '@stencil/core/testing';
import { UsersCards } from './users-cards';
import {users_cards} from "./users-cards-model";

/**
 *
 * localStorage fake
 */
var localStorageMock = (() => {
  var store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value;
    },
    clear: function() {
      store = {};
    }
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

/**
 * Unit tests
 */

describe('users-cards', () => {
  it('should build', () => {
    expect(new UsersCards()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {

      // init card values
      window.localStorage.clear()
      window.localStorage.setItem("users_cards", JSON.stringify(users_cards))

      // render tag
      element = await render({
        components: [UsersCards],
        html: '<users-cards></users-cards>'
      });
    });

    it('should work without parameters', async () => {

      let width = window.innerWidth
      console.log("Window width: " + width)

      await flush(element);
      const list = element.querySelector('ion-row');
      expect(list.children.length).toEqual(6);
    });


    it('should work with parameters', async () => {

      let width = window.innerWidth
      console.log("Window width: " + width)

      element.columns = "4";
      await flush(element);
      const list = element.querySelector('ion-row');
      expect(list.children.length).toEqual(4);
    });

  });
});
