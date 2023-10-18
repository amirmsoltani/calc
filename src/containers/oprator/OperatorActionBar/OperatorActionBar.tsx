import React from 'react'
import styles from './OperatorActionbar.module.scss'
import classNames from 'classnames'
import { Add, Minus } from 'iconsax-react'
import { useAppDispatch } from '~/hooks/useRedux'
import { createOperatorAction } from '~/store/actions'

const actionBarItems = [
  {
    title: 'Sum',
    Icon: Add,
  },
  {
    title: 'Minus',
    Icon: Minus,
  },
  {
    title: 'Divide',
    Icon: Minus,
    className: styles.rotate135
  }, {
    title: 'Multiple',
    Icon: Add,
    className: styles.rotate135,
  }
]

const OperatorActionBar = () => {
  const dispatch = useAppDispatch()
  return (
    <ul className={styles.actionBar}>
      {
        actionBarItems.map(({ Icon, title, className }, index) => (
          <li className={styles.actionBarItem}
              key={index + title}
              onClick={() => {dispatch(createOperatorAction({ title }))}}>
            <span className={styles.default}>{title}</span>
            <Icon className={classNames(styles.hover, className)}/>
          </li>))
      }
    </ul>
  )
}

export default OperatorActionBar
