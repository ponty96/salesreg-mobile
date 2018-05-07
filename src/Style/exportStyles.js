import { color } from "./Color";

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
    backgroundColor: color.white
};

export const saveCancelButtonText = {
    color: color.menu,
    fontWeight: 'bold'
};

export const marginlessInput = {
    marginLeft: 0
};

export const flexfull = {
    flex: 1
};

export const marginRight = {
    marginRight: 8
};

export const marginfulInput = {
    marginLeft: 4
};

export const modalButton = {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: 'flex-end',
};

export const modalWarningButton = {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 8,
    paddingHorizontal: 0
};

export const smallImageDisplay = {
    container: {
        marginTop: 30,
        marginLeft: 30
    },
    imageWrapper: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: color.grey
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
export const stylesDetail = {
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: "#f0f0f0"
    },
    content: {
        height: 130,
        width: "100%",
        paddingLeft: 0,
        marginLeft: 0,
    },
    pictureView: {
      flexDirection: "column",
      width: '50%',
      height: 120,
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
    greyText: {
      color: '#c0c0c0',
      fontSize: 16,
      fontWeight: '400',
      paddingLeft: 16
    },
    moneyView: {
      width: '50%',
      height: 120,
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    dp: {
        height: 45,
        width: 45,
    },
    whiteList: {
        flex: 1,
        height: 65, 
        width: "100%", 
        paddingLeft: 0,
        marginLeft: 0,
        backgroundColor: "#FFF"
    },
    blackText: {
        fontSize: 16,
        color: "#000"
    },
    redText: {
        fontSize: 16,
        color: "red",
        paddingLeft: 16
    }
}

export const newOrderCard = {
    container: {
        backgroundColor: "#FFF", 
        width: "98%", 
        alignSelf: "center", 
        borderRadius:2, 
        borderWidth: 1, 
        borderColor:"#f0f0f0", 
        marginVertical: 16
    },
    header: {
        backgroundColor: "#FFF", 
        height: 40, 
        marginBottom: 3
    },
    icon: {
        fontSize: 30, 
        textAlign: "right"
    },
    innerContainer: {
        flexDirection:"column", 
        alignSelf: "center" , 
        width: "98%"
    },
    firstInput: {
        width: "96%", 
        marginBottom: 3
    },
    secondInput: {
        flexDirection: "row", 
        flex: 0, 
        marginBottom: 16
    },
    half: {
        width: "48%"
    },
    close: {
        width: 60
    }
}

export const aboveAccordionStyles = {
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: color.listBorderColor
    },
    containerP: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: "#f0f0f0",
        borderBottomColor: "#c0c0c0"
    },
    pictureView: {
      flexDirection: "column",
      width: '50%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#fff',
    },
    pictureViewP: {
        flexDirection: "column",
        width: '50%',
        height: 200,
        alignItems: 'flex-start',
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
    pictureText: {
      paddingTop: 10,
      fontSize: 18,
      fontWeight: "400",
      color: color.grey,
    },
    redNumber: {
      color: color.primary,
      fontSize: 25,
      fontWeight: 'bold',
    },
    moneyView: {
      width: '50%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#FFF',
    },
    dp: {
        height: 90,
        width: 90,
    },
    dpP: {
        height: 60,
        width: 60,
    },
    boldFont: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "right"
    },
    whiteList: {
        height: 65, 
        width: "100%", 
        backgroundColor: "#FFF",
        paddingLeft: 0,
        marginLeft: 0,
    },
    blackTextL: {
        fontSize: 16,
        color: "#c0c0c0",
        paddingLeft: 16
    },
    blackTextR: {
        fontSize: 16,
        color: "#000"
    },
    redTextR: {
        fontSize: 16,
        color: "red",
    },
    greyText: {
        fontSize: 16,
        color: "#c0c0c0",
        paddingLeft: 16
    },
    greyFont: {
        fontSize: 16,
        color: "#c0c0c0"
    },
    redText: {
        fontSize: 16,
        color: "red"
    }
};

export const nameDisplayStyles = {
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    letterDisplay: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: color.grey,
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
};

export const popoverStyles = {
    content: {
        width: 342,
        height: 95,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 12,
        paddingRight: 12,
        margin:0,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: 'grey'
    },
    arrow: {
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        margin:0,
        padding: 0
    },
        background: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    touchable: {
        flex: 0, 
        alignSelf: "flex-end", 
        flexDirection: "row", 
        marginTop: 15
    },
    redClick: {
        color: "red", 
        fontSize: 13, 
        paddingTop: 5, 
        paddingBottom: 5, 
        paddingRight: 5
    },
    iconTouch: {
        paddingTop: 4 
    },
    column: {
        flexDirection: "column"
    },
    row: {
        flexDirection: "row"
    },
    mainFirst: {
        flexDirection: "row", 
        marginRight: 50, 
        alignItems: "center"
    },
    mainSecond: {
        flexDirection: "row", 
        marginRight: 0, 
        alignItems: "center"
    },
    viewX: {
        width: 12, 
        height: 12, 
        borderRadius: 12/2, 
        backgroundColor: "#c0c0c0"
    },
    textX: {
        fontSize: 12, 
        paddingLeft: 4
    },
    notMain: {
        flexDirection: "row", 
        marginTop: 30
    },
    leftSide: {
        flexDirection: "row",
        marginRight: 100, 
        alignItems: "center"
    },
    rightSide: {
        flex:0, 
        flexDirection: "row", 
        alignSelf: "flex-end", 
        marginRight: 0, 
        marginBottom: 8
    },
    innerLeft: {
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        backgroundColor: "red"
    },
    recall: {
        textAlign: "right",
        fontSize: 12,
        paddingLeft: 16
    },
    innerLeftText: { 
        fontSize: 12, 
        paddingLeft: 4 
    }
}

export const subHeaderStyles = {
    header: {
        height: 40,
        backgroundColor: "#fff"
      },
      row: {
        flexDirection: "row",
        width: "40%"
      },
      pad: {
        paddingLeft: 10,
        paddingTop: 5
      },
      font: {
        fontSize: 13,
        paddingBottom: 9
      },
      iconColor: {
        color: "#F0F0F0"
      }
};

export const totalDebtStyle = {
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: color.listBorderColor
    },
    totalView: {
      flexDirection: "row",
      width: '30%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#fff',
    },
    totalText: {
      fontSize: 14,
      fontWeight: "400",
      //color: "#000",
    },
    redNumber1: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
    redNumberView1: {
      width: '70%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF8C00',
    },
    redNumberView2: {
      width: '70%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(218,11,11,59)',
    }
};

export const totalOrderStyle = {
    column: {
        borderBottomWidth: 1,
        borderBottomColor: color.primary
      },
      container: {
          flexDirection: 'row',
          flex: 1,
          borderTopWidth: 0.5,
          borderTopColor: color.listBorderColor
      },
      totalView: {
        width: '30%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#fff',
      },
      totalText: {
        fontSize: 14,
        fontWeight: "400",
        //color: "#000",
      },
      redNumber: {
        color: color.primary,
        fontSize: 18,
        fontWeight: 'bold',
      },
      redNumberView: {
        width: '70%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.totalSales
      },
      peachView: {
        width: '70%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.totalProfit
      }
};

export const customerListStyles = {
    container: {
        //backgroundColor: "#FFF",
        flex: 1,
        width: "100%"
      },
    header: {
        backgroundColor: "#fff", 
        width: "100%", 
        height: 40
    },
    direct: {
        flexDirection: "row"
    },
    dropText: {
        paddingBottom: 10, 
        fontSize: 14
    }
}

export const orderListStyles = {
    container: {
        //backgroundColor: "#FFF",
        flex: 1
    }
};

export const selectGenderStyles = {
    pickerColor: {
        color: color.inactive
    }
};

export const signupButton = {
    width: '49%',
    marginHorizontal: 1,
    justifyContent: 'center',
    height: 55
};

export const redButtonText = {
    color: color.secondary
};