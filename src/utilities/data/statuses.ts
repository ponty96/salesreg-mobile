import StateMachine from 'javascript-state-machine'

export const ORDER_STATUSES = [
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Processed',
    value: 'processed'
  },
  { label: 'Delivering', value: 'delivering' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Recalled', value: 'recalled' }
]

export const orderStateMachine = (init: string) =>
  new StateMachine({
    init: init,
    transitions: [
      { name: 'processed', from: 'pending', to: 'processed' },
      { name: 'delivering', from: 'processed', to: 'delivering' },
      { name: 'delivered', from: 'delivering', to: 'delivered' },
      { name: 'recalled', from: 'delivered', to: 'recalled' },
      { name: 'pending', from: 'recalled', to: 'pending' }
    ],
    methods: {}
  })
