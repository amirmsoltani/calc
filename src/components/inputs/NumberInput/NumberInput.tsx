import React, { ChangeEvent, FC, memo, useState } from 'react'
import styles from './NumberInput.module.scss'
import { Add, Minus } from 'iconsax-react'
import classNames from 'classnames'

type PropsType = {
  label?: string;
  error?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  visibleButtons?: boolean;
}

const NumberInput: FC<PropsType> = ({
  value
  , error
  , label
  , onChangeValue,
  onChange: globalOnChange,
  visibleButtons = true,
}) => {
  const [localState, setLocalState] = useState<string>(value || '')

  // change value with event handler
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    globalOnChange?.(event)
    onChangeValue?.(Math.floor(+(event.target.value || 0)).toString())
    setLocalState(Math.floor(+(event.target.value || 0)).toString())
  }

  // change value with button handler
  const handleChangeWithButton = (mode: 'increase' | 'decrease') => () => {
    onChangeValue?.((+(value || 0) + (mode === 'increase' ? 1 : -1)).toString())
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
               className={styles.input}
               value={value || localState}
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

export default memo(NumberInput, (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.error === nextProps.error)
