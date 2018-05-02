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

export const aboveAccordionStyles = {
    container: {
        flexDirection: 'row',
        flex: 0,
        borderTopWidth: 0.5,
        borderTopColor: color.listBorderColor
    },
    pictureView: {
      flexDirection: "column",
      width: '50%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#fff',
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
}

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
      }
}

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
}

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
}

export const customerListStyles = {
    container: {
        //backgroundColor: "#FFF",
        flex: 1,
        width: "100%"
      }
}

export const orderListStyles = {
    container: {
        //backgroundColor: "#FFF",
        flex: 1
    }
}

export const selectGenderStyles = {
    pickerColor: {
        color: color.inactive
    }
}