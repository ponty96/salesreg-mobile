import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { color } from '../Style/Color';

interface Category {
  title: string;
  routeName: string;
}
const sidebarItem = (prop: {
  title: string;
  categories: Category[];
  navigate: any;
}) => {
  return (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.title}>{prop.title}</Text>
      </View>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <TouchableOpacity
            style={styles.categoryWrapper}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Text style={styles.category}>{category.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default sidebarItem;

const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: color.inactive
  },
  title: {
    marginLeft: '10%',
    color: color.subHeader,
    marginVertical: '2%'
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor,
    paddingVertical: 8
  },
  category: {
    marginLeft: '10%',
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: 8
  }
});
