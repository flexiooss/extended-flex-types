/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {DateExtended} from '../js/DateExtended'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  testToFlexDateTimeZone() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toUTCFlexZonedDateTime()
    assert.deepEqual(DateExtended.fromFlexZonedDateTime(flexDate), date)
  }

  /*testToFlexDateTime() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toLocaleFlexDateTime()
    assert.deepEqual(DateExtended.fromFlexDateTime(flexDate), date)
    let localDate = DateExtended.fromFlexDateTime(flexDate)
    assert.deepEqual(localDate, date)
    localDate = DateExtended.fromFlexDateTime(flexDate)
    console.log(localDate)
    assert.deepEqual(localDate.getUTCFullYear(), date.getFullYear())
    assert.deepEqual(localDate.getUTCMonth(), date.getMonth())
    assert.deepEqual(localDate.getUTCDate(), date.getDate())
    assert.deepEqual(localDate.getUTCHours(), date.getHours())
    assert.deepEqual(localDate.getUTCMinutes(), date.getMinutes())
    assert.deepEqual(localDate.getUTCSeconds(), date.getSeconds())
  }*/

  testToFlexDate() {
    let date = new DateExtended(2019, 6, 19)
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
