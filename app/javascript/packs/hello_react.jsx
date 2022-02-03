import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Page, Card, Button, Thumbnail, AppProvider} from '@shopify/polaris';

const Hello = props => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts(){
            setTimeout(()=>{
                var headers = new Headers({"Authorization": "Bearer " + window.sessionToken});
                return fetch("/products", {headers})
                    .then(response => response.json())
                    .then(data => {
                        var products = data.products;

                        if (products === undefined || products.length == 0) {
                            setProducts([])
                        } else {
                            setProducts(products)
                        }
                    });
            },1000)

        }
        fetchProducts()


    }, [])
    return (
        <Page title="Products">
            {products && products.map((product, index) => (
                <Card key={index}
                      title={product.title}
                      primaryFooterAction={{
                          content: 'View',
                          url: 'https://${shop_session.url}/admin/products/${product.id}',
                      }}
                      sectioned
                >
                    <Thumbnail
                        source={((product.images !== null) ? product.images[0].src : 'https://images-na.ssl-images-amazon.com/images/I/91JKyhY%2BtFL._SL1500_.jpg')}
                        alt={product.title}
                        size="large"
                    />

                </Card>
            ))}
        </Page>
    )
}

// Render component with data  
document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('hello-react')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(<AppProvider><Hello {...data} /></AppProvider>, node)
})