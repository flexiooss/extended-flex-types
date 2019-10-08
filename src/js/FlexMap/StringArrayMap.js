import {FlexMap} from '@flexio-oss/flex-types'
import {assertType} from '@flexio-oss/assert'
import {StringArray} from '../FlexArray/StringArray'
import {StringArrayMapBuilder} from '../FlexArray/NumberArray'

/**
 * @extends {FlexMap<?StringArray>}
 */
export class StringArrayMap extends FlexMap {
  _validate(v) {
    assertType(v instanceof StringArray, 'StringArrayMap: input should be a StringArray')
  }

  /**
   *
   * @return {Object.<*, Array.<string>>}
   */
  toObject() {
    let obj = Object.create(null)
    for (let [k, v] of this) {
      obj[k] = v.toObject()
    }
    return obj
  }

  /**
   * @param {StringArrayMap} instance
   * @returns {StringArrayMapBuilder}
   */
  static from(instance) {
    return StringArrayMapBuilder.from(instance)
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayMapBuilder}
   */
  static fromObject(jsonObject) {
    return StringArrayMapBuilder.fromObject(jsonObject)
  }

  /**
   * @param {string} json
   * @returns {StringArrayMapBuilder}
   */
  static fromJson(json) {
    return StringArrayMapBuilder.fromJson(json)
  }
}

export class StringArrayMapBuilder {
  constructor() {
    /**
     *
     * @type {IterableIterator<(string|Symbol), StringArray>}
     * @private
     */
    this.__entries = null
  }

  /**
   *
   * @param {IterableIterator<(string|Symbol), StringArray>} entries
   * @return {StringArrayMapBuilder}
   */
  entries(entries) {
    this.__entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayMapBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StringArrayMapBuilder()
    const entries = Object.entries(jsonObject)
    for (const value of entries) {
      value[1] = new StringArray(...value[1])
    }
    builder.entries(entries)
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringArrayMapBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {StringArrayMapBuilder}
   */
  static from(instance) {
    const builder = new StringArrayMapBuilder()
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {StringArrayMap}
   */
  build() {
    return new StringArrayMap(this.__entries)
  }
}
