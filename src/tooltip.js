/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
// eslint-disable-next-line import/prefer-default-export
class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this._tooledObj = {};
    this._clicked = false;
  }

  static get observedAttributes() {
    return ['tooltip-for', 'clicked'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async render() {
    this.clean();
    this._clicked = this.getAttribute('clicked') !== null;
    this._tooledObj = document.getElementById(this.getAttribute('tooltip-for'));
    console.log(this._tooledObj.offsetTop);
  }

  clean() {
    this.shadow.childNodes.forEach(child => child.remove());
  }

  connectedCallback() {
    this.createShadow();
  }

  createShadow() {
    const rect = this._tooledObj.getBoundingClientRect();
    const template = `
      <style>
        .tooltip {
          width:160px;
          background-color: rgba(10, 10, 10, 0.493);
          box-shadow: 1px 1px 3px rgba(90, 90, 90, 0.541);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 500;
          border-radius: 8px;
          color: #FFF;
          padding: 5px 0px;
          text-align: center;
          visibility:hidden;
          opacity:0;
          transition: opacity .6s;
        }
  
        .tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: rgba(10, 10, 10, 0.493) transparent transparent transparent;
        }
      </style>
  
      <div class="tooltip">
          ${this.innerHTML}
      </div>
      `;
    this.shadow.innerHTML = template;
    const tooltip = this.shadow.querySelector('.tooltip');

    window.addEventListener('scroll', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    if (this._clicked === true) {
      this._tooledObj.addEventListener('click', () => {
        tooltip.style.top = `${this._tooledObj.offsetTop - window.scrollY + 100 - rect.height * 2}px`;
        tooltip.style.left = `${rect.x - (rect.width / 2)}px`;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });
      this._tooledObj.addEventListener('focusout', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });
    } else {
      this._tooledObj.addEventListener('mouseover', () => {
        tooltip.style.top = `${this._tooledObj.offsetTop - window.scrollY + 100 - rect.height * 2}px`;
        tooltip.style.left = `${rect.x - (rect.width / 2)}px`;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });
      this._tooledObj.addEventListener('mouseout', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });
    }
  }
}

export default () => customElements.define('tool-tip', Tooltip);
