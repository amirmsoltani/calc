import React from 'react'
import classNames from 'classnames'
import styles from './OperatorNavbar.module.scss'
import { Copy, Trash } from 'iconsax-react'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'
import { createOperatorAction, deleteOperatorAction } from '~/store/actions'

const OperatorNavbar = () => {
  const hasSelected = useAppSelector((state) => typeof state.operator.selected !== 'number')
  const dispatch = useAppDispatch()

  return (
    <ul className={classNames(styles.navbar, { [styles.disabled]: hasSelected })}>
      <li className={classNames(styles.navItem, styles.red)} onClick={() => {
        dispatch(deleteOperatorAction())
      }}>
        <Trash className={styles.default}/>
        <Trash variant={'Bold'} className={classNames(styles.hover, styles.red)}/>
      </li>
      <li className={classNames(styles.navItem, styles.purple)} onClick={() => {
        dispatch(createOperatorAction('copy'))
      }
      }>
        <Copy variant={'Bold'} className={styles.hover}/>
        <Copy className={styles.default}/>
      </li>
    </ul>
  )
}

export default OperatorNavbar
