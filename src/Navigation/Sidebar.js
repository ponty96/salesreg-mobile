import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'native-base';

import styles from './../Style/Layout';
import ListItemAtom from './../Atom/ListItemAtom';

const SideBar = (props) => (
	<SafeAreaView style={styles.sidebarContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
		<View style={styles.itemsContainer}>
			<ScrollView>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('BusinessDetails',
									{
										name: 'Kay5iveAttractions',
										id: 'ID here for getting data at the new screen'
									}
								)
							}
				>
					<ListItemAtom
                        item={
                            {
                                name: 'kay5',
                                image: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
                            }
                        }
                        business={false}
                    />
				</TouchableOpacity>
                <TouchableOpacity
					onPress={() => props.navigation.navigate('BusinessDetails',
									{
										name: 'Kay5iveAttractions',
										id: 'ID here for getting data at the new screen'
									}
								)
							}
				>
					<ListItemAtom
                        item={
                            {
                                name: 'kay5'
                            }
                        }
                    />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Settings')}
				>
					<View style={styles.sidebarItem}>
						<Icon
							name={'settings'}
							style={styles.itemIcon}
							type={'MaterialCommunityIcons'}
						/>
						<Text style={ styles.itemText }>
							Settings
						</Text>
					</View>	
				</TouchableOpacity>
				<TouchableOpacity>	
					<View style={styles.sidebarItem}>
						<Icon
							name={'help'}
							style={styles.itemIcon}
							type={'MaterialCommunityIcons'}
						/>
						<Text style={ styles.itemText }>
							Need help
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</View>
        <View style={styles.logoutItem}>
            <Icon
                name={'md-briefcase'}
                style={styles.itemIcon}
            />
            <Text style={ styles.itemText }>
                My businesses
            </Text>
        </View>
		<View style={styles.logoutItem}>
			<Icon
				name={'logout'}
				style={styles.itemIcon}
				type={'MaterialCommunityIcons'}
			/>
			<Text style={ styles.itemText }>
				Logout
			</Text>
		</View>
	</SafeAreaView>
)

export default SideBar