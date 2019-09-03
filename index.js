import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {StringArray, StringArrayBuilder} from './src/js/FlexArray/StringArray'
import {DateExtended} from './src/js/DateExtended'


/**
 * @property {StringArray} globalFlexioImport.io.flexio.extended_flex_types.StringArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArray', StringArray)
/**
 * @property {StringArrayBuilder} globalFlexioImport.io.flexio.extended_flex_types.StringArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArrayBuilder', StringArrayBuilder)
/**
 * @property {DateExtended} globalFlexioImport.io.flexio.extended_flex_types.DateExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.DateExtended', DateExtended)


export {StringArray} from './src/js/FlexArray/StringArray'
export {StringArrayBuilder} from './src/js/FlexArray/StringArray'

export * from './src/js/FlexArray/SymbolStringArray'
export * from './src/js/FlexMap/ArrayMap'
export * from './src/js/FlexMap/StringArrayMap'
export * from './src/js/URLExtended'
export * from './src/js/URLSearchParamsExtended'
export {DateExtended} from './src/js/DateExtended'
