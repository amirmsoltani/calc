import React, { useRef, useState } from 'react'
import { NumberInput } from '~/components'
import styles from './OperatorSearch.module.scss'
import { useAppSelector } from '~/hooks/useRedux'

const OperatorSearch = () => {
  const input = useRef<number | null>(null)
  const [state, setState] = useState<undefined | number>()

  const operator = useAppSelector((store) => typeof state === 'number' ? store.operator.operators[state] : undefined)
  return (
    <div className={styles.wrapper}>
      <NumberInput
        visibleButtons={false}
        onChangeValue={(value) => {
          input.current = +value
        }}
      />
      <button
        className={styles.findBtn}
        type={'button'}
        onClick={() => {
          setState(+input.current!)
        }}
      >
        Find
      </button>
      <ul className={styles.valueList}>
        <li>Index: {state}</li>
        <li>Operator
          Inputs:&#160;
          {operator ? [operator?.firstValue || 'NaN', operator?.secondValue || 'NaN'].join(', ') : null}
        </li>
        <li>Operator Outputs: {operator?.value || ''}</li>
      </ul>
    </div>
  )
}

export default OperatorSearch
