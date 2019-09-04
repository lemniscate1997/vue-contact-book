import CreateContact from '../contact-create/index';
import $ from 'jquery'

export default {
    name: 'contact-create-view',
    components: {
        CreateContact
    },
    props: ['contact'],
    data() {
        return {
            title: ''
        }
    },
    created() {

    },
    computed: {

    },
    mounted() {
        if (this.contact.contact !== null) {
            this.title = 'Update';
        } else {
            this.title = 'Create';
        }
        $('#openModel').click();
    },
    methods: {
        contactUpdate: function(data) {
            $("#close-model").click();
            this.$emit('finalModified', data);
        },
        contactCreate: function() {
            $("#close-model").click();
            this.$emit('finalCreation')
        }
    },
    watch: {
        contact() {
            if (this.contact.contact !== null) {
                this.title = 'Update';
            } else {
                this.title = 'create';
            }
            $('#openModel').click();
        }
    },
}