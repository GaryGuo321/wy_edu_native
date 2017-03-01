(function(factory, window) {
    if (typeof define == 'function') {
        if (define.amd) {
            // amd
            define('emitter', ['jenny'], factory);
        }
    } else {
        window.Emitter = factory(Jenny);
    }
})(function(_, undefined) {
    function Emitter() {
        this._listener = {};
    }
    _.extend(Emitter.prototype, {
        on: function(type, fn) {
            if (typeof type == 'string' && typeof fn == 'function') {
                if (typeof this._listener[type] == 'undefined') {
                    this._listener[type] = [fn];
                } else {
                    this._listener[type].push(fn);
                }
            }
            return this;
        },
        off: function(type, fn) {
            if (typeof type == 'string') {
                var listeners = this._listener[type];
                if (listeners instanceof Array) {
                    if (typeof fn == 'function') {
                        for (var i = 0; i < listeners.length; i++) {
                            if (listeneirs[i] == fn) {
                                listeners.splice(i, 1);
                                break;
                            }
                        }
                        if (listeners.length > 0) {
                            this._listener[type] = listeners;
                        } else {
                            delete this._listener[type];
                        }
                    } else {
                        delete this._listener[type];
                    }
                }
            }
            return this;
        },
        fire: function(type) {
            if (typeof type == 'string') {
                var args = [].slice.call(arguments, 1);

                var listeners = this._listener[type];
                if (listeners instanceof Array) {
                    for (var i = 0; i < listeners.length; i++) {
                        if (typeof listeners[i] == 'function')
                            listeners[i].apply(this, args);
                    }
                }
            }
            return this;
        }
    });

    return Emitter;
}, window)