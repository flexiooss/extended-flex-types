/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {DateExtended} from '../js/DateExtended'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  testToUTCFlexDateTimeZoned() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toUTCFlexZonedDateTime()
    assert.deepEqual(DateExtended.fromFlexZonedDateTime(flexDate), date)
  }

  testToFlexDateTime() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toLocaleFlexDateTime()
    assert.deepEqual(DateExtended.fromFlexDateTime(flexDate), date)
  }

  testToUTCFlexDateTime() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toUTCFlexDateTime()
    assert.deepEqual(DateExtended.fromUTCFlexDateTime(flexDate), date)
  }

  testToFlexDate() {
    let date = new DateExtended(2019, 6, 19, 1, 0, 0)
    let flexDate = date.toLocaleFlexDate()
    let dateFromFlex = DateExtended.fromFlexDate(flexDate)
    assert.deepEqual(dateFromFlex.getFullYear(), date.getFullYear())
    assert.deepEqual(dateFromFlex.getMonth(), date.getMonth())
    assert.deepEqual(dateFromFlex.getDate(), date.getDate())
  }

  testToUTCFlexDate() {
    let date = new DateExtended(2019, 6, 19, 1, 0, 0)
    let flexDateUTC = date.toUTCFlexDate()
    let dateFromFlex = DateExtended.fromFlexDate(flexDateUTC)
    assert.deepEqual(dateFromFlex.getFullYear(), date.getUTCFullYear())
    assert.deepEqual(dateFromFlex.getMonth(), date.getUTCMonth())
    assert.deepEqual(dateFromFlex.getDate(), date.getUTCDate())
  }

  testToFlexTime() {
    let date = new DateExtended(0, 0, 0, 1, 50, 3, 34)
    let flexDate = date.toLocaleFlexTime()
    let dateFromFlex = DateExtended.fromFlexTime(flexDate)
    assert.deepEqual(dateFromFlex.getHours(), date.getHours())
    assert.deepEqual(dateFromFlex.getMinutes(), date.getMinutes())
    assert.deepEqual(dateFromFlex.getSeconds(), date.getSeconds())
    assert.deepEqual(dateFromFlex.getMilliseconds(), date.getMilliseconds())
  }

  testToUTCFlexTime() {
    let date = new DateExtended(0, 0, 0, 1, 50, 3, 34)
    let flexDate = date.toUTCFlexTime()
    let dateFromFlex = DateExtended.fromFlexTime(flexDate)
    assert.deepEqual(dateFromFlex.getHours(), date.getUTCHours())
    assert.deepEqual(dateFromFlex.getMinutes(), date.getUTCMinutes())
    assert.deepEqual(dateFromFlex.getSeconds(), date.getUTCSeconds())
    assert.deepEqual(dateFromFlex.getMilliseconds(), date.getUTCMilliseconds())
  }
}

runTest(TestDateExtendedTest)
