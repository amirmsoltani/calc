import React, { FC, memo } from 'react'
import styles from './OperatorCard.module.scss'
import { NumberInput } from '~/components'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'
import { shallowEqual } from 'react-redux'
import { setSelect } from '~/store/slices'
import { updateOperatorAction } from '~/store/actions'

type PropsType = {
  index: number;
  id: number;
}

const OperatorCard: FC<PropsType> = ({
  index,
  id
}) => {

  const { operator, isSelected, summery } = useAppSelector((state) => ({
    operator: state.operator.operators[index],
    isSelected: id === state.operator.selected,
    summery: index ? state.operator.operators.slice(0, index)
      .filter((item) => typeof item.value === 'number')
      .reduce((a, b) => a + b.value!, 0) : undefined
  }), shallowEqual)
  const dispatch = useAppDispatch()

  return (
    <div className={classNames(styles.operatorItem, { [styles.selected]: isSelected })}
         onClick={() => {
           dispatch(setSelect(id))
         }}
    >
      <span>{operator.title}</span>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <NumberInput label={'First value'} value={operator.firstValue?.toString()} onChangeValue={(value) => {
            dispatch(updateOperatorAction({
              firstValue: +value,
              index
            }))
          }}/>
          <NumberInput
            label={'Second value'}
            value={operator.secondValue?.toString()}
            onChangeValue={(value) => {
              if (operator.title === 'Divide' && value === '0') {
                return
              } else {
                dispatch(updateOperatorAction({
                  secondValue: +value,
                  index
                }))
              }
            }}
            error={operator.title === 'Divide' && operator.secondValue === 0 ? 'you cant set 0 value' : undefined}
          />
        </div>
        <span className={styles.output}>{operator.value}</span>
      </div>
      {typeof summery === 'number' ? (
        <span className={styles.summery}>{summery + (operator.value || 0)}</span>) : null
      }
    </div>
  )
}

export default memo(OperatorCard, (prevProps, nextProps) => prevProps.index === nextProps.index)
