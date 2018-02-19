import React from 'react';
import {Alert, Animated, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {FirebaseService} from '../../services/FirebaseService';
import {nodes} from '../../utils/custom/nodes';
import {socialLinks} from "../../utils/staticLinks";

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#000000',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        shadowRadius: 1,
        shadowOpacity: 0.24,
        shadowOffset: {
            width: 0,
            height: 1
        },
        minHeight: 175,
    },
    statusBarBackground: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: "white",
    },
});


const imageList = [
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/03-best-17-gelada-baboons-monkeys-guassa-ethiopia-evening-running-cliffs.adapt.1900.1.jpg?alt=media&token=addd8c01-5480-4d3d-b7a9-af8211e19c1c',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/11-best-01-making-massacre.adapt.1900.1.jpg?alt=media&token=15936483-abcc-4dd6-ac28-60e46ff3eb26',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/800px_COLOURBOX3281500.jpg?alt=media&token=2b542779-6baa-477c-9a9a-f3ff3c1c2a1d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/anupam-nath-india-elephant-top-100-photos-2017.jpg?alt=media&token=31446c0a-6917-4d59-a896-ff3095cdc040',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/phil-moore-south-sudan-top-100-photos-2017-1.jpg?alt=media&token=c3ad2884-3b39-4330-9ae6-af11620e0747',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/tess.jpg?alt=media&token=7da5dc48-28f5-4285-b1d0-c7f38c00ef0d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulet-ifansasti-indonesia-independence-top-100-photos-2017.jpg?alt=media&token=040239df-7979-407e-8d91-cb86c6cd40cf',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulises-ruiz-basurto-mexico-volcano-top-100-photos-2017.jpg?alt=media&token=29efd569-ee6e-4902-abbe-718923eaf3bf',
];


const getImage = () => {
    return imageList[Math.floor(Math.random() * (imageList.length - 1))];
};

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    };
    animate = () => {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 5000,              // Make it take a while
            }
        ).start();
    };

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    componentWillUpdate(thisProps, nexProps) {
        if (thisProps === nexProps) {
            return;
        }

        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start();
    }

    render() {
        let {fadeAnim} = this.state;

        return (
            <View                 // Special animatable View
                style={{
                    ...this.props.style,
                }}
            >
                <Animated.Image source={this.props.src}
                                style={{
                                    resizeMode: 'cover',
                                    opacity: fadeAnim,         // Bind opacity to animated value
                                    flex: 1,
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    borderRadius: 20,
                                }}
                                onLoad={this.animate}
                />
            </View>
        );
    }
}


const BorderedCard = (props) => {

    return <FadeInView
        src={{uri: !!(props.item['imageUrl']) ? props.item['imageUrl'] : getImage()}}
        style={{
            flex: 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            borderRadius: 20,
        }}
    />
};

export default class Root extends React.Component {

    state = {
        dataList: null,
        node: nodes.devices,
    };
    changeState = (item, key) => {

        if (key.type !== 'checkbox') {
            return;
        }

        const copyItem = Object.assign({}, item);
        delete copyItem['.key'];
        copyItem[key.key] = !copyItem[key.key];
        FirebaseService.writeData(item['.key'], copyItem, this.state.node);
    };

    componentDidMount() {
        FirebaseService.getAllDataBy(this.state.node, dataIn => this.setState({dataList: dataIn}), 20, c => nodes.users.flat(c), this.state.node.orderByChild);
    };

    render() {

        const getItemOrTrueIfTrue = (item) => {
            if (item === true) {
                return 'on';
            } else if (item === false) {
                return 'off';
            } else {
                return item
            }
        };

        const showAlert = () => {
            Alert.alert('You tapped the button!');
        };

        const printItem = (key, item) => {
            if (key.key === 'name' || key.name === 'Name') {
                return <Text style={{color: 'white', fontWeight: '400', fontSize: 25, marginTop: 5, marginBottom: 15}}> {getItemOrTrueIfTrue(item[key.key])} </Text>
            } else {
                return <Text style={{color: 'white', fontSize: 15, marginTop: 5, marginBottom: 15}}> {getItemOrTrueIfTrue(item[key.key])} </Text>;
            }
        };

        const updateNode = (node) => {
            this.setState({node});
            FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => nodes.users.flat(c), node.orderByChild);
        };

        const isNodeActive = (node) => {
            return node === this.state.node ? 'bold' : '100';
        };

        return (
            <View style={{backgroundColor: 'transparent', flex: 1,}}>

                <View style={[styles.statusBarBackground]}/>

                <ScrollView>
                    <View style={{backgroundColor: 'transparent', alignItems: 'flex-start', justifyContent: 'center', height: 60, paddingTop: 20, paddingBottom: 20, margin: 10,}}>
                        <Text style={{fontWeight: '900', fontSize: 30, backgroundColor: 'transparent'}}>Home Controller</Text>
                    </View>

                    <View style={{flexDirection: 'row', margin: 10}}>
                        {
                            Object.values(nodes).map((node, index) =>
                                <TouchableOpacity key={index} onPress={() => updateNode(node)} style={{marginRight: 20}}>
                                    <Text style={{backgroundColor: 'transparent', fontWeight: isNodeActive(node)}}>{node.name}</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <View style={{flex: 1}}>
                        {
                            this.state.dataList
                                ? this.state.dataList.map((item, index) =>
                                    <View key={index} style={styles.container}>

                                        <BorderedCard item={item}/>

                                        {
                                            this.state.node.keys.filter(key => !(key.type === 'checkbox')).map((key, index2) =>
                                                <React.Fragment key={index2}>
                                                    <Text style={{fontSize: 10, color: '#f4f4f4'}}> {key.name} </Text>
                                                    {
                                                        printItem(key, item)
                                                    }
                                                </React.Fragment>
                                            )
                                        }

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            {
                                                this.state.node.keys.filter(key => key.type === 'checkbox').map((key, index2) =>
                                                    <View key={index2} style={{marginRight: 10}}>
                                                        <Text style={{fontSize: 10, color: '#f4f4f4'}}> {key.name} </Text>
                                                        <Switch style={{margin: 7}} onValueChange={() => this.changeState(item, key)} value={item[key.key]} tintColor="white"/>
                                                    </View>
                                                )
                                            }
                                        </View>

                                    </View>)
                                : <Text style={{color: 'white', fontSize: 20, marginTop: 20, marginBottom: 20}}> nothing here </Text>
                        }
                    </View>
                </ScrollView>
                <View style={{alignSelf: 'center', alignItems: 'center', height: 40}}>
                    <Text style={{fontSize: 10, marginTop: 10, marginBottom: 20, color: '#b9b9b9'}}>{socialLinks.github}</Text>
                </View>
            </View>
        );
    }
}