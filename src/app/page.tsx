import React from 'react'
import styles from './index.module.scss'
import { Add, Copy, Minus, Trash } from 'iconsax-react'
import classNames from 'classnames'

const Page = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={classNames(styles.navbar, { [styles.disabled]: false })}>
        <li className={classNames(styles.navItem, styles.red)}>
          <Trash className={styles.default}/>
          <Trash variant={'Bold'} className={classNames(styles.hover, styles.red)}/>
        </li>
        <li className={classNames(styles.navItem, styles.purple)}>
          <Copy variant={'Bold'} className={styles.hover}/>
          <Copy className={styles.default}/>
        </li>
      </ul>

      <div className={styles.body}>
        <ul className={styles.actionBar}>
          <li className={styles.actionBarItem}>
            <span className={styles.default}>Sum</span>
            <Add className={styles.hover}/>
          </li>
          <li className={styles.actionBarItem}>
            <span className={styles.default}>Minus</span>
            <Minus className={styles.hover}/>
          </li>
          <li className={styles.actionBarItem}>
            <span className={styles.default}>Divide</span>
            <Minus className={classNames(styles.hover, styles.rotate135)}/>
          </li>
          <li className={styles.actionBarItem}>
            <span className={styles.default}>Multiple</span>
            <Add className={classNames(styles.hover, styles.rotate135)}/>
          </li>
        </ul>

        <div className={styles.actionEnvironment}>
          <div className={styles.operatorItem}>
            <span>Operator Title</span>
            <div className={styles.body}>
              <div className={styles.inputs}>
                <label>Label</label>
                <input/>
                <label>Label</label>
                <input/>
              </div>
              <span className={styles.output}>output</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
