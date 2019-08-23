import { LitElement, html, customElement, TemplateResult, unsafeCSS, CSSResult } from 'lit-element';
/**
 * `blink-two`
 * A second attempt at the HTML Blink Element (`<blink>`). A non-standard element which causes the enclosed text to flash slowly.
 */
@customElement('blink-two')
export class BlinkTwo extends LitElement {
  public render(): TemplateResult {
    return html`<slot></slot>`;
  }

  static get styles(): CSSResult {
    return unsafeCSS(`
      :host {
        animation: 1s blinker linear infinite;
      }
      @keyframes blinker {  
        0% { opacity: 1.0; }
        50% { opacity: 0.0; }
        100% { opacity: 1.0; }
      }
    `);
  }
}
