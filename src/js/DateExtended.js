import {assertType, isNull, isString} from '@flexio-oss/assert'

export class DateExtended extends Date {
  /**
   *
   * @return {Object}
   */
  toObject() {
    return {
      date: this.toISOString()
    }
  }

  /**
   *
   * @return {Object}
   */
  toJSON() {
    return this.toObject()
  }
}

export class DateExtendedBuilder {
  constructor() {
    /**
     *
     * @type {?string}
     * @private
     */
    this.__date = null
  }

  /**
   *
   * @param {?String} date
   * @return {DateExtendedBuilder}
   */
  date(date) {
    assertType(isNull(date) || isString(date), 'DateExtendedBuilder:href: arg should be a string or null')
    this.__date = date
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {DateExtendedBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new DateExtendedBuilder()
    console.log(jsonObject.date)
    builder.date(jsonObject.date)
    return builder
  }

  /**
   * @param {string} json
   * @returns {DateExtendedBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {DateExtended} instance
   * @returns {DateExtendedBuilder}
   */
  static from(instance) {
    const builder = new DateExtendedBuilder()
    builder.date(instance.toISOString())
    return builder
  }

  /**
   * @returns {DateExtended}
   */
  build() {
    return new DateExtended(this.__date)
  }
}
