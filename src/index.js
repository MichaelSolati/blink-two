import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blink-two`
 * A second attempt at the HTML Blink Element (`<blink>`). A non-standard element which causes the enclosed text to flash slowly.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BlinkTwo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          animation: 1s blinker linear infinite;
        }
        @keyframes blinker {  
          0% { opacity: 1.0; }
          50% { opacity: 0.0; }
          100% { opacity: 1.0; }
        }
      </style>
      <slot></slot>
    `;
  }
}

window.customElements.define('blink-two', BlinkTwo);
