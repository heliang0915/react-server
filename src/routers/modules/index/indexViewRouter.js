
export const IndexView=(location,callback)=>{
    // Hook for server
    if (typeof require.ensure !== 'function') {
        require.ensure = function(dependencies, callback) {
            callback(require)
        }
    }
    return require.ensure([],(require)=>{
        callback(null,require('../../../views/indexview').default)
    },'indexview')

}


export const ModelContainer=(location,callback)=>{
    // Hook for server
    if (typeof require.ensure !== 'function') {
        require.ensure = function(dependencies, callback) {
            callback(require)
        }
    }
    return require.ensure([],(require)=>{
        callback(null,require('../../../containers/ModelContainer').default)
    },'modelcontainer')

}

