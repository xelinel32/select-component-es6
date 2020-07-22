const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Default placeholder'
  const listItems = data.map((item) => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })
  return `
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
    <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${listItems.join('')}
    </ul>
  </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.#render()
    this.#setup()
    this.selectedId = options.selectedId
  }
  // privat method es2020
  #render() {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }
  clickHandler(e) {
    const { type } = event.target.dataset // destructuring
    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = e.target.dataset.id
      this.select(id)
    }
  }
  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove('selected')
    })
    this.$el
      .querySelector(`[data-id="${this.selectedId}"]`)
      .classList.add('selected')
  }
  get current() {
    return this.options.data.find((item) => item.id === this.selectedId)
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
    this.$el.innerHTML = ''
  }
}
