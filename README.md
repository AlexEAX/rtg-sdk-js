# Retargeting JavaScript SDK
Implementare plugin Retargeting

## Installare
Pasul 1
```js
<script src="https://yourdomain.tld/rtg-sdk.js"></script>
```

Pasul 2
```js
<script async>
RTG('APIKEY','Retargeting Key');
</script>
```

Pasul 3
```js
<script>
RTG('clickImage','.zoomImg'); // Image Selector
RTG('addToCart','.ajax_add_to_cart'); // addToCart Selector
RTG('addToCart','.single_add_to_cart_button'); // addToCart Selector 2 
RTG('removeFromCart','.remove'); // removeFromCart Selector
RTG('quantity','.qty'); // quantity Selector
</script>
```

Pasul 4
```js
<script>
RTG('CategoryInfo',{
    "id": 20,
    "name": "Shoes",
    "url": 'https://www.domain.com/men/shoes/sport-shoes',
    "parent": false,
    "breadcrumb": [] 
});
</script>
```
OR
```js
<script>
RTG('CategoryInfo',{
    "id": 21,
    "name": "Sneakers",
    "url": 'https://www.domain.com/men/shoes/sport-shoes',
    "parent": 20,
    "breadcrumb": [
        {"id": 21, "name": "Sneakers", "parent": 20},
        {"id": 20, "name": "Shoes", "parent": false}
    ]
});
</script>
```
Date Produs
```js
<script>
RTG('ProductInfo',{
    "id": product_id,
    "name": "product_name",
    "url": "product_url",
    "img": "product_main_image_src",
    "price": product_price,
    "promo": product_promotional_price,
    "brand": {
        "id": brand_id,
        "name": "brand_name"
    },
    "category": [
        {
            "id": category_id,
            "name": "category_name",
            "parent": parent_category_id,
            "breadcrumb": [
                {
                    "id": parent_category_id,
                    "name": "parent_category_name",
                    "parent": parent_of_parent_category_id
                },
                {
                    "id": parent_of_parent_category_id,
                    "name": "parent_of_parent_category_name",
                    "parent": false
                }
            ]
        }
    ],
    "inventory": {
        "variations": true,
        "stock": {
            "variation-code-1": true, 
            "variation-code-2": false, 
            "variation-code-3": true
        }
    }
});
</script>
```
OR
```js
<script>
RTG('ProductInfo',[{
    "id": product_id,
    "name": "product_name",
    "url": "product_url",
    "img": "product_main_image_src",
    "price": product_price,
    "promo": product_promotional_price,
    "brand": {
        "id": brand_id,
        "name": "brand_name"
    },
    "category": [
        {
            "id": category_id,
            "name": "category_name",
            "parent": parent_category_id,
            "breadcrumb": [
                {
                    "id": parent_category_id,
                    "name": "parent_category_name",
                    "parent": parent_of_parent_category_id
                },
                {
                    "id": parent_of_parent_category_id,
                    "name": "parent_of_parent_category_name",
                    "parent": false
                }
            ]
        }
    ],
    "inventory": {
        "variations": true,
        "stock": {
            "variation-code-1": true, 
            "variation-code-2": false, 
            "variation-code-3": true
        }
    }
},{
    "id": product_id2,
    "name": "product_name2",
    "url": "product_url",
    "img": "product_main_image_src",
    "price": product_price,
    "promo": product_promotional_price,
    "brand": {
        "id": brand_id,
        "name": "brand_name"
    },
    "category": [
        {
            "id": category_id,
            "name": "category_name",
            "parent": parent_category_id,
            "breadcrumb": [
                {
                    "id": parent_category_id,
                    "name": "parent_category_name",
                    "parent": parent_of_parent_category_id
                },
                {
                    "id": parent_of_parent_category_id,
                    "name": "parent_of_parent_category_name",
                    "parent": false
                }
            ]
        },
    ],
    "inventory": {
        "variations": true,
        "stock": {
            "variation-code-1": true, 
            "variation-code-2": false, 
            "variation-code-3": true
        }
    }
}]);
</script>
```
OR
```js
<script>
/* Produs 1 */
RTG('ProductInfo',{
    "id": product_id,
    "name": "product_name",
    "url": "product_url",
    "img": "product_main_image_src",
    "price": product_price,
    "promo": product_promotional_price,
    "brand": {
        "id": brand_id,
        "name": "brand_name"
    },
    "category": [
        {
            "id": category_id,
            "name": "category_name",
            "parent": parent_category_id,
            "breadcrumb": [
                {
                    "id": parent_category_id,
                    "name": "parent_category_name",
                    "parent": parent_of_parent_category_id
                },
                {
                    "id": parent_of_parent_category_id,
                    "name": "parent_of_parent_category_name",
                    "parent": false
                }
            ]
        }
    ],
    "inventory": {
        "variations": true,
        "stock": {
            "variation-code-1": true, 
            "variation-code-2": false, 
            "variation-code-3": true
        }
    }
});
/* Produs 2 */
RTG('ProductInfo',{
    "id": product_id2,
    "name": "product_name2",
    "url": "product_url",
    "img": "product_main_image_src",
    "price": product_price,
    "promo": product_promotional_price,
    "brand": {
        "id": brand_id,
        "name": "brand_name"
    },
    "category": [
        {
            "id": category_id,
            "name": "category_name",
            "parent": parent_category_id,
            "breadcrumb": [
                {
                    "id": parent_category_id,
                    "name": "parent_category_name",
                    "parent": parent_of_parent_category_id
                },
                {
                    "id": parent_of_parent_category_id,
                    "name": "parent_of_parent_category_name",
                    "parent": false
                }
            ]
        }
    ],
    "inventory": {
        "variations": true,
        "stock": {
            "variation-code-1": true, 
            "variation-code-2": false, 
            "variation-code-3": true
        }
    }
});
</script>
```
SendProduct OnLoad
```js
<script>
RTG('sendProduct',product_id);
</script>
```
saveOrder OnLoad
```js
<script>
RTG('OrderInfo',{
    "order_no": "unique_order_number",
    "lastname": "buyer_last_name",
    "firstname": "buyer_first_name",
    "email": "buyer_email",
    "phone": "buyer_phone",
    "state": "buyer_state",
    "city": "buyer_city",
    "address": "buyer_address",
    "discount_code": ["discount_code_1", "discount_code_2"],
    "discount": total_discount_value,
    "shipping": shipping_value,
    "rebates": rebates_value_besides_discount,
    "fees": fees_value_besides_shipping,
    "total": total_order_value
});
RTG('OrderProducts',[
    {
        "id": product_id,
        "quantity": product_quantity,
        "price": unit_product_price,
        "variation_code": "product_variation_code"
    },{
        "id": product_id2,
        "quantity": product_quantity,
        "price": unit_product_price,
        "variation_code": "product_variation_code"
    }
]);
</script>
```
