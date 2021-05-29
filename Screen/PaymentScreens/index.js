import React, { useState, useEffect } from 'react';
//import { createStackNavigator, createAppContainer } from 'react-navigation-stack';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Container } from 'native-base';

import Header from './Header';
import Home from './Home';
import PaymentTest from './PaymentTest';
import Payment from './Payment';
import PaymentResult from './PaymentResult';
import CertificationTest from './CertificationTest';
import Certification from './Certification';
import CertificationResult from './CertificationResult';
import TuteeAuthlist from '../AuthenticationScreen/TuteeAuthList'
import NavigationService from './NavigationService';

const noHeader = {
  headerStyle: {
    height: 0,
  },
};

const hideHeader = {
  headerShown: false,
};
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: noHeader,
  },
  TuteeAuthlist: {
    screen: TuteeAuthlist,
    navigationOptions: noHeader,
  },
  PaymentTest: {
    screen: PaymentTest,
    navigationOptions: hideHeader,
  },
  Payment: {
    screen: Payment,
    navigationOptions: noHeader,
  },
  PaymentResult: {
    screen: PaymentResult,
    navigationOptions: hideHeader,
  },
  CertificationTest: {
    screen: CertificationTest,
    navigationOptions: hideHeader,
  },
  Certification: {
    screen: Certification,
    navigationOptions: noHeader,
  },
  CertificationResult: {
    screen: CertificationResult,
    navigationOptions: hideHeader,
  },
}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);


export default function App({navigation,route}) {
  const [isHeaderShow, setIsHeaderShow] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Home');

  
  useEffect(() => {
    let headerTitle = '';
    let isHeaderShow = true;
    if (currentScreen === 'PaymentTest') {
      headerTitle = '아임포트 결제';
    } else if (currentScreen === 'CertificationTest') {
      headerTitle = '아임포트 본인인증';
    } else {
      isHeaderShow = false;
    }

    setIsHeaderShow(isHeaderShow);
    setHeaderTitle(headerTitle);
  }, [currentScreen]);

  function handleNavigation(prevState, newState) {
    const { routes } = newState;
    routes[routes.length - 1].params={project:route.params.project}
    const { routeName } = routes[routes.length - 1];
    if (currentScreen !== routeName) {
      setCurrentScreen(routeName);
    }
  }
  return (
    <Container>
      {isHeaderShow && <Header title={headerTitle} />}
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        project={route.params.project}
        onNavigationStateChange={handleNavigation}
        
      />
    </Container>
  );
}
