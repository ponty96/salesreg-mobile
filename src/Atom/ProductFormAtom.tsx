import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageAtom from './ImageAtom';
import InputAtom from './InputAtom';
import styles from '../Style/Form';
import styles1 from '../Style/exportStyles';

interface IProps {
    navigation: any
}

interface IState {
    product: string
    image: string
    squantity: string | number
    pquantity: string | number
    costpp: string | number
    ucost: string | number
    sellp: string | number
    stock: string | number
}
export default class ProductFormAtom extends React.Component<IProps, IState> {
    state: IState = {
        product: '',
        image: '',
        squantity: '',
        pquantity: '',
        costpp: '',
        ucost: '',
        sellp: '',
        stock: ''
    };

    create = () => {
        this.props.navigation.goBack();
    }

    getProduct = (product: string) => {
        this.setState({product});
    }

    getImage = (pic: string) => {
        this.setState({
            image: pic
        });
    }

    getSQuantity = (squantity: any) => {
        this.setState({squantity});
    }

    getPQuantity = (pquantity: any) => {
        this.setState({pquantity});
    }

    getCostPP = (costpp: any) => {
        this.setState({costpp});
    }

    getUCost = (ucost: any) => {
        this.setState({ucost});
    }
    getSellP = (sellp: any) => {
        this.setState({sellp});
    }
    getStock = (stock: any) => {
        this.setState({stock});
    }
  render() {
    return (
        <ScrollView>
            <View>
                <ImageAtom
                    getValue = { this.getImage }
                    source={this.state.image}
                />
            <View>
                <InputAtom
                    label='  Product name'
                    getValue={this.getProduct}
                    contStyle={styles1.marginlessInput}
                />
            </View>
            <View>
                <InputAtom
                    label='  Stock quantity'
                    keyboardType='numeric'
                    getValue={this.getSQuantity}
                    contStyle={styles1.marginlessInput}
                />
                <Text style={styles.font1}>Quantity available in store</Text>
            </View>
            <View>
                <InputAtom
                    label='  Pack quantity'
                    keyboardType='numeric'
                    getValue={this.getPQuantity}
                    contStyle={styles1.marginlessInput}
                />
                <Text style={styles.font1}>Quantity in a pack e.g. Dozen, caton, packet, container</Text>
            </View>
            <View>
                <InputAtom
                    label='  Cost price per pack'
                    keyboardType='numeric'
                    getValue={this.getCostPP}
                    contStyle={styles1.marginlessInput}
                />
            </View>
            <View>
                <InputAtom
                    label='  Unit cost price'
                    keyboardType='numeric'
                    getValue={this.getUCost}
                    contStyle={styles1.marginlessInput}
                />
                <Text style={styles.font1}>Cost price of 1 unit e.g. 1 piece, 1 dozen, 1 caton, 1 liter</Text>
            </View>
            <View>
                <InputAtom
                    label='  Selling price'
                    keyboardType='numeric'
                    getValue={this.getSellP}
                    contStyle={styles1.marginlessInput}
                />
            </View>
            <View>
                <InputAtom
                    label='  Minimum stock quanity'
                    keyboardType='numeric'
                    getValue={this.getStock}
                    contStyle={styles1.marginlessInput}
                />
                <Text style={styles.font1}>Minimum amount required for re-stock</Text>
            </View>
        </View>
        </ScrollView>
    );
  }
}