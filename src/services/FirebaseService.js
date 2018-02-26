import {facebookProvider, firebaseAuth, firebaseDatabase, googleProvider} from '../utils/custom/firebase'
import {nodes} from "../utils/custom/nodes";
// import {routes} from "../utils/custom/routes";

//TODO: REMOVE THIS SHIT OF THEN CATCH FROM SERVICE
export class FirebaseService {
    static getAllDataBy = (rootNode, callback, size = 10, flatMap, orderByChild) => {

        let query = orderByChild != null
            ? firebaseDatabase.ref(rootNode.key).limitToLast(size).orderByChild(orderByChild.key)
            : firebaseDatabase.ref(rootNode.key).limitToLast(size);

        query.on('value', dataSnapshot => {

            console.debug('-----------snap-------');
            console.debug(dataSnapshot);
            console.debug('------------------');

            let items = [];

            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                const flatMapItem = flatMap(item);

                console.debug('------item------------');
                console.debug(item);
                console.debug('------------------');


                //TODO: flatMap only works with an array of arrays
                if (flatMapItem instanceof Array) {
                    flatMap(item).forEach(itemInput => {
                        items.push(itemInput);
                    });
                } else {
                    item['.key'] = childSnapshot.key;
                    items.push(flatMapItem);
                }
            });

            callback(items);
        });
        return query;
    };

    static login = (email, password) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    };

    static logout = () => {
        return firebaseAuth.signOut();
    };

    static onAuthChange = (callbackLogin, callbackLogout) => {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (!authUser) {
                callbackLogout(authUser);
            } else {
                callbackLogin(authUser);
            }
        });

    };

    static loginWithFacebook = () => {
        return firebaseAuth.signInWithPopup(facebookProvider);
    };

    static loginWithGoogle = () => {
        return firebaseAuth.signInWithPopup(googleProvider);
    };

    static writeDataUser = (id, name, email, node) => {
        return firebaseDatabase.ref(node.key + '/' + id).set({
            displayName: name,
            email: email
        });
    };

    static writeData = (id, obj, node) => {
        return firebaseDatabase.ref(node.key + '/' + id).set({...obj});
    };

    static createUser = (email, password) => {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    //TODO extract this two methods createUserAndAddToDataBase and createUserByGoogleAndAddToDataBase to only one.
    static createUserAndAddToDataBase = (email, password, name, addMessage, redirect) => {
        return FirebaseService.createUser(email, password)
            .then(user => {
                const displayName = !!user ? user.displayName : name;
                FirebaseService.writeDataUser(user.uid, displayName, user.email, nodes.users);
                addMessage(`The user ${user.email} has been successfully created.`);
                // redirect(routes.welcome)
            })
            .catch((error) => {
                console.log(error);
                addMessage(error.message);
                // redirect(routes.welcome);
            });
    };

    static createUserByGoogleAndAddToDataBase = (addMessage, redirect) => {
        return FirebaseService.loginWithGoogle()
            .then(response => {
                let user = response.user;
                FirebaseService.writeDataUser(user.uid, user.displayName, user.email, nodes.users);
                addMessage(`The user ${response.email} has been successfully created.`);
                // redirect(routes.welcome)
            })
            .catch((error) => {
                console.log(error);
                addMessage(error.message);
                // redirect(routes.welcome);
            });
    };

    static remove = (id, node, addMessage) => {
        return firebaseDatabase.ref(node.key + '/' + id)
            .remove((error) => {
                addMessage(!!error ? error.message : `The ${node.name} with id ${id} was removed successfully`)
            });
    };

    /*
    * Will return null until firebase get element: BE AWARE OF THAT
    * */
    static getUniqueDataBy = (node, id, callback) => {
        const ref = firebaseDatabase.ref(node.key + '/' + id);
        let newData = {};
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot) {
                callback(null);
                return;
            }

            const snap = dataSnapshot.val();
            const keys = Object.keys(dataSnapshot.val());
            keys.forEach((key) => {
                newData[key] = snap[key]
            });
        }).then(() => {
            callback(newData);
        });
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node.key).push();
        const id = firebaseDatabase.ref(node.key).push().key;
        ref.set(objToSubmit);
        return id;
    };
}
