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
export class StringArrayBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param { Array.<string> } values
   * @returns {StringArrayBuilder}
   */
  values(values) {
    this._values = values
    return this
  }

  /**
   * @param { string } value
   * @returns {StringArrayBuilder}
   */
  pushValue(value) {
    assertType(isString(value) || isNull(value), 'StringArray: input should be a string or null')
    this._values.push(value)
    return this
  }

  /**
   * @returns {StringArray}
   */
  build() {
    return new StringArray(...this._values)
  }

  /**
   * @param {object} jsonObject
   * @returns {StringArrayBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StringArrayBuilder()
    builder._values = []
    jsonObject.forEach((v) => {
      builder._values.push(v)
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringArrayBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {StringArray} instance
   * @returns {StringArrayBuilder}
   */
  static from(instance) {
    const builder = new StringArrayBuilder()
    instance.forEach((v) => {
      builder.pushValue(v)
    })
    return builder
  }
}
