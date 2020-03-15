import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
    page: 2,
  };
  async componentDidMount() {
    const {route} = this.props;
    const user = route.params.user;

    this.setState({loading: true});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, loading: false});
  }

  handleEnd = async () => {
    const {stars, page} = this.state;
    const {route} = this.props;
    const user = route.params.user;
    this.setState({page: page + 1});
    console.tron.log(page);

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    if (response.data) {
      this.setState({stars: [...stars, ...response.data]});
    }
  };

  render() {
    const {route} = this.props;
    const user = route.params.user;
    const {stars, loading} = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#333" />
        ) : (
          <Stars
            data={stars}
            onEndReached={this.handleEnd}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
