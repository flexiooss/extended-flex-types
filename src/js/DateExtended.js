import {assertType, isNumber, isString} from '@flexio-oss/assert'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from '@flexio-oss/flex-types'

/**
 *
 * @param {(string|number)} input
 * @param {number} expectedLength
 * @param {string} replaceWith
 * @return {string}
 */
const padLeft = (input, expectedLength, replaceWith = '0') => {
  assertType(
    isString(input) || isNumber(input),
    'padLeft: `input` argument should be a string or number'
  )
  assertType(
    isNumber(expectedLength),
    'padLeft: `expectedLength` argument should be a number'
  )
  assertType(
    isString(replaceWith),
    'padLeft: `replaceWith` argument should be a replaceWith'
  )
  return Array(expectedLength - String(input).length + 1).join(replaceWith) + input
}

export class DateExtended extends Date {

  /**
   * @param {FlexTime} flexTime
   * @return {DateExtended}
   */
  static fromFlexTime(flexTime) {
    assertType(
      flexTime instanceof FlexTime,
      'DateExtended:fromFlexTime: `flexTime` argument should be an instance of FlexTime'
    )
    let time = flexTime.toJSON().split(/[:.]/g)
    return new DateExtended(null, null, null, ...time)
  }

  /**
   * @param {FlexZonedDateTime} flexZonedDateTime
   * @return {DateExtended}
   */
  static fromFlexZonedDateTime(flexZonedDateTime) {
    assertType(
      flexZonedDateTime instanceof FlexZonedDateTime,
      'DateExtended:fromFlexZonedDateTime: `flexZonedDateTime` argument should be an instance of FlexZonedDateTime'
    )
    return new DateExtended(flexZonedDateTime.toJSON())
  }

  /**
   * @param {FlexDate} flexDate
   * @return {DateExtended}
   */
  static fromFlexDate(flexDate) {
    assertType(
      flexDate instanceof FlexDate,
      'DateExtended:fromFlexDate: `flexDate` argument should be an instance of FlexDate'
    )
    let fullDate = flexDate.toJSON().split('-')
    return new DateExtended(fullDate[0], fullDate[1] - 1, fullDate[2])
  }

  /**
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromFlexDateTime(flexDateTime) {
    assertType(
      flexDateTime instanceof FlexDateTime,
      'DateExtended:fromFlexDateTime: `flexDateTime` argument should be an instance of FlexDateTime'
    )
    return new DateExtended(flexDateTime.toJSON())
  }

  /**
   *
   * @param {FlexDateTime} flexDateTime
   * @return {DateExtended}
   */
  static fromUTCFlexDateTime(flexDateTime) {
    assertType(
      flexDateTime instanceof FlexDateTime,
      'DateExtended:fromFlexDateTime: `flexDateTime` argument should be an instance of FlexDateTime'
    )
    let tmp = new DateExtended(flexDateTime.toJSON())
    tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset())
    return tmp
  }

  /**
   *
   * @return {string}
   */
  toUTCFullDate() {
    return this.toISOString().split('T')[0]
  }

  /**
   *
   * @return {string}
   */
  toUTCTime() {
    return this.toISOString().split('T')[1].split('Z')[0]
  }

  /**
   *
   * @return {string}
   */
  toLocaleFullDate() {
    return this.getFullYear() + '-' +
      padLeft(this.getMonth() + 1, 2) + '-' +
      padLeft(this.getDate(), 2)
  }

  /**
   *
   * @return {string}
   */
  toLocaleTime() {
    return padLeft(this.getHours(), 2) + ':' +
      padLeft(this.getMinutes(), 2) + ':' +
      padLeft(this.getSeconds(), 2) + '.' +
      padLeft(this.getMilliseconds(), 3)
  }

  /**
   *
   * @return {number}
   */
  getNextMonth() {
    return this.setMonth(this.getMonth() + 1)
  }

  /**
   * @return {number}
   */
  getPreviousMonth() {
    return this.setMonth(this.getMonth() - 1)
  }

  /**
   *
   * @return {number}
   */
  getDaysInMonth() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
  }

  /**
   *
   * @returns {FlexZonedDateTime}
   */
  toUTCFlexZonedDateTime() {
    let str = this.toISOString()
    return new FlexZonedDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toLocaleFlexDateTime() {
    let str = this.toLocaleFullDate() + 'T' + this.toLocaleTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDateTime}
   */
  toUTCFlexDateTime() {
    let str = this.toUTCFullDate() + 'T' + this.toUTCTime()
    return new FlexDateTime(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toLocaleFlexDate() {
    let str = this.toLocaleFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexDate}
   */
  toUTCFlexDate() {
    let str = this.toUTCFullDate()
    return new FlexDate(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toLocaleFlexTime() {
    let str = this.toLocaleTime()
    return new FlexTime(str)
  }

  /**
   *
   * @returns {FlexTime}
   */
  toUTCFlexTime() {
    let str = this.toUTCTime()
    return new FlexTime(str)
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexDate}
   */
  static fromStringToFlexDate(value) {
    try {
      let flexDate = DateExtended.fromFlexDate(new FlexDate(value)).toLocaleFlexDate()
      if (flexDate instanceof FlexDate) {
        return flexDate
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexDateTime}
   */
  static fromStringToFlexDateTime(value) {
    try {
      let flexDateTime = DateExtended.fromFlexDateTime(new FlexDateTime(value)).toLocaleFlexDateTime()
      if (flexDateTime instanceof FlexDateTime) {
        return flexDateTime
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   *
   * @param {string} value
   * @returns {null|FlexTime}
   */
  static fromStringToFlexTime(value) {
    try {
      let flexTime = DateExtended.fromFlexTime(new FlexTime(value)).toLocaleFlexTime()
      if (flexTime instanceof FlexTime) {
        return flexTime
      }
      return null
    } catch (e) {
      return null
    }
  }
}
