import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

// 简单的管理员凭证（仅为演示，实际应使用安全的身份验证方法）
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 验证凭证
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
      // 存储登录状态（仅为演示）
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      // 重定向到管理面板
      router.push('/admin/panel');
    } else {
      setError('用户名或密码不正确');
    }
  };

  return (
    <Layout title="管理员登录">
      <Container className="py-5">
        <div className="admin-login">
          <Card>
            <Card.Header as="h5" className="text-center">
              管理员登录
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>用户名</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>密码</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    登录
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Layout>
  );
} 