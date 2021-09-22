import { SwipeEventListener } from 'swipe-event-listener';

const swipeArea = SwipeEventListener({
  swipeArea: <HTMLBodyElement>document.querySelector('div.nav-swiper-area'),
});

const swipeAreaNav = SwipeEventListener({
  swipeArea: <HTMLBodyElement>document.querySelector('nav'),
});

export class NavDropdownController {
  constructor() {
    this.dropdowns.forEach(dropdown => {
      const dropdown_dn = <HTMLDivElement>dropdown.querySelector('.nav__item-dropdown.nav__item__dropdown-dropdown');
      const dropdown_list = <HTMLDivElement>dropdown_dn.querySelector('.nav__item__dropdown-list');
      const dropdown_icon = <HTMLDivElement>dropdown.querySelector('.nav__item-box > .nav__item__dropdown-icon > i');

      if (screen.width >= 1000) {
        dropdown.addEventListener('mouseenter', (e: Event) => {
          this.open(dropdown_dn, dropdown_list, dropdown_icon);
        })
        dropdown.addEventListener('mouseleave', (e: Event) => {
          this.close(dropdown_dn, dropdown_icon);
        })
      } else if (screen.width < 1000) {
        dropdown.addEventListener('click', (e: Event) => {
          if (dropdown_dn.classList.contains('open')) {
            this.close(dropdown_dn, dropdown_icon);
          } else {
            this.open(dropdown_dn, dropdown_list, dropdown_icon);
          }
        })
      }
    })
  }
  nav = <HTMLDivElement>document.querySelector('nav');
  dropdowns: NodeListOf<HTMLDivElement> = this.nav.querySelectorAll('.nav__item.nav__item__dropdown');

  public open(dropdown_dn: HTMLDivElement, dropdown_list: HTMLDivElement, dropdown_icon: HTMLDivElement) {
    dropdown_dn.classList.add('open');
    dropdown_dn.style.height = `${dropdown_list.scrollHeight + (10 * 2)}px`;
    dropdown_dn.style.padding = '10px';
    dropdown_icon.style.transform = "rotate(-90deg)";
  }

  public close_all() {
    this.dropdowns.forEach(dropdown => {
      const dropdown_dn = <HTMLDivElement>dropdown.querySelector('.nav__item-dropdown.nav__item__dropdown-dropdown');
      const dropdown_icon = <HTMLDivElement>dropdown.querySelector('.nav__item-box > .nav__item__dropdown-icon > i');
      this.close(dropdown_dn, dropdown_icon);
    })
  }

  public close(dropdown_dn: HTMLDivElement, dropdown_icon: HTMLDivElement) {
    dropdown_dn.classList.remove('open');
    dropdown_dn.style.height = '';
    dropdown_dn.style.padding = '';
    dropdown_icon.style.transform = "";
  }
}

export default class NavController {
  constructor() {
    swipeArea.swipeArea.addEventListener('swipeLeft', (e: Event) => {
      this.open()
    });
    swipeAreaNav.swipeArea.addEventListener('swipeRight', (e: Event) => {
      this.close()
    });
    this.nav.addEventListener('mouseleave', (e: Event) => {
      this.close()
    })
    this.nav.addEventListener('mouseenter', (e: Event) => {
      this.open()
    })
    this.checkbox_handle.addEventListener('change', (e: Event) => {
      if ((<HTMLInputElement>e.target).checked) {
        this.open();
      } else {
        this.close();
      }
    });
    if (this.nav_is_open() && !this.checkbox_handle.checked) {
      this.open();
    } else if (!this.nav_is_open() && this.checkbox_handle.checked) {
      this.close();
    }
  }
  nav = <HTMLDivElement>document.querySelector('nav');
  checkbox_handle = <HTMLInputElement>document.querySelector('#nav_switch_handle');

  public auto_switch_mode() {
    if (this.nav.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }
  public nav_is_open() {
    if (this.nav.classList.contains('open')) {
      return true
    } else {
      return false
    }
  }
  public open() {
    if (window.innerWidth < 1000) {
      if (!this.checkbox_handle.checked) {
        this.checkbox_handle.checked = true;
      }
      this.nav.classList.add('open');
    }
  }
  public close() {
    if (window.innerWidth < 1000) {
      if (this.checkbox_handle.checked) {
        this.checkbox_handle.checked = false;
      }
      this.nav.classList.remove('open');
    }
  }
}
