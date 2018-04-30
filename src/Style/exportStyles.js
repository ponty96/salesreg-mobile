import {color} from "./Color";

export const saveCancelButton = {
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
};

export const saveCancelButtonText = {
    color: color.menu,
    fontWeight: 'bold'
};

export const marginlessInput = {
    marginLeft: 0
};

export const marginfulInput = {
    marginLeft: 4
}

export const modalButton = {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: 'flex-end',
}

export const modalWarningButton = {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 8,
    paddingHorizontal: 0
}

export const smallImageDisplay = {
    container: {
        marginTop: 30,
        marginLeft: 30
    },
    imageWrapper: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: '#f2f3f4'
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
    },
    name: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 14,
        fontWeight: '400',
    }
}

export const aboveAccordionStyles = {
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: "#f0f0f0"
    },
    pictureView: {
      flexDirection: "column",
      width: '50%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    pictureText: {
      paddingTop: 10,
      fontSize: 18,
      fontWeight: "400",
      color: "grey",
    },
    redNumber: {
      color: 'rgba(218,11,11,59)',
      fontSize: 25,
      fontWeight: 'bold',
    },
    moneyView: {
      width: '50%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
    },
    dp: {
        height: 90,
        width: 90,
    }
}

export const nameDisplayStyles = {
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    letterDisplay: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: '#f2f3f4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 20
    }
}