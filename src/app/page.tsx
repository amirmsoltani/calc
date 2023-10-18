'use client'
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { OperatorActionBar, OperatorActionEnvironment, OperatorSearch } from '~/containers'
import { useAppDispatch } from '~/hooks/useRedux'
import { getOperatorsAction } from '~/store/actions'
import { OperatorNavbar } from '~/containers/oprator/OperatorNavbar'

const Page = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOperatorsAction())
  }, [])

  return (
    <div className={styles.wrapper}>
      <OperatorNavbar/>
      <div className={styles.body}>
        <OperatorActionBar/>
        <OperatorActionEnvironment/>
        <OperatorSearch/>
      </div>
    </div>
  )
}

export default Page
