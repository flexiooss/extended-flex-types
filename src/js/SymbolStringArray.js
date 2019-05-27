import {FlexArray} from '@flexio-oss/flex-types'
import {isNull, isString, isSymbol,assertType} from '@flexio-oss/assert'

/**
 * @extends {FlexArray<?(string|Symbol)>}
 */
export class SymbolStringArray extends FlexArray {
  _validate(v) {
    assertType(isString(v) || isNull(v) || isSymbol(v), 'SymbolStringArray: input should be a string or null or Symbol')
  }
}
