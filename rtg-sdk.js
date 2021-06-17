/**
 * 2014-2020 Retargeting BIZ SRL
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@retargeting.biz so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    Retargeting SRL <info@retargeting.biz>
 * @copyright 2014-2020 Retargeting SRL
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
var RTG = (function () {
    var _rtg = {
        /* Todo: $_GET */
        _GET : location.search.substr(1).split("&").reduce(function(o,i){
            i = i.split("=");
            i[2] = decodeURIComponent;
            o[i[2](i[0])] = (i[1]===undefined || i[1]==='') ? false : i[2](i[1]);
            return o;
        },{}),
        get date(){ return new Date(); },

        get debug(){
            return _rtg.cfg.debug;
        },
        get ra(){
            return _rtg.cfg.ra;
        },
        get tracker(){
            return _rtg.cfg.tracker;
        },
        get version(){
            return _rtg.cfg.version;
        },
        get platform(){
            return _rtg.cfg.platform;
        },
        get sleep(){
            return _rtg.cfg.sleep;
        },
        get coolDown(){
            return _rtg.cfg.coolDown;
        },
        get ProductInfo(){
            return _rtg.info.ProductInfo;
        },
        get CategoryInfo(){
            return _rtg.info.CategoryInfo;
        },
        get OrderInfo(){
            return _rtg.info.OrderInfo;
        },
        get OrderProducts(){
            return _rtg.info.OrderProducts;
        },
        get CartInfo(){
            return _rtg.info.CartInfo;
        },
        get filterData(){
            return _rtg.data;
        },
        get sendProduct(){
            return _rtg.cfg.sendProduct === null ? null : _rtg.cfg.sendProduct;
        },
        working: false
    };


    _rtg.tmp = {};

    _rtg.data = {
        sendCategory:{},
        sendProduct:{},
        addToCart:{},
        removeFromCart:{},
        saveOrder:{},
        saveOrderProducts:{}
    };

    _rtg.order = {
        sendProduct: [],
        addToCart: [],
        sendCategory: [],
        removeFromCart: [],
        saveOrder: []
    };

    _rtg.send = {
        sendProduct: {},
        sendCategory: {},
        saveOrder: {}
    };

    _rtg.quantity = {};

    _rtg.false = function(){ return false; };

    /* Todo: cfg = Config */
    _rtg.cfg = {
        version: 'v1.0',
        debug: false,
        ra: null,
        APIKEY: null,
        sendProduct:null,
        platform: 'custom',
        tracker: 'tracking.retargeting.biz/v3/rajs/',
        coolDown: 500,
        sleep: false
    };

    _rtg.attr = {
        id: [
            'data-product_id',
            'data-id'
        ],
        qty: [
            'data-quantity',
            'data-qty'
        ]
    };

    _rtg.info = {
        ProductInfo:[],
        CategoryInfo:[],
        CartInfo:[],
        OrderInfo:[],
        OrderProducts:[],
        checkoutIdsInfo:[]
    };

    _rtg.selectors = {
        addToCart: null,
        addToWishlist: null,
        clickImage: null,
        commentOnProduct: null,
        removeFromCart: null,
        quantity: null
    };

    /* Todo: Model */
    _rtg.model = {
        custom: {
            /* TODO: SendProduct Model */
            sendProduct: {
                id: 'id',
                name: 'name',
                url: 'url',
                img: 'img',
                price: 'price',
                promo: 'promo',
                brand: 'brand',
                category: 'category',
                inventory: 'inventory',
                images: 'images'
            },

            brand: {
                id: 'id',
                name: 'name'
            },

            category: {
                id:'id',
                name: 'name',
                parent: 'parent',
                breadcrumb: 'breadcrumb'
            },

            breadcrumb:{
                id:'id',
                name: 'name',
                parent: 'parent'
            },

            inventory: {
                variations: 'variations',
                stock:'stock'
            },
            /* END */

            sendCategory: {
                id:'id',
                name: 'name',
                url: 'url',
                parent: 'parent',
                breadcrumb: 'breadcrumb'
            },
            /* TODO: AddToCart AND RemoveFromCart Model */
            addToCart: {
                product_id : 'id',
                quantity: 'quantity',
                variation: 'variation'
            },

            removeFromCart:{
                product_id:'product_id',
                quantity:'quantity',
                variation: 'variation'
            },

            variation:{
                code: 'code',
                stock: 'stock',
                details: 'details'
            },

            clickImage:{
                id: 'id'
            },

            saveOrder:{
                order_no: 'order_no',
                lastname: 'lastname',
                firstname: 'firstname',
                email: 'email',
                phone: 'phone',
                state: 'state',
                city: 'city',
                address: 'address',
                discount_code: 'discount_code',
                discount: 'discount',
                shipping: 'shipping',
                rebates: 'rebates',
                fees: 'fees',
                total: 'total'
            },

            saveOrderProducts: {
                id: 'id',
                quantity: 'quantity',
                price: 'price',
                variation_code: 'variation_code'
            }
        }
    };

    /* Messages */
    _rtg.Message = {
        plugIn : 'RTG PlugIn {version}',
        trackerBuild : 'Build Tracking',
        trackerReady : 'Tracking Ready',
        trackerFail : 'Tracking Fail Please Contact Support https://retargeting.Biz',
        Action : 'Triggering ',
        Sleep : 'Pending',
        Start: 'Start',
        Finish: 'Finish',

        addToCart: '{status} AddToCart',

        Fin: 'Finish {msg}',
        WakeUp: 'WakeUP',
        Load: 'Page Loaded',

        /* EVENT Messages */
        sendProduct: '{status} SendProduct',
        sendCategory: '{status} SendCategory',
        removeFromCart: '{status} RemoveFromCart',
        clickImage: '{status} clickImage',
        saveOrder: '{status} saveOrder',
    };

    /* f = Functions */
    _rtg.f = {};

    _rtg.f.gCoock = function(cName,eDT = {}){
        eDT.cName = cName+"=";
        eDT.cData = document.cookie.split(';');
        for(var i = 0; i < eDT.cData.length; i++) {
            eDT.DATA = eDT.cData[i];
            while (eDT.DATA.charAt(0)==' ') { eDT.DATA = eDT.DATA.substring(1); }
            if (eDT.DATA.indexOf(eDT.cName) == 0) { return eDT.DATA.substring(eDT.cName.length, eDT.DATA.length); }
        }
        return false;
    };

    _rtg.f.sCoock = function(cName,cValue = false ,cExp = 32140800000,cPath = "/",eDT = {}){
        eDT.DATA = _rtg.date;
        if (!cValue || cValue === 'false') { cExp = 0; }
        eDT.DATA.setTime(eDT.DATA.getTime()+cExp);
        document.cookie = cName+"="+cValue+";expires="+eDT.DATA.toUTCString()+";path="+cPath;
        return cValue;
    };
    _rtg.cfg.debug = _rtg.f.gCoock('debug');

    _rtg.cfg.debug = _rtg._GET["debug"] !== undefined ? _rtg.f.sCoock('debug', _rtg._GET["debug"] ) : _rtg.cfg.debug;

    _rtg.c = _rtg.debug ? console : _rtg.fakeDebug;

    /* Todo: Q Zone */
    _rtg.f.sleep = function (){
        _rtg.cfg.sleep = true;
    };

    _rtg.f.wakeUP = function (msg = false) {
        _rtg.cfg.sleep = false;

        for(let k in _rtg.tmp){
            if (_rtg.tmp[k] !== null) {
                _rtg.c.info( _rtg.Message[k].replace( '{status}', _rtg.Message.Finish ), _rtg.tmp[k]);
                _rtg.tmp[k] = null;
                return ;
            }
        }

        _rtg.c.info(
            msg ? _rtg.Message.Fin.replace('{msg}', msg) : _rtg.consoleMsg.WakeUp
        );
    };

    /* Todo: For */
    _rtg.f.forLoop = function (length, _callback){
        if(length){
            for (let row = 0; row < length; row++) {
                _callback(row);
            }
        }
    }

    _rtg.f.forKeyValue = function (obj, _callback){
        for (let key in obj) {
            if (obj[key] !== null) {
                _callback(key, obj[key]);
            }
        }
    }

    /* Todo: Check Type */
    _rtg.f.checkType = function (value){
        let type = typeof value;

        if (type === 'object') { type = value === null ? 'null' : value.constructor.name.toLowerCase(); }

        switch (type){
            case 'undefined': case 'object': case 'array': case 'null': case 'string':
                break;
            case 'number':
                type = Number.isNaN(value) ? 'nan' : type;
                break;
            default:
                type = 'class';
        }
        return type;
    };

    /* Todo: Convert To Array */
    _rtg.f.validData = function (value){
        let type = _rtg.f.checkType(value);
        switch (type){
            case 'string':
                value = value.split(",");
                break;
            case 'object':
                value = Object.values(value);
                break;
        }

        return value;
    };

    /* Todo: AddData */
    _rtg.f.addData = function (type,key,value){
        value = _rtg.f.validData(value);

        _rtg.f.forLoop (value.length, function (row){
            switch (key) {
                case 'CartInfo':
                    _rtg.info[key].push(value[row]);
                    break;
                case 'CategoryInfo':
                case 'ProductInfo':
                case 'OrderInfo':
                case 'OrderProducts':
                    _rtg.info[key].push(value[row]);
                    break;
                case 'attrID':
                    _rtg.attr.id.push(value[row])
                    break
                case 'attrQty':
                    _rtg.attr.qty.push(value[row])
                    break
                default:
                    _rtg[type][key] = _rtg[type][key] ?? [];
                    _rtg[type][key].push(value[row]);
            }
        });
    };

    /* Todo: Filter Data */
    _rtg.f.filterData = function(val, Type){
        let newOrder = {};

        let order = _rtg.model[_rtg.platform];

        _rtg.f.forKeyValue(order[Type],function (x,value){
            switch(x){
                case 'price':
                    newOrder[x] = val[value];
                    break;
                case 'promo':
                    newOrder[x] = val[value] === 0 ? newOrder['price'] : val[value];
                    break;
                case 'quantity':
                    newOrder[x] = val[value] ?? 1;
                    break;
                case 'inventory':
                case 'variation':
                    if(val[value] === undefined || val[value] === false || val[value].length === 0){
                        newOrder[x] = false;
                    }else{
                        newOrder[x] = _rtg.f.filterData(val[value], x);
                    }
                    break;
                case 'breadcrumb':
                    newOrder[x] = val[value] ? [] : false;
                    if( newOrder[x] ){
                        _rtg.f.forKeyValue(val[value], function (k,v){
                            newOrder[x].push( _rtg.f.filterData(v,x) );
                        });
                    }
                    break;

                case 'category':
                    newOrder[x] = [];
                    _rtg.f.forKeyValue(val[value], function (k,v){
                        newOrder[x].push( _rtg.f.filterData(v,x) );
                    });
                    break;
                default:
                    newOrder[x] = val[value] === undefined ? false : val[value];
            }
        });
        return newOrder;
    };

    /* Todo: RTG Console */
    _rtg.fakeDebug = {
        assert: _rtg.false,
        clear: _rtg.false,
        count: _rtg.false,
        error: _rtg.false,
        group: _rtg.false,
        groupCollapsed: _rtg.false,
        groupEnd: _rtg.false,
        info: _rtg.false,
        log: _rtg.false,
        table: _rtg.false,
        time: _rtg.false,
        timeEnd: _rtg.false,
        trace: _rtg.false,
        warn: _rtg.false
    };

    /* Todo: Console = c */
    _rtg.c = _rtg.debug ? console : _rtg.fakeDebug;
    /* END RTG Console */

    /* Todo: Tracker Builder */
    _rtg.t = function (key){
        _rtg.c.info( _rtg.Message.trackerBuild );

        ra_key = _rtg.cfg.APIKEY = key;
        ra_params = {
            add_to_cart_button_id: 'add_to_cart_button_id',
            price_label_id: 'price_label_id',
        };

        /* create Tracker */
        _rtg.script = document.createElement("script");
        _rtg.firstScript = document.getElementsByTagName("script")[0];

        _rtg.script.async = true;
        _rtg.script.type = "text/javascript";
        _rtg.script.src = ("https:" === document.location.protocol ? "https://" : "http://") +
            _rtg.tracker + ra_key + ".js";
        _rtg.script.addEventListener('error', function(){
            console.info( _rtg.Message.trackerFail );
        }, true);
        /* Insert */
        _rtg.firstScript.parentNode.insertBefore(_rtg.script, _rtg.firstScript);

        _rtg.script.addEventListener("load", function (){
            _rtg.working = true;
            _rtg.cfg.ra = window._ra;
            _rtg.c.info( _rtg.Message.trackerReady );
        });
        /* END create Tracker */
    };

    /* Todo: Processor */
    _rtg.p = function (key=false, value=false) {
        if (key !== false) {
            switch(key){
                case 'APIKEY':
                    _rtg.t(value);
                    break;

                case 'CategoryInfo':
                case 'ProductInfo':
                case 'CartInfo':
                    value = value.id !== undefined || value.product_id !== undefined? [ value ] : value;
                    _rtg.f.addData('info', key, value);
                    break;
                case 'OrderInfo':
                    value = [ value ];
                    _rtg.f.addData('info', key, value);
                    break;
                case 'OrderProducts':
                    _rtg.f.addData('info', key, value);
                break;

                case 'addToCart':
                case 'addToWishlist':
                case 'clickImage':
                case 'commentOnProduct':
                case 'removeFromCart':
                case 'quantity':
                    _rtg.f.addData('selectors', key, value);
                break;

                case 'attrID':
                case 'attrQty':
                    _rtg.f.addData('attr', key, value);
                break;

                case 'debug':
                    _rtg.cfg.debug = value;
                    _rtg.c = _rtg.debug ? console : _rtg.fakeDebug;
                break;
                default:
                    _rtg.cfg[key] = value;
            }
        }
        return _rtg;
    };
    _rtg.builder = function () {
        _rtg.f.forKeyValue(_rtg.info, function (key,value){
            switch (key){
                case 'ProductInfo':
                    _rtg.f.forLoop(value.length, function (row) {
                        let d = _rtg.f.filterData(value[row], 'sendProduct');
                        _rtg.data.sendProduct[d.id] = d;
                        _rtg.send.sendProduct[d.id] = false;

                        _rtg.order.sendProduct.push(d.id);

                        d = _rtg.f.filterData(value[row], 'addToCart');
                        _rtg.data.addToCart[d.product_id] = d;

                        _rtg.order.addToCart.push(d.product_id);
                    });
                    break;
                case 'CategoryInfo':
                    _rtg.f.forLoop(_rtg.CategoryInfo.length, function (row) {
                        let d = _rtg.f.filterData(value[row], 'sendCategory');
                        _rtg.data.sendCategory[d.id] = d;
                        _rtg.send.sendCategory[d.id] = false;

                        _rtg.order.sendCategory.push(d.id);
                    });
                    break;
                case 'CartInfo':
                    _rtg.f.forLoop(_rtg.CartInfo.length, function (row) {
                        let d = _rtg.f.filterData(value[row], 'removeFromCart');

                        _rtg.order.removeFromCart.push(d.product_id);

                        _rtg.data.removeFromCart[d.product_id] = d;
                    });
                    break;
                case 'OrderInfo':
                    _rtg.f.forLoop(_rtg.OrderInfo.length, function (row) {
                        let d = _rtg.f.filterData(value[row], 'saveOrder');

                        _rtg.data.saveOrder = d;
                    });
                    break;
                case 'OrderProducts':
                    _rtg.f.forLoop(_rtg.OrderProducts.length, function (row) {
                        let d = _rtg.f.filterData(value[row], 'saveOrderProducts');

                        _rtg.data.saveOrderProducts[row] = d;
                    });
                    break;
                default:
            }
        });
    };
    window.addEventListener("load", function () {
        if ( _rtg.working ) {
            _rtg.builder();

            /*TODO: sendCategory*/
            _rtg.f.forKeyValue(_rtg.data.sendCategory, function (key, value) {
                _rtg.q(_rtg.event.sendCategory, key);
            });
            /*TODO: saveOrder*/

            _rtg.OrderInfo.length ? _rtg.q(_rtg.event.saveOrder) : false;

            _rtg.sendProduct !== null ?
                _rtg.event.sendProduct(_rtg.sendProduct) : false;

            document.addEventListener('click', _rtg.clickEvent, false);
            document.addEventListener('change', _rtg.changeEvent, false);

            /*TODO: Nivel 1*/
            /*_rtg.f.forKeyValue(_rtg.selectors, _rtg.f.rowSelector );*/

            _rtg.c.info(_rtg.Message.Load);
        }
    });
    _rtg.clickEvent = function (ev){
        let nodes;
        let evTarget = ev.target;
        let search = true;
        let find = [];

        _rtg.f.forKeyValue(_rtg.selectors, function (key,value){
            switch (key){
                case 'addToCart':
                case 'clickImage':
                case 'removeFromCart':
                    if(search && value.length){
                        _rtg.f.forLoop(value.length, function (num) {
                            if(!search){ return; }
                            nodes = Array.prototype.slice.call( document.querySelectorAll( value[num] ) );
                            find = [key, nodes.indexOf(evTarget), value[num]];
                            search = find[1] === -1;
                        });
                    }
                break;
            }
        });
        let q;
        if(!search){
            if(find[0] === 'addToCart'){
                q = _rtg.f.getID(evTarget, _rtg.order.addToCart[find[1]]);

                if (_rtg.data.sendProduct.hasOwnProperty(q)) {
                    _rtg.q(_rtg.event.sendProduct, q);
                }

                _rtg.q(_rtg.event.addToCart, q);
            }

            if(find[0] === 'clickImage'){
                console.log(find, _rtg.order.sendProduct[find[1]]);
                //rtg.f.getID(evTarget, _rtg.order.addToCart[find[1]])
                q = _rtg.order.sendProduct[find[1]];

                _rtg.q(_rtg.event.clickImage, q);
            }

            if(find[0] === 'removeFromCart'){
                q = _rtg.f.getID(evTarget, _rtg.order.removeFromCart[find[1]]);

                _rtg.order.removeFromCart.splice(find[1], 1);
                _rtg.q(_rtg.event.removeFromCart, q);
            }
        }
    };

    _rtg.f.getID = function (target, backup){
        for (let row = 0; row < _rtg.attr.id.length; row++) {
            if(target.hasAttribute(_rtg.attr.id[row])){
                return target.getAttribute(_rtg.attr.id[row]);
            }
        }
        /*
        if (typeof target.nextSibling.hasAttribute !== 'undefined') {
            for (let row = 0; row < _rtg.attr.id.length; row++) {
                if(target.nextSibling.hasAttribute(_rtg.attr.id[row])){
                    return target.nextSibling.getAttribute(_rtg.attr.id[row]);
                }
            }
        }

        if (typeof target.nextSibling.hasAttribute !== 'undefined') {
            for (let row = 0; row < _rtg.attr.id.length; row++) {
                if(target.previousSibling.hasAttribute(_rtg.attr.id[row])){
                    return target.previousSibling.getAttribute(_rtg.attr.id[row]);
                }
            }
        }
        */
        return backup;
    }
    _rtg.f.getQty = function (target, backup){
        for (let row = 0; row < _rtg.attr.qty.length; row++) {
            if(target.hasAttribute(_rtg.attr.id[row])){
                return target.getAttribute(_rtg.attr.id[row]);
            }
        }
        /*
        if (target.nextSibling !== undefined) {
            for (let row = 0; row < _rtg.attr.qty.length; row++) {
                if(target.nextSibling.hasAttribute(_rtg.attr.id[row])){
                    return target.nextSibling.getAttribute(_rtg.attr.id[row]);
                }
            }
        }
        if (target.previousSibling !== undefined) {
            for (let row = 0; row < _rtg.attr.qty.length; row++) {
                if(target.previousSibling.hasAttribute(_rtg.attr.id[row])){
                    return target.previousSibling.getAttribute(_rtg.attr.id[row]);
                }
            }
        }*/
        return backup;
    }
    _rtg.changeEvent = function (ev){
        /*let nodes;
        let evTarget = ev.target;*/
        let search = true;
        let find = [false,false,false];
        let count = 0;
        _rtg.f.forKeyValue(_rtg.selectors, function (key,value){
            switch (key){
                case 'quantity':
                    if(search && value.length){
                        _rtg.f.forLoop(value.length, function (num) {
                            count = document.querySelectorAll(value[num]).length;

                            if(!count ){ return; }

                            _rtg.f.forLoop(count, function (query){
                                _rtg.f.upQty(value[num], query, count);
                            });
                            /*!search ||
                            nodes = Array.prototype.slice.call( document.querySelectorAll( value[num] ) );
                            find = [key, nodes.indexOf(evTarget), value[num]];
                            search = find[1] === -1;*/
                        });
                    }
                break;
                default:
            }
        });

        if(!search){
            if(find[0] === 'quantity'){
                /*_rtg.f.upQty(find[2], find[1], document.querySelectorAll( find[2] ).length );*/
            }
        }
    };

    _rtg.q = function (call, id=false){
        _rtg.sleep ? setTimeout(function () { _rtg.q( call, id); }, _rtg.coolDown) : call(id);
    };

    /*TODO: Nivel 2*/
    _rtg.f.rowSelector = function (key,value = false){
        _rtg.f.forLoop(value.length, function (row){
            _rtg.f.rowQuery(key, row, value[row]);
        });
    };

    /* TODO: Nivel 3*/
    _rtg.f.rowQuery = function (key, row, selector){
        if (selector!==null) {
            _rtg.f.forLoop(document.querySelectorAll(selector).length, function (query){
                switch (key) {
                    case 'addToCart':
                        document.querySelectorAll(selector)[query].addEventListener("click", function () {
                            let q = _rtg.order.addToCart[query];
                            if (_rtg.data.addToCart.hasOwnProperty(q)) {
                                _rtg.q(_rtg.event.sendProduct, q);
                                _rtg.q(_rtg.event.addToCart, q);
                            }
                        });
                        break;
                    case 'addToWishlist':

                        break;
                    case 'clickImage':
                        document.querySelectorAll(selector)[query].addEventListener("click", function () {
                            let q = _rtg.order.sendProduct[query];
                            _rtg.q(_rtg.event.clickImage, q);
                        });
                        break;
                    case 'commentOnProduct':

                        break;
                    case 'removeFromCart':
                        document.querySelectorAll(selector)[query].addEventListener("click", function () {
                            let q = _rtg.order.removeFromCart[query];
                            _rtg.q(_rtg.event.removeFromCart, q);
                        });
                        break;
                    case 'quantity':
                        let count = document.querySelectorAll(selector).length;
                        _rtg.f.upQty(selector, query, count);
                        document.querySelectorAll(selector)[query].addEventListener("change", function (){
                            _rtg.f.upQty(selector, query, count);
                        });
                        break;
                    default:
                }
            });
        }
    };

    /* Todo: Events */
    _rtg.event = {};

    _rtg.event.sendCategory = function (id) {
        if (!_rtg.send.sendCategory[id]) {

            _rtg.tmp.sendCategory = _rtg.data.sendCategory[id];

            _rtg.f.sleep();

            _rtg.ra.sendCategory(_rtg.tmp.sendCategory, _rtg.f.wakeUP);
        }
        _rtg.send.sendCategory[id] = true;
    };

    _rtg.event.sendProduct = function (id) {
        if (!_rtg.send.sendProduct[id]) {
            _rtg.tmp.sendProduct = _rtg.data.sendProduct[id];

            _rtg.f.sleep();

            _rtg.ra.sendProduct(_rtg.tmp.sendProduct, _rtg.f.wakeUP );
        }
        _rtg.send.sendProduct[id] = true;
    };

    _rtg.event.addToCart = function (id) {

        if(!_rtg.data.addToCart.hasOwnProperty(id)){
            _rtg.data.addToCart[id] = {
                product_id: id,
                quantity: 1,
                variation: false
            };
        }

        if( _rtg.quantity.hasOwnProperty('id'+id) ){
            _rtg.data.addToCart[id].quantity = _rtg.quantity['id'+id];
        }

        _rtg.tmp.addToCart = _rtg.data.addToCart[id];

        _rtg.data.removeFromCart[id] = _rtg.data.addToCart[id];

        _rtg.order.removeFromCart.push(id);

        _rtg.f.sleep();

        _rtg.ra.addToCart(
            _rtg.tmp.addToCart.product_id,
            _rtg.tmp.addToCart.quantity,
            _rtg.tmp.addToCart.variation,
            _rtg.f.wakeUP
        );
    };

    _rtg.event.removeFromCart = function (id) {

        if(!_rtg.data.removeFromCart.hasOwnProperty(id)){
            _rtg.data.removeFromCart[id] = {
                product_id: id,
                quantity: 1,
                variation: false
            };
        }

        if( _rtg.quantity.hasOwnProperty('id'+id) ) {
            _rtg.data.removeFromCart[id].quantity = _rtg.quantity['id' + id];
        }
        _rtg.tmp.removeFromCart = _rtg.data.removeFromCart[id];

        _rtg.f.sleep();

        _rtg.ra.removeFromCart(
            _rtg.tmp.removeFromCart.product_id,
            _rtg.tmp.removeFromCart.quantity,
            _rtg.tmp.removeFromCart.variation,
            _rtg.f.wakeUP
        );
    };

    _rtg.event.clickImage = function (id){
        _rtg.tmp.clickImage = _rtg.f.filterData(_rtg.data.sendProduct[id], 'clickImage');

        _rtg.f.sleep();

        _rtg.ra.clickImage( _rtg.tmp.clickImage, _rtg.f.wakeUP );
    };

    _rtg.event.saveOrder = function (id) {
        _rtg.tmp.saveOrder = {
            saveOrderInfo : _rtg.data.saveOrder,
            saveOrderProducts: _rtg.data.saveOrderProducts};

        _rtg.f.sleep();

        _rtg.ra.saveOrder(_rtg.tmp.saveOrder.saveOrderInfo, _rtg.tmp.saveOrder.saveOrderProducts, _rtg.f.wakeUP );
    };

    _rtg.f.upQty = function (selector, query, count){
        if(count && count === _rtg.order.addToCart.length ) {
            let q = _rtg.f.getID(document.querySelectorAll(selector)[query], _rtg.order.addToCart[query]);
            _rtg.quantity['id'+q] = document.querySelectorAll(selector)[query].value;
        } else if(count && count === _rtg.order.removeFromCart.length ) {
            let q = _rtg.f.getID(document.querySelectorAll(selector)[query], _rtg.order.removeFromCart[query]);
            _rtg.quantity['id'+q] = document.querySelectorAll(selector)[query].value;
        }
    };
    /* END Events */

    _rtg.c.info( _rtg.Message.plugIn.replace('{version}',_rtg.version) );

    return _rtg.p;
})();
