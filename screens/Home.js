import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card } from "../components";
import logs from "../constants/logs";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.logs}
      >
        <Block flex>
          {logs.map((log, index) => (
          (index % 2 === 0 ) ?
            <Block flex row key={index}>
              <Card
                item={log}
                style={{ marginRight: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE}}
              />
              <Card 
                item={logs[index +1]}
                style={{ paddingTop: theme.SIZES.BASE}}
              />
            </Block>
          : null
          ))}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  logs: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2
  }
});

export default Home;
