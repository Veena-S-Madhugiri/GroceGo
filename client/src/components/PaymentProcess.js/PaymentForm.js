import React, { useState, useEffect } from 'react';
import braintree from 'braintree-web';

function PaymentForm() {
    const [clientToken, setClientToken] = useState('');

    useEffect(() => {
        async function fetchClientToken() {
            const response = await fetch('/client_token');
            const clientToken = await response.text();
            setClientToken(clientToken);
        }
        fetchClientToken();
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        braintree.client.create({
            authorization: clientToken
        }, function (err, clientInstance) {
            braintree.hostedFields.create({
                client: clientInstance,
                styles: {
                    input: {
                        'font-size': '16px',
                        'font-family': 'sans-serif',
                        'color': '#3a3a3a'
                    },
                    'input.invalid': {
                        'color': 'red'
                    },
                    'input.valid': {
                        'color': 'green'
                    }
                },
                fields: {
                    number: {
                        selector: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '123'
                    },
                    expirationDate: {
                        selector: '#expiration-date',
                        placeholder: 'MM/YY'
                    }
                }
            }, function (err, hostedFieldsInstance) {
                hostedFieldsInstance.tokenize(function (err, payload) {
                    console.log(payload.nonce);
                    // send the payment nonce to the server
                });
            });
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <div id="card-number"></div>
            <div id="cvv"></div>
            <div id="expiration-date"></div>
            <button type="submit">Pay</button>
        </form>
    );
}

export default PaymentForm;
