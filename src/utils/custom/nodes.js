export const nodes = {
    leitura: {
        name: 'Data',
        key: 'leitura',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/leitura',
        pathToEdit: '/edit/leitura',
        pathToNew: '/new/leitura',
        keys: [
            {name: 'Client', key: "cliente", type: 'email', required: 'true'},
            {name: 'Date', key: "data", type: 'datetime-local', required: 'true'},
            {name: 'Temperature', key: "temperatura", type: 'number', required: 'true'},
            {name: 'Humidity', key: "umidade", type: 'number', required: 'true'},
        ],
        canAddNew: true,
        unique: false
    },
    users: {
        name: 'Users',
        key: 'users',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/users',
        pathToEdit: '/edit/users',
        pathToNew: '/new/users',
        keys: [
            {name: 'Name', key: "displayName", type: 'text', required: 'true'},
            {name: 'Email', key: "email", type: 'email', required: 'true'},
        ],
        canAddNew: true,
        unique: false
    },
    devices: {
        name: 'Devices',
        key: 'devices',
        flat: c => c,
        orderByChild: null,
        pathToMainLink: '/data/devices',
        pathToEdit: '/edit/devices',
        pathToNew: '/new/devices',
        keys: [
            {name: 'Name', key: "name", type: 'text', required: 'true'},
            {name: 'Client', key: "client", type: 'email', required: 'true'},
            {name: 'Date of last update', key: "date", type: 'date', required: 'true'},
            {name: 'Light', key: "light", type: 'checkbox', required: 'true'},
            {name: 'Fan', key: "fan", type: 'checkbox', required: 'true'},
        ],
        canAddNew: false,
        unique: true
    }
};
