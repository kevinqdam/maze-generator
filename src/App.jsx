import React from 'react';
import { Layout } from 'antd';
import Maze from './components/Maze';

import 'antd/dist/antd.css';
import './index.scss';
import styles from './App.module.scss';

const { Header, Footer, Content } = Layout;

const App = function MainApp() {
  return (
    <Layout className={styles.layout}>
      <Header>Maze</Header>
      <Content className={styles.content}>
        <Maze />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
