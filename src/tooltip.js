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
    this._content = null;
  }

  static get observedAttributes() {
    return ['tooltip-for', 'clicked', 'content'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  async render() {
    this.clean();
    this._clicked = this.getAttribute('clicked') !== null;
    this._content = this.getAttribute('content');
    this._tooledObj = document.getElementById(this.getAttribute('tooltip-for'));
  }

  clean() {
    this.shadow.childNodes.forEach(child => child.remove());
  }

  connectedCallback() {
    this.createShadow();
  }

  createShadow() {
    const rect = this._tooledObj.getBoundingClientRect();
    const toolContent = this._content == null ? this.innerHTML : this._content;
    const template = `
      <style>
        .tooltip {
          width:160px;
          background-color: rgba(10, 10, 10, 0.900);
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
          border-color: rgba(10, 10, 10, 0.900) transparent transparent transparent;
        }
      </style>
  
      <div class="tooltip">
          ${toolContent}
      </div>
      `;
    this.shadow.innerHTML = template;
    const tooltip = this.shadow.querySelector('.tooltip');

    const tooltipRect = tooltip.getBoundingClientRect();

    window.addEventListener('scroll', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    if (this._clicked === true) {
      console.log('klik');
      this._tooledObj.addEventListener('click', () => {
        tooltip.style.top = `${this._tooledObj.offsetTop - window.scrollY - rect.height + 5}px`;
        tooltip.style.left = `${this._tooledObj.offsetLeft - window.scrollX - (tooltipRect.width - rect.width) / 2}px`;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });
      this._tooledObj.addEventListener('focusout', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });
    } else {
      this._tooledObj.addEventListener('mouseover', () => {
        tooltip.style.top = `${this._tooledObj.offsetTop - window.scrollY - rect.height + 5}px`;
        tooltip.style.left = `${this._tooledObj.offsetLeft - window.scrollX - (tooltipRect.width - rect.width) / 2}px`;
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
