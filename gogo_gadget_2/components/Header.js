import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const Header = () => {
    <View style={styles.topbarwrapper}>
    <View style={styles.body}>
      <View style={styles.addressinfo}>
        <Text style={fonts.header}>Last Accessed Location</Text>
        <Text style={fonts.address}>49 The Lakes Blvd, South Morang Vic 3752</Text> 
      </View>
      <View style={styles.time}></View>
    </View>
  </View>
}
const styles = StyleSheet.create({
    topbarwrapper: {
        flex: 1,
        width: Dimensions.get('window').width / 2.2 * 2,
        position: 'absolute',
        marginTop: 50,
        marginBottom: 20,
        top: 0,
      },
      body: {
        flex: 1,
        backgroundColor: 'rgba(122, 122, 122, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        padding: 10,
      },
})
export default Header;
