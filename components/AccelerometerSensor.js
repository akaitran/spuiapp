import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Block, theme, Text } from "galio-framework";

import { argonTheme } from "../constants";
const { height, width } = Dimensions.get("window");

export default function AccelerometerSensor() {
  const [dataList, setData] = useState([]);
  let tempList = [];

  Accelerometer.setUpdateInterval(1000);

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      let currentData = accelerometerData;
      let lastData = tempList[0];
      if (tempList.length === 0 || (round(currentData.x) !== lastData.x && round(currentData.y) !== lastData.y && round(currentData.z) !== lastData.z)) {
        tempList.unshift(currentData);
      }
      console.log(tempList);

      setData(tempList);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const cardContainer = [styles.card, styles.shadow];

  return (
    <Block card flex style={cardContainer}>
      <Block flex>
        <Block row>
          <Block flex middle style={[styles.size]}>
            <Text>X</Text>
          </Block>
          <Block flex middle style={[styles.size]}>
            <Text>Y</Text>
          </Block>  
          <Block flex middle style={[styles.size]}>
            <Text>Z</Text>
          </Block>
          <Block flex middle style={[styles.size]}>
            <Text>Time</Text>
          </Block>
        </Block>
        {dataList.map(data => (
        <Block row>
          <Block flex middle style={[styles.size]}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
              {round(data.x)}
            </Text>
          </Block>
          <Block flex middle style={[styles.size]}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
              {round(data.y)}
            </Text>
          </Block>  
          <Block flex middle style={[styles.size]}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
              {round(data.z)}
            </Text>
          </Block>
          <Block flex middle style={[styles.size]}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
              {data.time}
            </Text>
          </Block>
        </Block>
        ))}
      </Block>
    </Block>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: argonTheme.COLORS.PRICE_COLOR
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 50,
    marginBottom: 2,
  },
  cardTitle: {
    // flex: 1,
    // flexWrap: "wrap",
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden"
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto"
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  size: {
    height: theme.SIZES.BASE * 2,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
    overflow: "hidden"
  },
});