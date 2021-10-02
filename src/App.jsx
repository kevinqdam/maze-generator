import React from 'react';
import { Layout } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import Maze from './components/Maze';

import 'antd/dist/antd.css';
import './index.scss';
import styles from './App.module.scss';

const { Footer, Content } = Layout;

const App = function MainApp() {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Maze />
      </Content>
      <Footer className={styles.footer}>
        <div className={styles['footer-items']}>
          <p>Maze Generator & Solver © 2021 Created by Kevin Dam</p>
          <a
            className={styles['anchor-color']}
            href="https://github.com/kevinqdam/maze-generator"
          >
            <GithubFilled className={styles.icon} />
          </a>
        </div>
      </Footer>
    </Layout>
  );
};

export default App;
