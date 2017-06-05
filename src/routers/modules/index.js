/**
 * 导出所有的动态路由
 */

import {assign} from 'lodash';
// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}


import * as indexViewRouter  from './index/indexViewRouter';
import * as uploadViewRouter  from './upload/uploadViewRouter';

export default assign({},indexViewRouter,uploadViewRouter)
