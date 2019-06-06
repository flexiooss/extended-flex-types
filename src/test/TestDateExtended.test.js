/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {DateExtended, DateExtendedBuilder} from '../js/DateExtended'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  testEncodeDate() {
    const a = new DateExtended('2018-04-23T10:26:00.996Z')
    assert.strictEqual(JSON.stringify(a), '{"date":"2018-04-23T10:26:00.996Z"}')
  }

  testEncodeDecodeDate() {
    const a = new DateExtended('2018-04-23T10:26:00.996Z')
    const sa = JSON.stringify(a)
    const b = DateExtendedBuilder.fromJson(sa).build()

    assert.deepEqual(a, b)
  }
}

runTest(TestDateExtendedTest)
