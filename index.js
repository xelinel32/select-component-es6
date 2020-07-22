import { Select } from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйста что-то',
  selectedId: '2',
  data: [
    { id: '1', value: 'Text 1' },
    { id: '2', value: 'Text 2' },
    { id: '3', value: 'Text 3' },
    { id: '4', value: 'Text 4' },
    { id: '5', value: 'Text 5' },
    { id: '6', value: 'Text 6' },
  ],
})

window.s = select
