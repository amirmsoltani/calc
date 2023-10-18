import React, { FC, memo } from 'react'
import styles from './OperatorCard.module.scss'
import { NumberInput } from '~/components'
import classNames from 'classnames'

type PropsType = {
  onChangeFirstValue: (value: string) => void;
  onChangeSecondValue: (value: string) => void;
  onFocus: () => void;
  title: string;
  firstValue?: string;
  secondValue?: string;
  value?: string;
  isFocus?: boolean;
  summery?: number;
}

const OperatorCard: FC<PropsType> = ({
  title,
  secondValue,
  value,
  firstValue,
  onFocus,
  onChangeFirstValue,
  onChangeSecondValue,
  isFocus,
  summery
}) => {
  return (
    <div className={classNames(styles.operatorItem, { [styles.selected]: isFocus })} onFocus={onFocus}>
      <span>{title}</span>
      <div className={styles.body}>
        <div className={styles.inputs}>
          <NumberInput label={'First value'} value={firstValue} onChangeValue={onChangeFirstValue}/>
          <NumberInput label={'Second value'} value={secondValue} onChangeValue={(value) => {
            if (title === 'Divide' && value === '0') {
              return
            } else {
              onChangeSecondValue?.(value)
            }
          }}
                       error={title === 'Divide' && secondValue === '0' ? 'you cant set 0 value' : undefined}/>
        </div>
        <span className={styles.output}>{value}</span>
      </div>
      {typeof summery === 'number' ? (
        <span className={styles.summery}>{summery+ +(value || 0)}</span>) : null
      }
    </div>
  )
}

export default memo(OperatorCard, (prevProps, nextProps) => prevProps.firstValue === nextProps.firstValue && prevProps.secondValue === nextProps.secondValue && prevProps.summery === nextProps.summery)
