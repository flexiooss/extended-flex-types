import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isObject, isRegex, isNull, isString} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'

class FlexRegExp {
  /**
   * @param {string} value
   * @private
   */
  constructor(value) {
    /**
     * @private
     */
    this._value = value

    deepFreezeSeal(this)
  }

  /**
   * @returns {RegExp}
   */
  value() {
    return this._value
  }

  /**
   * @param {RegExp} value
   * @returns {FlexRegExp}
   */
  withValue(value) {
    let builder = FlexRegExpBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  /**
   * @returns {FlexRegExpBuilder}
   */
  static builder() {
    return new FlexRegExpBuilder()
  }

  /**
   * @param {FlexRegExp} instance
   * @returns {FlexRegExpBuilder}
   */
  static from(instance) {
    return FlexRegExpBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexRegExpBuilder}
   */
  static fromObject(jsonObject) {
    return FlexRegExpBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {FlexRegExpBuilder}
   */
  static fromJson(json) {
    return FlexRegExpBuilder.fromJson(json)
  }

  /**
   * @returns {Object}
   */
  toObject() {
    let jsonObject = {}
    if (!isNull(this._value)) {
      jsonObject['value'] = this._value.toString()
    }
    return jsonObject
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return this.toObject()
  }
}

export {FlexRegExp}

class FlexRegExpBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param {RegExp} value
   * @returns {FlexRegExpBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assertType(isRegex(value), 'value should be a isRegex')
    }
    this._value = value
    return this
  }

  /**
   * @returns {FlexRegExp}
   */
  build() {
    return new FlexRegExp(this._value)
  }

  /**
   * @param {Object} jsonObject
   * @returns {FlexRegExpBuilder}
   */
  static fromObject(jsonObject) {
    assertType(isObject(jsonObject), 'input should be an object')
    let builder = new FlexRegExpBuilder()
    if (jsonObject['value'] !== undefined && !isNull(jsonObject['value'])) {
      builder.value(new RegExp(jsonObject['value']))
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexRegExpBuilder}
   */
  static fromJson(json) {
    assertType(isString(json), 'input should be a string')
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexRegExp} instance
   * @returns {FlexRegExpBuilder}
   */
  static from(instance) {
    assertType(instance instanceof globalFlexioImport.io.flexio.extended_flex_types.FlexRegExp, 'input should be an instance of FlexRegExp')
    let builder = new FlexRegExpBuilder()
    builder.value(new RegExp(instance.value().toString()))
    return builder
  }
}

export {FlexRegExpBuilder}
