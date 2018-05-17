import React from "react";
import PropTypes from "prop-types";
import { Icon, Fab } from "native-base";

import styles from "./../Style/Screen";
import { color } from "./../Style/Color";

const FabAtom = props => (
  <Fab
    position="bottomRight"
    style={styles.fab}
    active={true}
    onPress={() => props.navigation.navigate(props.routeName, props.params)}
  >
    <Icon
      name={props.name}
      type={props.type ? props.type : "Ionicons"}
      color={color.secondary}
    />
  </Fab>
);

FabAtom.propTypes = {
  params: PropTypes.object
};

export default FabAtom;
