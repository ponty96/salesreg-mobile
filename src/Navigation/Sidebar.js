import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'native-base'

import styles from './../Style/Layout'

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
					<View style={styles.sidebarItem}>
						<Icon
							name={'settings'}
							style={styles.itemIcon}
							type={'MaterialCommunityIcons'}
						/>
						<Text style={ styles.itemText }>
							Kay5iveAttractions
						</Text>
					</View>	
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
							name={'database'}
							style={styles.itemIcon}
							type={'MaterialCommunityIcons'}
						/>
						<Text style={ styles.itemText }>
							Financial Report
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
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