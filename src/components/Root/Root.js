import React from 'react';
import {Animated, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {FirebaseService} from '../../services/FirebaseService';
import {nodes} from '../../utils/custom/nodes';
import {socialLinks} from "../../utils/staticLinks";

const styles = StyleSheet.create({
    container: {backgroundColor: 'transparent', flex: 1,},
    textMessage: {color: 'black', textAlign: 'center', fontSize: 20, marginTop: 20, marginBottom: 20},
    header: {alignItems: 'flex-start', justifyContent: 'center', height: 60, paddingTop: 20, paddingBottom: 20},
    footer: {alignSelf: 'center', alignItems: 'center', height: 40},
    headerText: {fontWeight: '900', fontSize: 30, backgroundColor: 'transparent'},
    listItem: {
        marginTop: 5,
        marginBottom: 5,
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
    fullWidthCard: {
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        borderRadius: 20,
    },
    switchName: {fontSize: 10, color: '#f4f4f4'},
    margin10: {margin: 10},
    listItemSwitchers: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',},
    socialLink: {fontSize: 10, marginTop: 10, marginBottom: 20, color: '#b9b9b9'},
    itemValueTextHeader: {color: 'white', fontWeight: '400', fontSize: 25, marginTop: 5, marginBottom: 15},
    itemValueText: {color: 'white', fontSize: 15, marginTop: 5, marginBottom: 15},
    listItemText: {fontSize: 10, color: '#f4f4f4'},
});

export default class Root extends React.Component {

    state = {
        dataList: null,
        node: nodes.devices,
    };
    copyItem = (item, key) => {
        const copyItem = Object.assign({}, item);
        delete copyItem['.key'];
        copyItem[key.key] = !copyItem[key.key];
        return copyItem;
    };
    changeAndPushKeyStateOfNode = (item, key) => {
        if (key.type !== 'checkbox') {
            return;
        }
        const copyItem = this.copyItem(item, key);
        FirebaseService.writeData(item['.key'], copyItem, this.state.node);
    };
    updateNode = (node) => {
        if (node !== this.state.node) {
            this.setState({dataList: null});
            this.setState({node});
        }

        FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), node.orderByChild);
    };
    isNodeActive = (node) => {
        return node === this.state.node ? 'bold' : '100';
    };

    componentDidMount() {
        const {node} = this.state;
        FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), node.orderByChild);
    };

    render() {
        const {dataList, node} = this.state;

        const dataListProps = {dataList, node, changeAndPushKeyStateOfNode: this.changeAndPushKeyStateOfNode};

        return (
            <View style={styles.container}>
                <IPhoneStatusBarPlaceHolder/>
                <ScrollView style={styles.margin10}>
                    <Header/>
                    <View style={{flexDirection: 'row'}}>
                        {
                            Object.values(nodes).map((node, index) =>
                                <TouchableOpacity key={index} onPress={() => this.updateNode(node)} style={{marginRight: 20}}>
                                    <Text style={{backgroundColor: 'transparent', fontWeight: this.isNodeActive(node)}}>{node.name}</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View style={{flex: 1}}>
                        <DataList {...dataListProps}/>
                    </View>
                </ScrollView>
                <Footer/>
            </View>
        );
    }
}

const DataList = ({dataList, node, changeAndPushKeyStateOfNode}) => {
    if (dataList == null) {
        return <Text style={styles.textMessage}> Loading... </Text>
    }

    if (dataList.length === 0) {
        return <Text style={styles.textMessage}> nothing here </Text>
    }

    return dataList.map((item, index) =>
        <ListItem key={index} node={node} item={item} changeNode={changeAndPushKeyStateOfNode}/>
    );
};

const Header = () => <View style={styles.header}>
    <Text style={styles.headerText}>Home Controller</Text>
</View>;

const Footer = () => <View style={styles.footer}>
    <Text style={styles.socialLink}>{socialLinks.github}</Text>
</View>;

const ListItem = ({item, node, changeNode}) => {

    const printItem = (key, item) => {
        if (key.key === 'name' || key.name === 'Name') {
            return <Text style={styles.itemValueTextHeader}> {getItemOrTrueIfTrue(item[key.key])} </Text>
        } else {
            return <Text style={styles.itemValueText}> {getItemOrTrueIfTrue(item[key.key])} </Text>;
        }
    };

    const getItemOrTrueIfTrue = (item) => {
        if (item === true) {
            return 'on';
        } else if (item === false) {
            return 'off';
        } else {
            return item
        }
    };

    const {keys} = node;

    return (
        item &&
        <View style={styles.listItem}>

            <BorderedCard item={item}/>

            {
                keys.filter(key => !(key.type === 'checkbox')).map((key, index2) =>
                    <React.Fragment key={index2}>
                        <Text style={styles.listItemText}> {key.name} </Text>
                        {printItem(key, item)}
                    </React.Fragment>
                )
            }

            <View style={styles.listItemSwitchers}>
                {
                    keys.filter(key => key.type === 'checkbox').map((key, index2) =>
                        <ItemProperty key={index2} keyIn={key} changeNode={changeNode} item={item}/>
                    )
                }
            </View>
        </View>
    );
};


const ItemProperty = ({index, keyIn: key, changeNode, item}) => {
    return <View style={styles.margin10}>
        <Text style={styles.switchName}> {key.name} </Text>
        <Switch style={styles.margin10} onValueChange={() => changeNode(item, key)} value={item[key.key]} tintColor="white"/>
    </View>
};


const images = [
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/03-best-17-gelada-baboons-monkeys-guassa-ethiopia-evening-running-cliffs.adapt.1900.1.jpg?alt=media&token=addd8c01-5480-4d3d-b7a9-af8211e19c1c',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/11-best-01-making-massacre.adapt.1900.1.jpg?alt=media&token=15936483-abcc-4dd6-ac28-60e46ff3eb26',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/800px_COLOURBOX3281500.jpg?alt=media&token=2b542779-6baa-477c-9a9a-f3ff3c1c2a1d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/anupam-nath-india-elephant-top-100-photos-2017.jpg?alt=media&token=31446c0a-6917-4d59-a896-ff3095cdc040',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/phil-moore-south-sudan-top-100-photos-2017-1.jpg?alt=media&token=c3ad2884-3b39-4330-9ae6-af11620e0747',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/tess.jpg?alt=media&token=7da5dc48-28f5-4285-b1d0-c7f38c00ef0d',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulet-ifansasti-indonesia-independence-top-100-photos-2017.jpg?alt=media&token=040239df-7979-407e-8d91-cb86c6cd40cf',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/ulises-ruiz-basurto-mexico-volcano-top-100-photos-2017.jpg?alt=media&token=29efd569-ee6e-4902-abbe-718923eaf3bf',
    'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/01-diy-christmas-lights-decoration-ideas-homebnc.jpg?alt=media&token=c3c55df3-a3c9-43c5-acec-af54dc01177e'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_06.jpg?alt=media&token=d4ded22a-e327-40cf-a0f6-245a3735c28f'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_10.jpg?alt=media&token=c43b54b6-e4e3-46b3-b129-ce1765d0b61f'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/15_macro_ideas_141.jpg?alt=media&token=97822a68-5d16-43bb-a567-6d6a6195c194'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3478.jpg?alt=media&token=798aa220-4b03-450b-a7bb-2ca77e028009'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3599.jpg?alt=media&token=f02253a8-b212-41f6-bf70-045b197314c7'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3812.jpg?alt=media&token=27e03304-a770-4785-a786-db8c803aad2b'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/171016-milk-axelvervoordt-3991.jpg?alt=media&token=1e7e56ac-22f8-4ae8-b3f4-77a0dc91b82a'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/27971804_10155274361581220_5883865297652032502_n.jpg?alt=media&token=8ba67f13-4a78-4d49-af8b-9ca37e65af93'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/800px_COLOURBOX3281500.jpg?alt=media&token=2b542779-6baa-477c-9a9a-f3ff3c1c2a1d'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/adrian-kraus-national-anthem-top-100-photos-2017.jpg?alt=media&token=ae305f3b-3af3-4663-8786-91b72e4b2f29'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/closeup-yarn-trash.jpeg?alt=media&token=1d7b4213-10af-44dc-bf07-d48f9e6ce5ca'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/decorative_accs_hero_180917.jpg?alt=media&token=65678ac3-01d2-4cd4-a11f-d2f22c33a371'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/dream-wedding-photography-creative-wedding-decoration-kisiye-ozel-siradisi-dugun-fotograflari.jpg?alt=media&token=3ca11bc3-aae3-4525-bd0f-37966ec0cb68'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/Interior_Photography_GK113.jpg?alt=media&token=aaac9606-5bdf-4e2d-9345-b08a558cf0fb'
    , 'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-ex.appspot.com/o/reflective-macro-6603.jpg?alt=media&token=cf4c124a-5994-4ff8-8313-fb6d5ab41736'
];


const getRandomImage = () => {
    return images[Math.floor(Math.random() * (images.length - 1))];
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
                duration: 2500,              // Make it take a while
            }
        ).start();
    };

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 2500,              // Make it take a while
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
                duration: 2500,              // Make it take a while
            }
        ).start();
    }

    render() {
        let {fadeAnim} = this.state;

        return (
            <View
                style={{...this.props.style}}
            >
                {/*TODO VERIFY*/}
                <Animated.Image source={this.props.src}
                                style={[
                                    styles.fullWidthCard,
                                    {
                                        resizeMode: 'cover',
                                        opacity: fadeAnim,
                                    }]}
                                onLoad={this.animate}
                />
            </View>
        );
    }
}

const BorderedCard = ({item}) => {
    return <FadeInView
        src={{uri: !!(item['imageUrl']) ? item['imageUrl'] : getRandomImage()}}
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

const IPhoneStatusBarPlaceHolder = () => <View style={[styles.statusBarBackground]}/>;
