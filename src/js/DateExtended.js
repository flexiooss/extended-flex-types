import {assertType, isNull, isString} from '@flexio-oss/assert'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from '@flexio-oss/flex-types'

const padLeft = (input, expectedLength, replaceWith) => {
  return Array(expectedLength - String(input).length + 1).join(replaceWith || '0') + input
}

const fromTZDateTime = (tzDateTime) => {
  return tzDateTime.substring(0, tzDateTime.length - 6) + 'Z'
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
    return new DateExtended(fromTZDateTime(flexZonedDateTime.toJSON()))
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
    return new DateExtended(tmp.getTime() - (new Date().getTimezoneOffset() * 60000))
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
  toOffset() {
    let str = (this.offsetMinutes < 0 ? '-' : '+')
    str += padLeft(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2) + ':' +
      padLeft(Math.abs(this.getTimezoneOffset()) % 60, 2)

    return str
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
    let str = this.toISOString() + this.toOffset()
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

}
