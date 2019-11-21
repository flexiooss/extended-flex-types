import {assertType, isClass, isFunction} from '@flexio-oss/assert'

/**
 * @template TYPE
 */
export class Supplier {
  /**
   *
   * @param {Class<TYPE>} type
   * @param {function(...*):TYPE} fn
   */
  constructor(type, fn) {
    assertType(
      isClass(type),
      `${this.constructor.name}: 'type' should by a Class`
    )
    assertType(
      isFunction(fn),
      `${this.constructor.name}: 'fn' should by a Function`
    )
    /**
     *
     * @type {Class<TYPE>}
     * @private
     */
    this.__type = type
    /**
     *
     * @type {function(...*): TYPE}
     * @private
     */
    this.__fn = fn
  }

  /**
   *
   * @return {Class<TYPE>}
   */
  get __type__() {
    return this.__type
  }

  /**
   *
   * @param {Class} constructor
   * @return {boolean}
   */
  isTypeOf(constructor) {
    return constructor === this.__type__
  }

  /**
   *
   * @param {...*} args
   * @return {TYPE}
   */
  get(...args) {
    return this.__fn(...args)
  }
}
