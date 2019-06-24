/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {DateExtended} from '../js/DateExtended'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  testToFlexDateTimeZone() {
    let date = new DateExtended('2019-06-19T09:59:03.034Z')
    let flexDate = date.toUTCFlexZonedDateTime()
    assert.deepEqual(DateExtended.fromFlexZonedDateTime(flexDate), date)
  }

  testToFlexDateTime() {
    let date = new DateExtended('2019-06-19T09:59:03.034Z')
    let flexDate = date.toLocaleFlexDateTime()
    assert.deepEqual(DateExtended.fromFlexDateTime(flexDate), date)
  }

  testToFlexDate() {
    let date = new DateExtended('2019-06-19T09:59:03.034Z')
    let flexDate = date.toLocaleFlexDate()
    let dateFromFlex = DateExtended.fromFlexDate(flexDate)
    assert.deepEqual(dateFromFlex.getFullYear(), date.getFullYear())
    assert.deepEqual(dateFromFlex.getMonth(), date.getMonth())
    assert.deepEqual(dateFromFlex.getDate(), date.getDate())
  }

  testToFlexTime() {
    let date = new DateExtended(0, 0, 0, 9, 59, 3, 34)
    let flexDate = date.toLocaleFlexTime()
    let dateFromFlex = DateExtended.fromFlexTime(flexDate)
    assert.deepEqual(dateFromFlex.getHours(), date.getHours())
    assert.deepEqual(dateFromFlex.getMinutes(), date.getMinutes())
    assert.deepEqual(dateFromFlex.getSeconds(), date.getSeconds())
    assert.deepEqual(dateFromFlex.getMilliseconds(), date.getMilliseconds())
  }
}

runTest(TestDateExtendedTest)
