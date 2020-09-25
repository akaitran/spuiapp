import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, PermissionsAndroid} from 'react-native';
import { Block, theme, Text } from "galio-framework";
import ItemCard from './AccelerometerCard';
import CallLogs from 'react-native-call-log';

export default function CallLog() {
  return (
    <View>
      <ItemCard item={data}
        style={{ marginRight: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE}}
      />
    </View>
  );
}