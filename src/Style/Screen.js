import { StyleSheet } from 'react-native'
import { color } from './Color'

export default StyleSheet.create(
    {
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.secondary
        },
        plainContainer: {
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: color.secondary
        },
        emptyHolder: {
            backgroundColor: color.grey,
            paddingHorizontal: 16,
            paddingVertical: 32
        },
        emptyHeader: {
            marginBottom: 16,
            color: color.primary,
            fontSize: 18
        },
        redText: {
            color: color.primary
        },
        orangeText: {
            color: color.warning
        },
        blackText: {
            color: color.black,
            fontWeight: 'bold'
        },
        paddingHorizontal: {
            paddingHorizontal: 16
        },
        headerIcon: {
            color: color.secondary,
            padding: 16,
            fontSize: 28
        },
        headerIconLogout: {
            color: color.secondary,
            padding: 8,
            fontSize: 28
        },
        headerText: {
            color: color.secondary,
            fontWeight: 'bold',
            paddingRight: 16,
            fontSize: 18
        },
        fab: {
            backgroundColor: color.primary
        },
        headerItem: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        container: {
            flex: 1,
            backgroundColor: color.secondary
        },
        nameDisplay: {
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            paddingBottom: 40,
            paddingTop: 30,
            paddingHorizontal: 40
        },
        modalCloseIcon: {
            flex: 1,
            color: color.inactive,
            paddingLeft: 16
        },
        modalInfoIcon: {
            paddingHorizontal: 8,
            color: color.inactive
        },
        modalWarningIcon: {
            color: color.primary,
            paddingRight: 16
        },
        modalHeaderText: {
            fontSize: 16,
            color: color.menu,
            flex: 4
        },
        modalHeader: {
            flexDirection: 'row',
            padding: 16,
            backgroundColor: color.grey
        },
        debtLimitWarning: {
            flexDirection: 'row'
        },
        modalBody: {
            padding: 16
        },
        modalWarningBody: {
            margin: 16
        },
        debtLimitWarningText: {
            textAlign: 'justify'
        },
        modalButtonContainer: {
            marginVertical: 16,
            flexDirection: 'row'
        },
        modalBusinessFooter: {
            marginLeft: 40
        },
        boxView: {
            flexDirection: 'row',
            borderWidth: 0.5,
            borderColor: color.inactive,
            padding: 10
        },
        menuColor: {
            color: color.menu
        },
        boxlabel: {
            marginRight: 16
        },
        firstBox: {
            marginBottom: 6
        },
        secondBox: {
            marginBottom: 32
        },
        thumbStyle: {
            height: 30,
            width: 30,
            borderRadius: 15
        },
        trackStyle: {
            height: 8,
            borderRadius: 4
        },
        sliderStyle: {
            marginTop: 16
        },
        legendStyle: {
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        legendLabel: {
            flex: 1,
            alignSelf: 'flex-start'
        },
        detailsWrapper: {
            marginVertical: 25
        },
        topCompartment: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            justifyContent: 'space-between',
            paddingBottom: 30
        },
        textWrapper: {
            marginRight: 20,
            marginTop:  25,
            justifyContent: 'space-between'
        },
        purchaseWrapper: {
            alignItems: 'flex-end'
        },
        textTitle: {          
            color: 'grey',
            fontWeight: '400',
            fontSize: 14
        },
        textContent: {
            fontWeight: '400',
            fontSize: 14
        },
        redText: {
            color: 'red'
        },
        details: {
            marginTop: 20,
            marginLeft: 25,
            color: 'grey',
            marginBottom: 5
        },
        detailItemWrapper: {
            marginVertical: 10
        },
        secondCompartment: {
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            paddingBottom: 10
        },
        compartmentItemWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginRight: 25
        },
        compartmentItem: {
            marginLeft: 35,
            color: 'grey'
        },
        creditLimit: {
            paddingTop: 15
        },
        walletText: {
            color: 'blue',
            marginTop: 15
        },
        walletWrapper: {
            marginBottom: 5
        },
        bottomPadding: {
            paddingBottom: 30
        }
    }
)