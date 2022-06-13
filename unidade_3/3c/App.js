import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class BoldAndBeautiful extends Component {
  render() {
    return (
      <View>
        <Text style={{textAlign: 'center',
            justifyContent: 'center',
            marginTop: '100%',
            }}>
          Hello World!
        </Text>
      </View>
    );
  }
}