(function(factory, window) {
    if (typeof define == 'function') {
        if (define.amd) {
            // amd
            define('lifeCycle', ['jenny'], factory);
        }
    } else {
        window.LifeCycle = factory(Jenny);
    }
})(function(_, undefined) {
    function LifeCycle() {
        this.template = '';
        this.style = {};
    }
    _.extend(LifeCycle.prototype, {
        // 组件组装前
        conponentWillMount: function() {},
        // 组件组装
        dataUI: function() {},
        templateUI: function() {},
        eventUI: function() {},
        styleUI: function() {},
        // 组件插入到DOM前
        conponentWillInsert: function() {},
        // 组件插入到DOM中
        render: function(container) {
            this.conponentWillMount();
            this.dataUI();
            this.templateUI();
            if (this.template) {
                this.conponentWillInsert();
                this.template.appendTo(container || _('body'));
                this.styleUI();
                this.eventUI();
            }
            this.conponentDidMount();
        },
        // 组件插入到DOM后
        conponentDidMount: function() {},
        // 组件销毁前
        conponentWillUnmount: function() {},
        // 销毁组件
        destroy: function() {
            this.conponentWillUnmount();
            this.template.off();
            this.template.remove();
            this.conponentDidUnmount();
        },
        // 组件销毁后
        conponentDidUnmount: function() {},
        // 初始化
        init: function() {},
        // 获取和设置属性
        get: function(attr) {
            return this[attr]
        },
        set: function(attr, data) {
            return this[attr] = data;
        }
    });

    return LifeCycle;
}, window)