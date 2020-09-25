import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Animated,
  Platform
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import { Icon } from "../components";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import AccelerometerSensor from "../components/AccelerometerSensor";
//import SMSHistory from "../components/SMSHistory";
import { iPhoneX, HeaderHeight } from "../constants/utils";

import * as Location from 'expo-location';

const { height, width } = Dimensions.get("window");

class LogHistory extends React.Component {

  state = {
    selectedSize: null
  };

  scrollX = new Animated.Value(0);

  componentDidMount =  async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
      } else {
        console.log('Call Log permission denied');
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  switchScreen = (param) => {
    switch (param){
      case "AccelerometerSensor": return <AccelerometerSensor />
      case "GPSDetection": return <GPSDetection />
      case "SMSHistory": return <SMSHistory />
      case "CallHistory": return <CallHistory />
      case "AppUsage": return <AppUsage />
      case "WebHistory": return <WebHistory />
      case "BatteryStatus": return <BatteryStatus />
      case "KeyboardTracking": return <KeyboardTracking />
    }
  }

  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const log = params.log;
    const log = route.params?.log;

    return (
      <Block flex style={styles.log}>
        <Block flex style={styles.options}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE
              }}
            >
              <Text size={28} style={{ paddingBottom: 24, fontFamily: 'open-sans-regular' }} color={argonTheme.COLORS.TEXT}>
                {log.title}
              </Text>
            </Block>
            <Block style={{ padding: theme.SIZES.BASE }}>
              {this.switchScreen(log.function)}
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  log: {
    marginTop: Platform.OS === "android" ? theme.SIZES.BASE*3 : 0
  },
  options: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  galleryImage: {
    width: width,
    height: "auto"
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: "white"
  },
  dotsContainer: {
    position: "absolute",
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 10
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8
  },
  chat: {
    width: 56,
    height: 56,
    padding: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  chatContainer: {
    top: -28,
    right: theme.SIZES.BASE,
    zIndex: 2,
    position: "absolute"
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
    overflow: "hidden"
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundColor: argonTheme.COLORS.PRICE_COLOR
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: argonTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: argonTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: argonTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: argonTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0
  }
});

export default LogHistory;
