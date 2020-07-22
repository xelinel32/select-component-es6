const getTemplate = () => {
  return `
  <div class="select__input" data-type="input">
    <span>Text</span>
    <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
      <li class="select__item">123</li>
    </ul>
  </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.#render()
    this.#setup()
  }
  // privat method es2020
  #render() {
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate()
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
  }
  clickHandler(e) {
    const { type } = event.target.dataset // destructuring
    if (type === 'input') {
      this.toggle()
    }
  }
  get isOpen() {
    return this.$el.classList.contains('open')
  }
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }
  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.remove('fa-chevron-up')
    this.$arrow.classList.add('fa-chevron-down')
  }
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
  }
}
