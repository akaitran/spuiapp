import React from "react";
import { withNavigation } from '@react-navigation/compat';
import { Entypo } from '@expo/vector-icons';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";

class Card extends React.Component {
  render() {
    const {
      navigation,
      item,
      style,
    } = this.props;

    const cardContainer = [styles.card, styles.shadow, style];
    const colorStyle = item.color && argonTheme.COLORS[item.color.toUpperCase()];

    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(item.screen, { log: item })}
        >
          <Entypo style={{textAlign: 'center'}} name={item.icon} size={64} color={colorStyle} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(item.screen, { log: item })}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'open-sans-regular' }}
                size={14}
                style={styles.cardTitle}
                color={argonTheme.COLORS.TEXT}
              >
                {item.title}
              </Text>
              {item.body ? (
                <Block flex left>
                  <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={argonTheme.COLORS.TEXT}>
                    {item.body}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            <Block right={true}>
              <Text
                style={{ fontFamily: 'open-sans-bold' }}
                size={12}
                color={argonTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
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
  }
});

export default withNavigation(Card);
