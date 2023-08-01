<template>
    <div :style="wrapperStyles" class="wrapper" v-if="! hide">
        <input
            type="text"
            v-model="name"
            :placeholder="nameFieldPlaceholder"
            v-if="this.element.show_name_field"
            :style="inputStyles"
            class="input"
            :class="placeholderClass"
        />
        <input
            type="email"
            v-model="email"
            :placeholder="emailFieldPlaceholder"
            :style="inputStyles"
            class="input"
            :class="placeholderClass"
        />
        <span :style="{flex: 1, flexGrow: 0}">
            <span :style="buttonStyles" class="button" v-html="theHtml" @click="submit"></span>
        </span>
    </div>
</template>
<script>
//import handleAction from '@mixins/HandleAction';
import useAction from '../hooks/useAction';
import useProject from '../hooks/useProject';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
//import { mapGetters } from 'vuex';
import { appendPlaceholderColorToDom, randomString } from '@lib/utils';
import useAnalytics from '../hooks/useAnalytics';
import useConfig from '../hooks/useConfig';

export default {
    name: 'Form',
    setup(){
        const { handleAction } = useAction();
        const { analytics } = useAnalytics();
        const { apiUrl } = useConfig();
        const { project } = useProject();
        return { handleAction, analytics, apiUrl, project };
    },
    props: {
        element: {
            required: true,
            type: Object
        },
        interaction: {},
        isModalElement: {},
        modalElement: {}
    },

    data() {
        return {
            name: '',
            email: '',
            loading: false,
            hide: false,
            placeholderClass: ''
        };
    },

    mounted() {
        this.placeholderClass = randomString(6);
        appendPlaceholderColorToDom(
            this.element.input_color,
            this.placeholderClass
        );        
    },

    computed: {
        //...mapGetters(['userId']),
        userId() {
            const { project } = useProject();
            return project.value.user_id;
        },
        nameFieldPlaceholder() {
            return this.element.name_placeholder_text || 'Name';
        },
        emailFieldPlaceholder() {
            return this.element.email_placeholder_text || 'Email';
        },
        wrapperStyles() {
            const style = {
                flexDirection: this.element.on_one_line ? 'row' : 'column',
                paddingLeft: this.element.padding + 'px',
                paddingRight: this.element.padding + 'px',
                backgroundColor: this.element.backgroundColour,
                borderRadius: this.element.borderRadius + 'px',
                borderWidth: this.element.border_width + 'px',
                borderStyle: this.element.border_type,
                borderColor: this.element.border_color,
                zIndex: this.element.zIndex
            }
            return style;
        },

        buttonStyles() {
            return {
                paddingLeft: this.element.button_paddingSides + 'px',
                paddingRight: this.element.button_paddingSides + 'px',
                borderRadius: this.element.button_borderRadius + 'px',
                letterSpacing: this.element.button_letterSpacing + 'px',
                // As the text colour is set in the wsiwig we need to force this to change when loading to ensure the user
                // can see the loader
                backgroundColor: this.loading
                    ? 'rgba(43, 51, 63, 0.7)'
                    : this.element.button_background,
                borderStyle: this.element.button_borderType,
                borderWidth: this.element.button_borderWidth + 'px',
                borderColor: this.element.button_borderColor,
                fontFamily: this.project.font
            };
        },

        inputStyles() {
            const styleObj = {
                background: this.element.input_background,
                color: this.element.input_color,
                borderRadius: this.element.input_borderRadius + 'px',
                height: '40px',
                borderColor: this.element.input_borderColor,
                borderStyle: this.element.input_borderType,
                borderWidth: this.element.input_borderWidth + 'px',
                fontFamily: this.project.font
            };
            if (!this.element.on_one_line) {
                styleObj.marginBottom = '10px';
                styleObj.marginRight = 0;
            }
            return styleObj;
        },

        theHtml() {
            if (this.loading) {
                return '<i class="fa-cog fa-spin fa" style="color:white"></i>';
            }

            return this.element.button_html;
        },

        autoresponderRoutes() {
            const api = this.apiUrl;
            return {
                integration_activecampaign: api + '/activecampaign/addContact',
                integration_getresponse: api + '/getresponse/addContact',
                integration_sendlane: api + '/sendlane/addContact',
                integration_aweber: api + '/aweber/addContact',
                integration_mailchimp: api + '/mailchimp/addContact',
                integration_zapier: this.element.integration_webhook
            };
        },

        useAutoResponder() {
            return Boolean(this.element.data_handler === 'autoresponder');
        },
        useCustomLists() {
            return Boolean(this.element.data_handler === 'custom_list');
        },
        useZapierResponder() {
            return (
                this.useAutoResponder &&
                this.element.integration === 'integration_zapier'
            );
        },

        apiUrls() {
            return {
                autoresponderRoute: this.autoresponderRoutes[
                    this.element.integration
                ],
                customListsRoute:
                    this.apiUrl + '/customlists/addContact'
            };
        },

        successMessage() {
            return this.element.success_text
                ? this.element.success_text
                : 'Your email was saved successfully';
        },

        errorMessage() {
            return this.element.error_text
                ? this.element.error_text
                : 'Error saving email';
        }
    },

    methods: {
        validate() {
            const {
                integration_webhook,
                integration_list,
                show_name_field
            } = this.element;
            const errors = [];

            if (!this.useAutoResponder && !this.useCustomLists) {
                errors.push('Sorry, the form is not set up correctly!');
            }

            if (this.useAutoResponder) {
                if (this.useZapierResponder && !integration_webhook) {
                    errors.push(
                        'The Zapier autoresponder integration has not been set up properly for this interaction'
                    );
                } else if (!this.useZapierResponder && !integration_list) {
                    errors.push(
                        'Autoresponder Integration has not been set up properly for this interaction'
                    );
                }
            }

            if (show_name_field && !this.name) {
                errors.push('Name field must not be empty');
            }

            if (!isEmail(this.email)) {
                errors.push('A valid email is required');
            }
            return errors;
        },

        submit() {
            const {
                integration_list,
                integration_webhook,
                custom_list_id,
                show_name_field,
                sub_user
            } = this.element;

            const validationErrors = this.validate();
            if (validationErrors.length) {
                // this.$alert('Error', validationErrors[0], 'error');
                // this.$toast.open({
                //     message: validationErrors[0],
                //     type: 'error'
                // });
                return;
            }

            this.analytics.interaction(this.element);

            this.loading = true;

            const data = {
                email: this.email
            };

            if (show_name_field) data.name = this.name;

            if (this.useAutoResponder && !this.useZapierResponder) {
                data.list_id = integration_list;
                data.autoresponder_owner = sub_user ? sub_user : this.userId;
            }

            if (this.useCustomLists) data.custom_lists_id = custom_list_id;

            const requestObj = {
                url: this.useCustomLists
                    ? this.apiUrls.customListsRoute
                    : this.apiUrls.autoresponderRoute,
                method: 'post',
                data
            };

            if (this.useCustomLists) {
                axios(requestObj)
                    .then(this.handleSuccess)
                    .catch(this.handleError);
            } else if (this.useAutoResponder) {
                if (this.useZapierResponder) {
                    axios({
                        ...requestObj,
                        transformRequest: [
                            (data, headers) => {
                                headers.post['Content-Type'] =
                                    'multipart/form-data';
                                const formData = new FormData();
                                for (const field of Object.keys(data)) {
                                    formData.append(field, data[field]);
                                }
                                return formData;
                            }
                        ]
                    })
                        .then(this.handleSuccess)
                        .catch(this.handleError)
                } else {
                    axios({
                        ...requestObj,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(this.handleSuccess)
                        .catch(this.handleError);
                }
            }
        },
        clearInputFields(){
            this.name = this.email = '';
        },
        handleSuccess(response) {
            const { action, actionArg } = this.element;
            this.loading = false;

            if (this.debug) {
                console.warn(response);
            }

            // this.$toast.open({
            //     message: this.successMessage,
            //     type: 'success'
            // });

            this.clearInputFields()

            this.handleAction({action, actionArg});
        },
        handleError(error) {
            this.loading = false;

            if (this.debug) {
                console.warn(error);
            }

            // this.$toast.open({
            //     message: this.errorMessage,
            //     type: 'error'
            // });
        }
    }
};
</script>
<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    border-color: black;
    border-width: 1px;
    cursor: pointer;
}

.input {
    width: 100%;
    display: flex;
    border: 1px solid #cccccc;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    line-height: 1.5em;
    height: 34px;
    padding: 10px 8px;
    max-width: 100%;
    box-shadow: inset 2px 2px 14px -4px rgba(0, 0, 0, 0.33);
    font-size: 16px;
    margin-right: 10px;
}
.input::placeholder,
.input::-webkit-input-placeholder {
    color: #6b6b6b;
}
</style>
