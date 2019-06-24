import {assertType, isNull, isString} from '@flexio-oss/assert'
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from '@flexio-oss/flex-types'

const padLeft = (input, expectedLength, replaceWith) => {
  return Array(expectedLength - String(input).length + 1).join(replaceWith || '0') + input;
}






export class DateExtended extends Date {
  toUTCFullDate() {
    return this.toISOString().split('T')[0]
  }

  toUTCTime() {
    return this.toISOString().split('T')[1].split('Z')[0]
  }

  toOffset() {
    let str = (this.offsetMinutes < 0 ? '-' : '+')
    str += padLeft(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2) + ':' +
      padLeft(Math.abs(this.getTimezoneOffset()) % 60, 2)

    return str
  }

  toLocaleFullDate() {
    return this.getFullYear() + '-' +
      padLeft(this.getMonth() + 1, 2) + '-' +
      padLeft(this.getDate(), 2)
  }

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
   * {FlexZonedDateTime} flexZonedDateTime
   */
  static fromFlexZonedDateTime(flexZonedDateTime) {
    return new DateExtended(fromTZDateTime(flexZonedDateTime.toJSON()))
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
   * {FlexDateTime} flexDateTime
   */
  static fromFlexDateTime(flexDateTime) {
    return new DateExtended(flexDateTime.toJSON())
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
   * {FlexDate} flexDate
   */
  static fromFlexDate(flexDate) {
    let fullDate = flexDate.toJSON().split('-')
    return new DateExtended(fullDate[0], fullDate[1] - 1, fullDate[2])
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
   * {FlexDateTime} flexTime
   */
  static fromFlexTime(flexTime) {
    let time = flexTime.toJSON().split(/[:.]/g)
    return new DateExtended(null, null, null, ...time)
  }
}

function fromTZDateTime(tzDateTime) {
  return tzDateTime.substring(0, tzDateTime.length - 6) + 'Z'
}
