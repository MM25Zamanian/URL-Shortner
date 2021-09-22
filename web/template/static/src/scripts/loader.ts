export default class LoaderController {
  loader = <HTMLDivElement>document.querySelector('.loader-box');

  public hidden_after_load() {
    window.addEventListener('load', () => {
      this.hidden();
    });
    if (document.readyState == "complete") {
      this.hidden();
    }
  }
  public show() {
    this.loader.classList.remove('hidden');
  }
  public hidden() {
    this.loader.classList.add('hidden');
  }
}