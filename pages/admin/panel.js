import React, { useContext, useState, useCallback, memo, useEffect } from 'react';
import { Container, Tab, Tabs, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Layout from '../../components/Layout';
import AdminAuth from '../../components/AdminAuth';
import { SiteDataContext } from '../../components/SiteDataProvider';
import { useRouter } from 'next/router';

// 图片预览组件，使用memo优化渲染
const BankLogoPreview = memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };
  
  return (
    <div className="text-center mt-3">
      {!loaded && !error && (
        <div 
          style={{
            height: '60px',
            margin: '0 auto',
            width: '200px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            borderRadius: '8px'
          }}
        />
      )}
      <img 
        src={error ? '/images/bank-logo-placeholder.png' : src} 
        alt={alt}
        style={{
          maxHeight: '60px',
          maxWidth: '200px',
          objectFit: 'contain',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
});

BankLogoPreview.displayName = 'BankLogoPreview';

// 使用memo包装表单控件组件，避免不必要的重渲染
const FormTextField = memo(({ label, value, onChange, placeholder, className, helpText }) => (
  <Form.Group className={className || "mb-3"}>
    <Form.Label>{label}</Form.Label>
    <Form.Control 
      type="text" 
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
    />
    {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
  </Form.Group>
));

FormTextField.displayName = 'FormTextField';

// 使用memo包装贷款卡片编辑组件，避免不必要的重渲染
const LoanCardEditor = memo(({ card, index, onUpdate, onDelete, totalCards }) => {
  // 创建防抖的更新函数
  const handleChange = useCallback((field, value) => {
    const updatedCard = { ...card };
    updatedCard[field] = value;
    onUpdate(index, updatedCard);
  }, [card, index, onUpdate]);

  // 创建特性字段更新函数
  const handleFeatureChange = useCallback((featureIndex, value) => {
    const updatedFeatures = [...card.features];
    updatedFeatures[featureIndex] = value;
    const updatedCard = { ...card, features: updatedFeatures };
    onUpdate(index, updatedCard);
  }, [card, index, onUpdate]);

  // 创建删除特性函数
  const handleDeleteFeature = useCallback((featureIndex) => {
    const updatedFeatures = [...card.features];
    updatedFeatures.splice(featureIndex, 1);
    const updatedCard = { ...card, features: updatedFeatures };
    onUpdate(index, updatedCard);
  }, [card, index, onUpdate]);

  // 创建添加特性函数
  const handleAddFeature = useCallback(() => {
    const updatedFeatures = [...(card.features || []), '新特点'];
    const updatedCard = { ...card, features: updatedFeatures };
    onUpdate(index, updatedCard);
  }, [card, index, onUpdate]);

  // 记忆化删除函数，避免不必要的重复渲染
  const handleDelete = useCallback(() => {
    onDelete(card.id);
  }, [card.id, onDelete]);

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
        <h5 className="m-0 fw-bold">贷款卡片 #{index + 1}</h5>
        <Button 
          variant="danger" 
          size="sm"
          onClick={handleDelete}
          disabled={totalCards <= 3}
        >
          <i className="fas fa-trash-alt me-1"></i>
          删除
        </Button>
      </div>
      <div className="card-body p-4">
        <Row>
          <Col md={6}>
            <FormTextField 
              label="银行名称"
              value={card.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
            />
            
            <FormTextField 
              label="银行标志URL"
              value={card.bankLogo}
              onChange={(e) => handleChange('bankLogo', e.target.value)}
              helpText="建议图片尺寸：宽200-240px，高60-80px，透明背景PNG格式"
            />
            
            <FormTextField 
              label="利率标题"
              value={card.rateTitle}
              onChange={(e) => handleChange('rateTitle', e.target.value)}
            />
            
            <Row>
              <Col sm={6}>
                <FormTextField 
                  label="利率值"
                  value={card.rateValue}
                  onChange={(e) => handleChange('rateValue', e.target.value)}
                />
              </Col>
              <Col sm={6}>
                <FormTextField 
                  label="利率单位"
                  value={card.rateUnit}
                  onChange={(e) => handleChange('rateUnit', e.target.value)}
                />
              </Col>
            </Row>
            
            <FormTextField 
              label="利率备注"
              value={card.rateNote || ''}
              onChange={(e) => handleChange('rateNote', e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>特点列表</Form.Label>
              {card.features && card.features.map((feature, featureIndex) => (
                <div key={`feature-${card.id}-${featureIndex}`} className="d-flex mb-2">
                  <Form.Control 
                    type="text" 
                    value={feature}
                    onChange={(e) => handleFeatureChange(featureIndex, e.target.value)}
                  />
                  <Button 
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDeleteFeature(featureIndex)}
                    disabled={card.features.length <= 1}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline-success" 
                size="sm" 
                className="mt-2"
                onClick={handleAddFeature}
                disabled={card.features && card.features.length >= 5}
              >
                <i className="fas fa-plus me-1"></i>
                添加特点
              </Button>
            </Form.Group>
            
            <FormTextField 
              label="按钮文字"
              value={card.actionText || '了解更多'}
              onChange={(e) => handleChange('actionText', e.target.value)}
            />
            
            <FormTextField 
              label="按钮链接"
              value={card.actionLink || '#'}
              onChange={(e) => handleChange('actionLink', e.target.value)}
            />
            
            <FormTextField 
              label="条款说明"
              value={card.terms || '*条款与条件适用'}
              onChange={(e) => handleChange('terms', e.target.value)}
            />
          </Col>
        </Row>
        
        {card.bankLogo && <BankLogoPreview src={card.bankLogo} alt={card.bankName} />}
      </div>
    </div>
  );
});

// 添加显示名称，便于调试
LoanCardEditor.displayName = 'LoanCardEditor';

// 贷款卡片列表编辑器组件
const LoanCardsEditor = memo(({ cards, updateCard, deleteCard, addCard }) => {
  return (
    <div className="admin-form-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">贷款卡片设置</h3>
        <Button 
          variant="success" 
          onClick={addCard}
        >
          <i className="fas fa-plus-circle me-2"></i>
          添加新贷款卡片
        </Button>
      </div>
      
      <div className="text-muted mb-3">
        <small>注意: 最多可添加9个贷款卡片，前台将仅显示前9个。至少需要保留3个卡片。</small>
      </div>
      
      {cards.map((card, index) => (
        <LoanCardEditor 
          key={`card-${card.id}`}
          card={card} 
          index={index}
          onUpdate={updateCard}
          onDelete={deleteCard}
          totalCards={cards.length}
        />
      ))}
    </div>
  );
});

LoanCardsEditor.displayName = 'LoanCardsEditor';

export default function AdminPanel() {
  const { siteData, updateSiteData, resetToDefault, isLoading } = useContext(SiteDataContext);
  const [activeTab, setActiveTab] = useState('hero');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  // 编辑功能的状态变量
  const [heroSection, setHeroSection] = useState({});
  const [loanCards, setLoanCards] = useState([]);
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactInfo, setContactInfo] = useState({});

  // 在数据加载完成后初始化状态
  useEffect(() => {
    if (!isLoading && siteData && !initialized) {
      setHeroSection(siteData.heroSection || {});
      setLoanCards(siteData.loanCards || []);
      setFeatures(siteData.features || []);
      setTestimonials(siteData.testimonials || []);
      setContactInfo(siteData.contactInfo || {});
      setInitialized(true);
    }
  }, [isLoading, siteData, initialized]);

  // 优化更新贷款卡片的函数，使用不可变更新模式
  const updateLoanCard = useCallback((index, updatedCard) => {
    setLoanCards(prevCards => {
      const newCards = [...prevCards];
      newCards[index] = updatedCard;
      return newCards;
    });
  }, []);

  // 优化删除贷款卡片的函数
  const deleteLoanCard = useCallback((cardId) => {
    if (confirm('确定要删除此贷款卡片吗？此操作无法撤销。')) {
      setLoanCards(prevCards => prevCards.filter(c => c.id !== cardId));
    }
  }, []);

  // 优化添加新贷款卡片的函数
  const addNewLoanCard = useCallback(() => {
    setLoanCards(prevCards => {
      // 检查是否已经达到最大卡片数量
      if (prevCards.length >= 9) {
        alert('最多只能添加9个贷款卡片');
        return prevCards;
      }
      
      // 生成唯一ID
      const newId = prevCards.length > 0 
        ? Math.max(...prevCards.map(c => c.id)) + 1 
        : 1;
      
      // 创建新贷款卡片
      const newCard = {
        id: newId,
        bankName: '新银行',
        bankLogo: '/images/bank-logo-placeholder.png',
        rateTitle: '贷款利率',
        rateValue: '0.00',
        rateUnit: '% p.a.',
        rateNote: '特殊优惠',
        features: [
          '特点一',
          '特点二',
          '特点三'
        ],
        actionText: '了解更多',
        actionLink: '#contact',
        terms: '*条款与条件适用'
      };
      
      // 更新状态，使用不可变更新模式
      return [...prevCards, newCard];
    });
  }, []);

  // 保存所有更改
  const handleSaveChanges = useCallback(() => {
    const newSiteData = {
      heroSection,
      loanCards,
      features,
      testimonials,
      contactInfo
    };
    
    updateSiteData(newSiteData);
    setSuccessMessage('内容已成功更新！');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  }, [heroSection, loanCards, features, testimonials, contactInfo, updateSiteData]);

  // 重置为默认设置
  const handleReset = useCallback(() => {
    if (confirm('确定要重置所有内容到默认值吗？此操作无法撤销。')) {
      resetToDefault();
      // 刷新页面以获取新数据
      router.reload();
    }
  }, [resetToDefault, router]);

  // 登出功能
  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoggedIn');
      router.push('/admin/login');
    }
  }, [router]);
  
  // 如果数据仍在加载，显示加载状态
  if (isLoading || !initialized) {
    return (
      <Layout title="管理员面板">
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">加载中...</span>
            </div>
            <p className="mt-3">正在加载数据，请稍候...</p>
          </div>
        </Container>
      </Layout>
    );
  }
  
  return (
    <AdminAuth>
      <Layout title="管理员面板">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>网站内容管理</h1>
            <div>
              <Button variant="outline-secondary" onClick={() => router.push('/')} className="me-2">
                查看网站
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                登出
              </Button>
            </div>
          </div>
          
          {successMessage && (
            <Alert variant="success" className="mb-4">
              {successMessage}
            </Alert>
          )}
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="hero" title="英雄区域">
              <div className="admin-form-section">
                <h3 className="mb-3">英雄区域设置</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>标题</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.title}
                      onChange={(e) => setHeroSection({...heroSection, title: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>副标题</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2}
                      value={heroSection.subtitle}
                      onChange={(e) => setHeroSection({...heroSection, subtitle: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>按钮文字</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.buttonText}
                      onChange={(e) => setHeroSection({...heroSection, buttonText: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>按钮链接</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.buttonLink}
                      onChange={(e) => setHeroSection({...heroSection, buttonLink: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>背景图片URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.backgroundImage}
                      onChange={(e) => setHeroSection({...heroSection, backgroundImage: e.target.value})}
                    />
                    <Form.Text className="text-muted">
                      输入图片的完整URL或以/images/开头的相对路径
                    </Form.Text>
                  </Form.Group>
                </Form>
              </div>
            </Tab>
            
            <Tab eventKey="loanCards" title="贷款卡片">
              <LoanCardsEditor 
                cards={loanCards}
                updateCard={updateLoanCard}
                deleteCard={deleteLoanCard}
                addCard={addNewLoanCard}
              />
            </Tab>
            
            <Tab eventKey="features" title="服务特点">
              <div className="admin-form-section">
                <h3 className="mb-3">服务特点设置</h3>
                
                {features.map((feature, index) => (
                  <div key={feature.id} className="mb-4 p-3 border rounded">
                    <h5>特点 #{index + 1}</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>图标 (FontAwesome类)</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={feature.icon}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].icon = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                          <Form.Text className="text-muted">
                            例如: fas fa-home, fas fa-car 等
                          </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>标题</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].title = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>描述</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={feature.description}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].description = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Tab>
            
            <Tab eventKey="testimonials" title="客户评价">
              <div className="admin-form-section">
                <h3 className="mb-3">客户评价设置</h3>
                
                <div className="mb-4">
                  <Button 
                    variant="success" 
                    className="mb-3"
                    onClick={() => {
                      // 生成唯一ID
                      const newId = testimonials.length > 0 
                        ? Math.max(...testimonials.map(t => t.id)) + 1 
                        : 1;
                      
                      // 创建新评价
                      const newTestimonial = {
                        id: newId,
                        name: '新客户',
                        position: '职位',
                        quote: '在这里输入客户评价内容...',
                        avatar: '/images/avatar-placeholder.jpg',
                        rating: 5
                      };
                      
                      // 更新状态
                      setTestimonials([...testimonials, newTestimonial]);
                    }}
                  >
                    <i className="fas fa-plus-circle me-2"></i>
                    添加新评价
                  </Button>
                </div>
                
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="mb-4 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>评价 #{index + 1}</h5>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => {
                          if (confirm('确定要删除此评价吗？此操作无法撤销。')) {
                            const newTestimonials = testimonials.filter(t => t.id !== testimonial.id);
                            setTestimonials(newTestimonials);
                          }
                        }}
                      >
                        <i className="fas fa-trash-alt me-1"></i>
                        删除
                      </Button>
                    </div>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>姓名</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.name}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].name = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>职位</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.position}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].position = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>评分</Form.Label>
                          <div>
                            <Form.Check
                              inline
                              type="radio"
                              id={`rating-5-${testimonial.id}`}
                              label={<span><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning"></i></span>}
                              name={`rating-${testimonial.id}`}
                              checked={testimonial.rating === 5}
                              onChange={() => {
                                const newTestimonials = [...testimonials];
                                newTestimonials[index].rating = 5;
                                setTestimonials(newTestimonials);
                              }}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              id={`rating-4-${testimonial.id}`}
                              label={<span><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning me-1"></i><i className="fas fa-star text-warning"></i></span>}
                              name={`rating-${testimonial.id}`}
                              checked={testimonial.rating === 4}
                              onChange={() => {
                                const newTestimonials = [...testimonials];
                                newTestimonials[index].rating = 4;
                                setTestimonials(newTestimonials);
                              }}
                            />
                          </div>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>头像URL</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.avatar}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].avatar = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                          <Form.Text className="text-muted">
                            图片的完整URL或以/images/开头的相对路径
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>评价内容</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={5}
                            value={testimonial.quote}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].quote = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                        
                        <div className="text-center mt-3">
                          {testimonial.avatar && (
                            <div 
                              className="mx-auto mb-2 rounded-circle"
                              style={{
                                width: '70px',
                                height: '70px',
                                backgroundImage: `url(${testimonial.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '2px solid #dee2e6'
                              }}
                            />
                          )}
                          <div className="text-muted">预览: {testimonial.name}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Tab>
            
            <Tab eventKey="contact" title="联系信息">
              <div className="admin-form-section">
                <h3 className="mb-3">联系信息设置</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>地址</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>电话号码</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>电子邮件</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>营业时间</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.businessHours}
                      onChange={(e) => setContactInfo({...contactInfo, businessHours: e.target.value})}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Tab>
          </Tabs>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="danger" onClick={handleReset}>
              重置为默认内容
            </Button>
            <Button variant="success" onClick={handleSaveChanges}>
              保存所有更改
            </Button>
          </div>
        </Container>
      </Layout>
    </AdminAuth>
  );
} 