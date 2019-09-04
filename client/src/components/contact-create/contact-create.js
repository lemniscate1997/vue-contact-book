import { validationMixin } from "vuelidate";
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";
import contactService from '../../services/ContactService';

export default {
    name: 'contact-create',
    props: ['viewData'],
    data() {
        return {
            form: {
                firstname: "",
                lastname: "",
                email: "",
                contact: "",
                type: "Home"
            },
            isSubmitted: true,
            title: ''
        };
    },
    mixins: [validationMixin],
    validations: {
        form: {
            firstname: { required, maxLength: maxLength(20) },
            lastname: { required, maxLength: maxLength(20) },
            email: { required, email },
            contact: { required, minLength: minLength(10), maxLength: maxLength(10) }
        }
    },
    created() {
        if (this.viewData.contact !== null) {
            this.form = this.viewData.contact;
            this.title = 'Update';
        } else {
            this.form = {
                firstname: "",
                lastname: "",
                email: "",
                contact: "",
                type: "Home"
            }
            this.title = 'Create';
        }
    },
    methods: {
        onSubmit: async function() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            } else {
                try {
                    console.log(this.form);
                    if (this.viewData.contact !== null) {
                        let result = await contactService.updateContact(this.viewData.contact.contactid, this.form);
                        this.$emit('update', this.form);
                    } else {
                        let result = await contactService.createContact(this.form);
                        this.$emit('create')
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    watch: {
        viewData() {
            if (this.viewData.contact !== null) {
                this.form = this.viewData.contact;
                this.title = 'Update';
            } else {
                this.form = {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact: "",
                    type: "Home"
                }
                this.title = 'Create';
            }
        }
    },
}