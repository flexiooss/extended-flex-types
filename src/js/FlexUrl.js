import {assertType, isNull, isString} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-generator-helpers'

class FlexUrl {

  /**
   * @param {string} value
   * @private
   */
  constructor(value) {
    this._value = value
    deepFreezeSeal(this)
  }

  /**
   * @returns {string}
   */
  value() {
    return this._value
  }

  /**
   * @param {string} value
   */
  withValue(value) {
    let builder = FlexUrlBuilder.from(this)
    builder.value(value)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._value !== null) {
      jsonObject['value'] = this._value
    }
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }
}

export {FlexUrl}

class FlexUrlBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._value = null
  }

  /**
   * @param {string} value
   * @returns {FlexUrlBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assertType(isString(value), 'value should be a string')
      new URL(value)
    }
    this._value = value
    return this
  }

  /**
   * @returns {FlexUrl}
   */
  build() {
    return new FlexUrl(this._value)
  }

  /**
   * @param {object} jsonObject
   * @returns {FlexUrlBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new FlexUrlBuilder()
    if (jsonObject['value'] !== undefined && jsonObject['value'] !== null) {
      builder.value(jsonObject['value'])
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {FlexUrlBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexUrl} instance
   * @returns {FlexUrlBuilder}
   */
  static from(instance) {
    let builder = new FlexUrlBuilder()
    builder.value(instance.value())
    return builder
  }
}

export {FlexUrlBuilder}
