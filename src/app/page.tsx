'use client'
import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { Add, Copy, Minus, Trash } from 'iconsax-react'
import classNames from 'classnames'
import { OperatorCard } from '~/components'
import { useOperator } from '~/hooks'

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

const Page = () => {
  const { addOperator, updateOperator, deleteOperator, operators } = useOperator()
  const actionBar = useMemo(() => (
    <ul className={styles.actionBar}>
      {
        actionBarItems.map(({ Icon, title, className }, index) => (
          <li className={styles.actionBarItem}
              key={index + title}
              onClick={() => {addOperator(title)}}>
            <span className={styles.default}>{title}</span>
            <Icon className={classNames(styles.hover, className)}/>
          </li>))
      }
    </ul>
  ), [])
  const [state, setState] = useState<null | number>(null)

  return (
    <div className={styles.wrapper}>
      <ul className={classNames(styles.navbar, { [styles.disabled]: state === null })}>
        <li className={classNames(styles.navItem, styles.red)} onClick={() => {
          deleteOperator(state!)
          setState(null)
        }}>
          <Trash className={styles.default}/>
          <Trash variant={'Bold'} className={classNames(styles.hover, styles.red)}/>
        </li>
        <li className={classNames(styles.navItem, styles.purple)}>
          <Copy variant={'Bold'} className={styles.hover}/>
          <Copy className={styles.default}/>
        </li>
      </ul>

      <div className={styles.body}>
        {actionBar}

        <div className={styles.actionEnvironment}>
          {
            operators.map((values, index, array) => (
              <OperatorCard
                summery={index > 0 ? array.slice(0, index).filter((operator) => !!operator.value).reduce((o1, o2) => o1 + o2.value!, 0) : undefined}
                isFocus={values.id! === state}
                onFocus={() => setState(values.id!)}
                onChangeFirstValue={(firstValue) => {
                  updateOperator(index, {
                    firstValue: +firstValue,
                    secondValue: values.secondValue,
                    id: values.id
                  })
                }}
                onChangeSecondValue={(secondValue) => {
                  updateOperator(index, {
                    firstValue: values.firstValue,
                    secondValue: +secondValue,
                    id: values.id
                  })
                }}
                key={values.id || index}
                title={values.title}
                firstValue={values.firstValue?.toString()}
                secondValue={values.secondValue?.toString()}
                value={values.value?.toString()}
              />))
          }
        </div>
      </div>
    </div>
  )
}

export default Page
