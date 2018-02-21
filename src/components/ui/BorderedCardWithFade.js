import React from "react";
import {Animated, StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    fullWidthCard: {
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        borderRadius: 20,
    },
});

export default class BorderedCardWithFade extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
    };

    animate = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2500,
            }
        ).start();
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2500,
            }
        ).start();
    }

    componentWillUpdate(thisProps, nexProps) {
        if (thisProps === nexProps) {
            return;
        }
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start();
    }

    render() {
        let {fadeAnim} = this.state;

        return (
            <View style={{...this.props.style}}>
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
