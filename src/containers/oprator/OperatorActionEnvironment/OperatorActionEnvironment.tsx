import React, { useState } from 'react'
import styles from './OperatorActionEnvironment.module.scss'
import { OperatorCard } from '~/containers'
import { useAppSelector } from '~/hooks/useRedux'
import { shallowEqual } from 'react-redux'

const OperatorActionEnvironment = () => {
  const operators = useAppSelector(state => state.operator.operators.map(item => item.id),shallowEqual);

  return (
    <div className={styles.actionEnvironment}>
      {
        operators.map((id, index, array) => (
          <OperatorCard
            key={id!.toString()}
            id={id}
            index={index}
          />))
      }
    </div>
  )
}

export default OperatorActionEnvironment
