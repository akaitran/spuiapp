import React from "react";
import { withNavigation } from '@react-navigation/compat';
import { Entypo } from '@expo/vector-icons';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";

const { height, width } = Dimensions.get("window");

class ItemCard extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const colorStyle = item.color && argonTheme.COLORS[item.color.toUpperCase()];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
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
          <Block row>
            <Block flex middle style={[styles.size]}>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
                {round(item.x)}
              </Text>
            </Block>
            <Block flex middle style={[styles.size]}>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
                {round(item.y)}
              </Text>
            </Block>  
            <Block flex middle style={[styles.size]}>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
                {round(item.z)}
              </Text>
            </Block>
            <Block flex middle style={[styles.size]}>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
                {item.time}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool
};

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

export default withNavigation(ItemCard);
