import React, { ChangeEvent, FC, useRef } from 'react'
import styles from './NumberInput.module.scss'
import { Add, Minus } from 'iconsax-react'
import classNames from 'classnames'

type PropsType = {
  label?: string;
  error?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
  visibleButtons?: boolean;
}

const NumberInput: FC<PropsType> = ({
  value
  , error
  , label
  , onChangeValue,
  visibleButtons = true,
}) => {

  const input = useRef<HTMLInputElement>(null)

  // change value with event handler
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeValue?.(Math.floor(+event.target.value).toString())
  }

  // change value with button handler
  const handleChangeWithButton = (mode: 'increase' | 'decrease') => () => {
    onChangeValue?.((+input.current!.value + (mode === 'increase' ? 1 : -1)).toString())
  }

  return (
    <div className={styles.wrapper}>
      {label ? (<label className={styles.label}>
        {label}
      </label>) : null
      }
      <div className={styles.inputBox}>
        {visibleButtons
          ? (
            <button type={'button'} className={styles.inputBtn} onClick={handleChangeWithButton('decrease')}>
              <Minus size={18}/>
            </button>
          )
          : null
        }

        <input type={'number'}
               ref={input}
               className={styles.input}
               value={value}
               onChange={onChange}
        />

        {visibleButtons
          ? (
            <button type={'button'} className={styles.inputBtn} onClick={handleChangeWithButton('increase')}>
              <Add size={18}/>
            </button>)
          : null
        }
      </div>
      <label className={classNames(styles.error, { [styles.show]: !!error })}>
        {error}
      </label>
    </div>
  )
}

export default NumberInput
