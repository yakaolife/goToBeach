import React from 'react';
import { AsyncStorage, View, Animated } from 'react-native';
import { StyleProvider, Container, Header, Content, Button, Footer, Text, Fab, Icon } from 'native-base';
import moment from 'moment';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      water: 0,
      error: null,
      animate: new Animated.Value(0),
    };
    this.setWater = this.setWater.bind(this);
    this.moveWater = this.moveWater.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("water").then((water) => this.setState({water: parseInt(water)}));       
  }

  setWater(reset) {
    const water = reset ? 0 : this.state.water+1;
    this.setState({ water: water });
    AsyncStorage.setItem("water", `${water}`);
    this.moveWater(water-1, water);
  }

  moveWater(from, to) {
  }

  render() {
    const date = moment().format("MMM Do");
    const water = `${this.state.water} cups`;
    return (
      <Container>
        <Header>
          <Text style={styles.headerTitle}>😎 Go To Beach and Stay Hydrate 😎</Text>
        </Header>
        <Content>
          <View style={styles.content}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.cupText}>{water}</Text>
          </View>
        </Content>
        {/* <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{width: '100%', height: 400, backgroundColor: 'powderblue'}} />
        <View style={{width: '100%', height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: '100%', height: 50, backgroundColor: 'steelblue'}} />
      </View> */}
        <Fab
          active={this.state.active}
          direction="right"
          style={styles.fabStyle}
          position="bottomLeft"
          onPress={() => this.setWater()}
          onLongPress={() => this.setWater(true)}
        >
          <Icon type='Entypo' name='drop' />
        </Fab>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    paddingTop: 10,
  },
  date: {
    fontSize: 20,
    paddingTop: 50,
    position: 'absolute',
  },
  cupText: {
    fontSize: 40,
    color: '#aaa',
    paddingTop: 150,
    position: 'absolute',
  },
  zIndexTop: {
    zIndex: 1000,
  },
  fabStyle: {
    backgroundColor: '#00b2f9',
    zIndex: 1000, 
  }
};
