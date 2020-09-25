import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Block, theme, Text } from "galio-framework";
import SmsAndroid from 'react-native-get-sms-android';
import moment from 'moment';

import { argonTheme } from "../constants";
const { height, width } = Dimensions.get("window");

class SMSList extends React.Component {
  state = {
    smsList: []
  }

  componentDidMount() {
    let filter = {
      box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      /**
       *  the next 3 filters can work together, they are AND-ed
       *  
       *  minDate, maxDate filters work like this:
       *    - If and only if you set a maxDate, it's like executing this SQL query:
       *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
       *    - Same for minDate but with "date >= minDate"
       */
      //minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
      //maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
      //bodyRegex: '(.*)How are you(.*)', // content regex to match

      /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
      //read: 0, // 0 for unread SMS, 1 for SMS already read
      //_id: 1234, // specify the msg id
      //thread_id: 12, // specify the conversation thread_id
      //address: '+1888------', // sender's phone number
      //body: 'How are you', // content to match
      /** the next 2 filters can be used for pagination **/
      //indexFrom: 0, // start from index 0
      maxCount: 100, // count of SMS to return each time
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, result) => {
        this.setState({smsList: JSON.parse(result)});
      },
    );
  }

  render() {
    const cardContainer = [styles.card, styles.shadow];

    return (
      <View>
        {this.state.smsList.map(sms => (
        <Block card flex style={cardContainer} key={sms._id}>
          <Block flex>
            <Block row>
              <Block flex middle style={[styles.size]}>
                <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.ACTIVE}>
                  {sms.type === 1 ? 'From' : 'To'}: {sms.address}
                </Text>
              </Block>
              <Block flex middle style={[styles.size]}>
                <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.MUTED}>
                  {moment(sms.date).format('DD/MM/YYYY')}
                </Text>
                <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.MUTED}>
                  {moment(sms.date).format('h:mm:ss a')}
                </Text>
              </Block>
            </Block>
            <Block row>
              <Block flex middle style={[styles.cardDescription]}>
                <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={argonTheme.COLORS.MUTED}>
                  {sms.body}
                </Text>
              </Block>  
            </Block>
          </Block>
        </Block>
        ))}
      </View>

    );
  }
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
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
    overflow: "hidden"
  },
});

export default SMSList;


