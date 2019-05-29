import {FlexArray} from '@flexio-oss/flex-types'
import {isNull, isString, assertType} from '@flexio-oss/assert'

/**
 * @extends {FlexArray<?string>}
 */
export class StringArray extends FlexArray {
  _validate(v) {
    assertType(isString(v) || isNull(v), 'StringArray: input should be a string or null')
  }
}
