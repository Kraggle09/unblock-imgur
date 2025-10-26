// Browser API compatibility layer
const browserAPI = (function() {
    const api = (typeof browser !== 'undefined') ? browser : chrome;
    
    return {
        // Wraps the webRequest API to work consistently across browsers
        webRequest: {
            onBeforeRequest: {
                addListener: function(callback, filter, opt) {
                    return api.webRequest.onBeforeRequest.addListener(
                        callback,
                        filter,
                        opt
                    );
                }
            },
            onHeadersReceived: {
                addListener: function(callback, filter, opt) {
                    return api.webRequest.onHeadersReceived.addListener(
                        callback,
                        filter,
                        opt
                    );
                }
            }
        },
        
        // Wraps the tabs API
        tabs: {
            executeScript: function(tabId, details) {
                return new Promise((resolve, reject) => {
                    api.tabs.executeScript(tabId, details, (results) => {
                        if (api.runtime.lastError) {
                            reject(api.runtime.lastError);
                        } else {
                            resolve(results);
                        }
                    });
                });
            }
        },
        
        // Wraps the runtime API
        runtime: {
            getLastError: function() {
                return api.runtime.lastError;
            }
        }
    };
})();