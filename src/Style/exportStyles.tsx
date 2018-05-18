import { color } from './Color';
import { StyleSheet } from 'react-native';

export default StyleSheet.create(
    {
        saveCancelButton: {
            borderWidth: 1,
            flex: 1,
            height: 65,
            borderRadius: 0,
            marginVertical: 0,
            marginTop: 8,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: color.grey,
            backgroundColor: color.secondary
        },

        saveCancelButtonText: {
            color: color.menu,
            fontWeight: 'bold'
        },

        aboveAccordionContainer: {
            flexDirection: 'row',
            flex: 0,
            borderTopWidth: 0.5,
            borderTopColor: color.listBorderColor
        },

        aboveAccordionContainerP: {
            flexDirection: 'row',
            flex: 0,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderTopColor: '#f0f0f0',
            borderBottomColor: '#c0c0c0'
        },

        aboveAccordionPictureView: {
            flexDirection: 'column',
            width: '50%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center'
            //  backgroundColor: '#fff',
        },

        aboveAccordionPictureText: {
            paddingTop: 10,
            fontSize: 18,
            fontWeight: '400',
            color: color.grey
        },

        aboveAccordionMoneyView: {
            width: '50%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center'
            // backgroundColor: '#FFF',
        },

        aboveAccordionRedNumber: {
            color: color.primary,
            fontSize: 25,
            fontWeight: 'bold'
        },

        aboveAccordionPictureViewP: {
            flexDirection: 'column',
            width: '50%',
            height: 200,
            alignItems: 'flex-start',
            padding: 16,
            justifyContent: 'center',
            backgroundColor: '#fff'
        },

        aboveAccordiondp: {
            height: 90,
            width: 90
        },

        aboveAccordiondpP: {
            height: 60,
            width: 60
        },

        aboveAccordionBoldFont: {
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'right'
        },

        aboveAccordionWhiteList: {
            height: 65,
            width: '100%',
            backgroundColor: '#FFF',
            paddingLeft: 0,
            marginLeft: 0
        },

        aboveAccordionBlackTextL: {
            fontSize: 16,
            color: '#c0c0c0',
            paddingLeft: 16
        },

        aboveAccordionBlackTextR: {
            fontSize: 16,
            color: '#000'
        },

        aboveAccordionRedTextR: {
            fontSize: 16,
            color: 'red'
        },

        aboveAccordionGreyText: {
            fontSize: 16,
            color: '#c0c0c0',
            paddingLeft: 16
        },

        aboveAccordionGreyFont: {
            fontSize: 16,
            color: '#c0c0c0'
        },

        aboveAccordionRedText: {
            fontSize: 16,
            color: 'red'
        },

        marginfulInput: {
            marginLeft: 4
        },

        marginlessInput: {
            marginLeft: 0
        },

        smallImageDisplayContainer: {
            marginTop: 30,
            marginLeft: 30
        },

        smallImageDisplayImageWrapper: {
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: color.grey
        },

        smallImageDisplayImage: {
            height: 90,
            width: 90,
            borderRadius: 45
        },

        smallImageDisplayName: {
            marginTop: 20,
            marginLeft: 20,
            fontSize: 14,
            fontWeight: '400'
        },

        nameDisplayWrapper: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        nameDisplayLetterDisplay: {
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: color.grey,
            justifyContent: 'center',
            alignItems: 'center'
        },

        nameDisplayImage: {
            height: 90,
            width: 90,
            borderRadius: 45
        },

        nameDisplayName: {
            fontSize: 14,
            fontWeight: '400',
            marginLeft: 20
        },

        newOrderContainer: {
            backgroundColor: '#FFF',
            width: '98%',
            alignSelf: 'center',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#f0f0f0',
            marginVertical: 16
        },

        newOrderHeader: {
            backgroundColor: '#FFF',
            height: 40,
            marginBottom: 3
        },

        newOrderIcon: {
            fontSize: 30,
            textAlign: 'right'
        },

        newOrderInnerContainer: {
            flexDirection: 'column',
            alignSelf: 'center',
            width: '98%'
        },

        newOrderFirstInput: {
            width: '96%',
            marginBottom: 3
        },

        newOrderSecondInput: {
            flexDirection: 'row',
            flex: 0,
            marginBottom: 16
        },

        newOrderHalf: {
            width: '48%'
        },

        newOrderClose: {
            width: 60
        },

        popoverContent: {
            width: 342,
            height: 95,
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 12,
            paddingRight: 12,
            margin: 0,
            backgroundColor: '#fff',
            borderWidth: 0.5,
            borderRadius: 2,
            borderColor: 'grey'
        },

        popoverArrow: {
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            margin: 0,
            padding: 0
        },

        popoverBackground: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },

        popoverTouchable: {
            flex: 0,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            marginTop: 15
        },

        popoverRedClick: {
            color: 'red',
            fontSize: 13,
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5
        },

        popoverIconTouch: {
            paddingTop: 4
        },

        popoverColumn: {
            flexDirection: 'column'
        },

        popoverRow: {
            flexDirection: 'row'
        },

        popoverMainFirst: {
            flexDirection: 'row',
            marginRight: 50,
            alignItems: 'center'
        },

        popoverMainSecond: {
            flexDirection: 'row',
            marginRight: 0,
            alignItems: 'center'
        },

        popoverViewX: {
            width: 12,
            height: 12,
            borderRadius: 12 / 2,
            backgroundColor: '#c0c0c0'
        },

        popoverTextX: {
            fontSize: 12,
            paddingLeft: 4
        },

        popoverNotMain: {
            flexDirection: 'row',
            marginTop: 30
        },

        popoverLeftSide: {
            flexDirection: 'row',
            marginRight: 100,
            alignItems: 'center'
        },

        popoverRightSide: {
            flex: 0,
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 0,
            marginBottom: 8
        },

        popoverInnerLeft: {
            width: 12,
            height: 12,
            borderRadius: 12 / 2,
            backgroundColor: 'red'
        },

        popoverRecall: {
            textAlign: 'right',
            fontSize: 12,
            paddingLeft: 16
        },

        popoverInnerLeftText: {
            fontSize: 12,
            paddingLeft: 4
        },

        subHeaderHeader: {
            height: 40,
            backgroundColor: '#fff'
        },

        subHeaderRow: {
            flexDirection: 'row',
            width: '40%'
        },

        subHeaderPad: {
            paddingLeft: 10,
            paddingTop: 5
        },

        subHeaderFont: {
            fontSize: 13,
            paddingBottom: 9
        },

        subHeaderIconColor: {
            color: '#F0F0F0'
        },

        pickerStyle: {
            width: 130,
            height: 35
        },

        totalOrderIcon: {
            color: color.totalSales,
            fontSize: 22
        },

        stylesDetailContainer: {
            flexDirection: 'row',
            flex: 0,
            borderTopWidth: 0.5,
            borderTopColor: '#f0f0f0'
        },

        stylesDetailContent: {
            height: 130,
            width: '100%',
            paddingLeft: 0,
            marginLeft: 0
        },

        stylesDetailPictureView: {
            flexDirection: 'column',
            width: '50%',
            height: 120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
        },

          stylesDetailPictureText: {
            paddingTop: 10,
            fontSize: 18,
            fontWeight: '400',
            color: 'grey'
        },

        stylesDetailGreyText: {
            color: '#c0c0c0',
            fontSize: 16,
            fontWeight: '400',
            paddingLeft: 16
        },

        stylesDetailMoneyView: {
            width: '50%',
            height: 120,
            alignItems: 'center',
            backgroundColor: '#FFF'
        },

        stylesDetailDp: {
            height: 45,
            width: 45
        },

        stylesDetailWhiteList: {
            flex: 1,
            height: 65,
            width: '100%',
            paddingLeft: 0,
            marginLeft: 0,
            backgroundColor: '#FFF'
        },

        stylesDetailBlackText: {
            fontSize: 16,
            color: '#000'
        },

        stylesDetailRedText: {
            fontSize: 16,
            color: 'red',
            paddingLeft: 16
        },

        totalDebtContainer: {
            flexDirection: 'row',
            flex: 0,
            borderTopWidth: 0.5,
            borderTopColor: color.listBorderColor
        },

        totalDebtTotalView: {
            flexDirection: 'row',
            width: '30%',
            height: 55,
            alignItems: 'center',
            justifyContent: 'center'
            // backgroundColor: '#fff',
        },

        totalDebtTotalText: {
            fontSize: 14,
            fontWeight: '400'
            // color: '#000',
        },

        totalDebtRedNumber1: {
            color: '#FFF',
            fontSize: 20,
            fontWeight: 'bold'
        },

        totalDebtRedNumberView1: {
            width: '70%',
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF8C00'
        },

        totalDebtRedNumberView2: {
            width: '70%',
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(218,11,11,59)'
        },

        totalOrderColumn: {
            borderBottomWidth: 1,
            borderBottomColor: color.primary
        },

        totalOrderContainer: {
            flexDirection: 'row',
            flex: 1,
            borderTopWidth: 0.5,
            borderTopColor: color.listBorderColor
        },

        totalOrderTotalView: {
            width: '30%',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center'
            // backgroundColor: '#fff',
        },

        totalOrderTotalText: {
            fontSize: 14,
            fontWeight: '400'
            // color: '#000',
        },

        totalOrderRedNumber: {
            color: color.primary,
            fontSize: 18,
            fontWeight: 'bold'
        },

        totalOrderRedNumberView: {
            width: '70%',
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.totalSales
        },

        totalOrderPeachView: {
            width: '70%',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.totalProfit
        },

        customerListContainer: {
            // backgroundColor: '#FFF',
            flex: 1,
            width: '100%'
        },

        customerListHeader: {
            backgroundColor: '#fff',
            width: '100%',
            height: 40
        },

        customerListDirect: {
            flexDirection: 'row'
        },

        customerListDropText: {
            paddingBottom: 10,
            fontSize: 14
        },

        orderListContainer: {
            // backgroundColor: '#FFF',
            flex: 1
        },

        faintPicker: {
            color: color.inactive,
            width: 100,
            height: 35
        },

        modalButton: {
            marginTop: 32,
            marginBottom: 16,
            marginHorizontal: 16,
            alignSelf: 'flex-end'
        },

        flexfull: {
            flex: 1
        },

        marginRight: {
            marginRight: 8
        },

        modalWarningButton: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 32,
            marginBottom: 16,
            marginHorizontal: 8,
            paddingHorizontal: 0
        },

        redButtonText: {
            color: color.secondary
        },

        signupButton: {
            width: '49%',
            marginHorizontal: 1,
            justifyContent: 'center',
            height: 55
        }
    }
);