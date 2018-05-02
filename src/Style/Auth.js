import { StyleSheet } from "react-native";
import { color } from './Color';
import fonts from './fonts';

export default StyleSheet.create(
    {
        smallHeader: {
            height: '18%',
            backgroundColor: color.primary,
            justifyContent: 'center',
            alignItems:'center'
        },
        bigHeader: {
            height: '40%'
        },
        container: {
            flex: 1
        },
        signUpText: {
            color: color.primary,
            marginTop: 30,
            fontSize: fonts.smaller,
            alignSelf: 'center',
            fontWeight: '400'
        }
    }
);