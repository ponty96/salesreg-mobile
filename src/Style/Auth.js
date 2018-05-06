import { StyleSheet } from "react-native";
import { color } from './Color';

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
            flex: 1,
            backgroundColor: color.secondary
        },
        signUpText: {
            color: color.primary,
            marginVertical: 30,
            fontSize: 14,
            alignSelf: 'center',
            fontWeight: '400'
        },
        signUpFormWrapper: {
            marginLeft: 20,
            marginRight: 35
        },
        boardingScreenFeatureText: {
            marginVertical: 40,
            marginHorizontal: 30
        },
        blueCheck: {
            color: color.blueCheck
        },
        appFunctionWrapper: {
            flexDirection: 'row',
            marginVertical: 10
        },
        appDetailsText: {
            marginLeft: 20,
            color: color.appDetailsText,
            fontSize: 14
        },
        buttomButtonsWrapper: {
            flexDirection: 'row',
            alignSelf: 'center',
            width: '88%',
            position: 'absolute',
            bottom: 60
        }
    }
);