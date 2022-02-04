import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
    Page, Form, Layout, FormLayout, TextField,
    AppProvider, Button, Toast, Frame, Banner
} from '@shopify/polaris';

const Notification = props => {
    const [form, setForm] = useState({
        title: '',
        color: '#fff',
        background_color: '#000'
    })

    const [successToast, setSuccessToast] = useState({show: false, message: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        fetch("/notifications", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionToken
            },
            body: JSON.stringify(form),
        })
            .then(response => response.json())
            .then(data => {
                const {message, errors} = data;
                if (errors) {
                    setErrorMessage(errors.join(". "))
                } else {
                    setSuccessToast({show: true, message: message})
                }
            });
    }

    const handleFieldChange = (value, id) => {
        setForm({
            ...form,
            [id]: value
        })
    }

    useEffect(() => {
        //TODO: Get values of FORM from API
    }, [])

    const renderToast = () => {
        if (successToast.show) {
            return (<Toast content={successToast.message}
                           onDismiss={() => setSuccessToast({...successToast, show: false})}/>)
        }
    }

    const showErrorsBanner = () => {
        if (errorMessage) {
            return (
                <Banner status="critical">{errorMessage}</Banner>
            );
        }
    }


    return (
        <Frame>
            <Page title="Notifications">
                <Layout>
                    {renderToast()}
                    <Layout.Section>
                        {showErrorsBanner()}
                    </Layout.Section>
                    <Layout.Section>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={form.title}
                                    id="title"
                                    requiredIndicator={true}
                                    onChange={handleFieldChange}
                                    label="Title"
                                    type="text"
                                    helpText={
                                        <span>Title of notification</span>
                                    }
                                />
                                <TextField
                                    value={form.color}
                                    id="color"
                                    onChange={handleFieldChange}
                                    label="Color"
                                    type="color"
                                />
                                <TextField
                                    value={form.background_color}
                                    id="background_color"
                                    onChange={handleFieldChange}
                                    label="Background Color"
                                    type="color"
                                />
                                <Button submit>Submit</Button>
                            </FormLayout>
                        </Form>
                    </Layout.Section>

                </Layout>
            </Page>
        </Frame>
    )
}

// Render component with data
document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('hello-react')
    ReactDOM.render(<AppProvider><Notification/></AppProvider>, node)
})