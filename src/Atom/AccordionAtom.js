import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'
import DebtAccordionAtom from './DebtAccordionAtom'
import { ScrollView } from 'react-native-gesture-handler'
import { sections } from '../config/data'
import { color } from '../Style/Color'

const SECTIONS = sections

/*interface IProps {
  icon: string
}
interface IState {
  activeSection: boolean
  icon: string
}*/
const namer = 'md-arrow-dropdown'

export default class AccordionAtom extends React.Component /*<IProps, IState>*/ {
  constructor(props /*?: IProps, context?: any*/) {
    super(props /*, context*/)
    this.state = {
      activeSection: false,
      icon: 'md-arrow-dropdown'
    }
  }

  setHeader = (section /*: any*/) => {
    const { icon } = this.state
    this.loadHeader(icon)
    this.setState({ activeSection: section })
  }

  loadHeader = (a /*: string*/) => {
    if (a === 'md-arrow-dropdown') {
      this.setState({ icon: 'md-arrow-dropup' })
    } else {
      this.setState({ icon: 'md-arrow-dropdown' })
    }
  }

  renderHeader(section /*: any*/) {
    return (
      <View style={styles.mainAccord}>
        <View style={styles.accordView1}>
          <View style={styles.viewMargin}>
            <Text style={styles.accordTextL1}>
              {section.orderId}
              {'   '}
              <Text style={styles.wrapAccordText}>{section.date}</Text>
            </Text>
          </View>
          <View style={styles.viewMargin}>
            <Text style={styles.accordTextL2}>
              {'\u20A6'} {section.debt}.00
            </Text>
          </View>
        </View>
        <View style={styles.accordView2}>
          <Text style={styles.accordTextR}>{section.amount}</Text>
          <Icon style={styles.accordIcon} name={namer} />
        </View>
      </View>
    )
  }

  renderContent() {
    return <DebtAccordionAtom />
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSection={this.state.activeSection}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          onChange={this.setHeader}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainAccord: {
    flex: 1,
    flexDirection: 'row',
    height: 75,
    width: '100%',
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1
  },

  accordView1: {
    flex: 1,
    flexDirection: 'column',
    width: '40%',
    marginLeft: 0,
    paddingLeft: 0,
    height: 75
  },

  viewMargin: {
    marginLeft: 16
  },

  accordView2: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 16,
    marginLeft: '20%',
    width: '40%',
    height: 75,
    alignItems: 'flex-end'
  },

  accordTextR: {
    fontWeight: '500',
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 8
  },

  accordIcon: {
    paddingTop: 4,
    color: '#c0c0c0'
  },
  accordTextL2: {
    color: color.primary
  }
})
