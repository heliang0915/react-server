/**
 * Created by hotread on 2017/6/5.
 */


export const UploadView=(location,callback)=>{

    if (typeof require.ensure !== 'function') {
        require.ensure = function(dependencies, callback) {
            callback(require)
        }
    }
    return require.ensure([],(require)=>{
        callback(null,require('../../../views/uploadview').default)
    },'uploadview')
}