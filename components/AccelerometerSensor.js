import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Block, theme, Text } from "galio-framework";
import ItemCard from './ItemCard';

export default function AccelerometerSensor() {
  const [data, setData] = useState({});
  let dataList = [];

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
      let lastData = dataList.slice(-1).pop();
      if (dataList.length === 0 || (round(currentData.x) !== lastData.x && round(currentData.y) !== lastData.y && round(currentData.z) !== lastData.z)) {
        dataList.push(currentData);
      }
      console.log(dataList);
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;

  return (
    <View>
      <ItemCard item={data}
        style={{ marginRight: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE}}
      />
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}