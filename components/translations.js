// 网站多语言翻译
const translations = {
  // 中文翻译
  zh: {
    // 导航栏
    nav: {
      home: '首页',
      services: '我们的服务',
      testimonials: '客户评价',
      contact: '联系我们',
    },
    // 首页区块
    hero: {
      title: '快速、便捷的贷款服务',
      subtitle: '满足您的各种资金需求，简化贷款流程',
      buttonText: '立即申请',
      trusted: '值得信赖',
      basedOn: '基于',
      reviews: '评价'
    },
    // 服务特点区块
    services: {
      title: '我们的服务',
      subtitle: '一站式金融解决方案，满足您的各种资金需求',
      learnMore: '了解更多',
      personalLoan: '个人贷款',
      personalLoanDesc: '满足您的个人资金需求，灵活的还款选项',
      homeLoan: '房屋贷款',
      homeLoanDesc: '低利率的房屋贷款，帮助您实现住房梦想',
      carLoan: '汽车贷款',
      carLoanDesc: '快速批准的汽车贷款，让您轻松拥有爱车',
      educationLoan: '教育贷款',
      educationLoanDesc: '投资未来，支持您的教育发展',
      businessLoan: '商业贷款',
      businessLoanDesc: '助力您的业务增长，提供资金支持',
      microLoan: '小额贷款',
      microLoanDesc: '满足短期资金需求，简单便捷的申请流程',
    },
    // 客户评价区块
    testimonials: {
      title: '客户评价',
      subtitle: '看看我们的客户如何评价我们的服务',
    },
    // 联系区块
    contact: {
      title: '联系我们',
      description: '如有任何问题或需要了解更多信息，请随时与我们联系。我们的团队随时准备为您提供帮助。',
      contactInfo: '联系方式',
      address: '地址',
      phone: '电话',
      email: '电子邮件',
      hours: '营业时间',
      sendMessage: '发送消息',
      name: '姓名',
      email: '电子邮件',
      phone: '电话号码',
      message: '消息',
      send: '发送',
      sending: '发送中...',
      successMessage: '消息已成功发送！我们的团队将尽快与您联系。',
      errorMessage: '发送消息时出现错误，请稍后再试。'
    },
    // 页脚
    footer: {
      about: '关于我们',
      aboutDesc: '我们提供快速、便捷的贷款服务，满足您的各种资金需求。',
      contactInfo: '联系方式',
      followUs: '关注我们',
      copyright: '版权所有',
    },
  },
  
  // 英文翻译
  en: {
    // 导航栏
    nav: {
      home: 'Home',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    // 首页区块
    hero: {
      title: 'Fast and Convenient Loan Services',
      subtitle: 'Meeting your various funding needs with simplified loan processes',
      buttonText: 'Apply Now',
      trusted: 'Trusted',
      basedOn: 'based on',
      reviews: 'reviews'
    },
    // 服务特点区块
    services: {
      title: 'Our Services',
      subtitle: 'One-stop financial solutions to meet your various funding needs',
      learnMore: 'Learn More',
      personalLoan: 'Personal Loan',
      personalLoanDesc: 'Meet your personal financial needs with flexible repayment options',
      homeLoan: 'Home Loan',
      homeLoanDesc: 'Low interest rate home loans to help you achieve your housing dreams',
      carLoan: 'Car Loan',
      carLoanDesc: 'Quickly approved car loans that let you easily own your car',
      educationLoan: 'Education Loan',
      educationLoanDesc: 'Invest in the future and support your educational development',
      businessLoan: 'Business Loan',
      businessLoanDesc: 'Boost your business growth with financial support',
      microLoan: 'Micro Loan',
      microLoanDesc: 'Meet short-term funding needs with a simple and convenient application process',
    },
    // 客户评价区块
    testimonials: {
      title: 'Testimonials',
      subtitle: 'See what our clients say about our services',
    },
    // 联系区块
    contact: {
      title: 'Contact Us',
      description: 'If you have any questions or need more information, please feel free to contact us. Our team is always ready to help you.',
      contactInfo: 'Contact Information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Business Hours',
      sendMessage: 'Send Message',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      successMessage: 'Message sent successfully! Our team will contact you soon.',
      errorMessage: 'Error sending message. Please try again later.'
    },
    // 页脚
    footer: {
      about: 'About Us',
      aboutDesc: 'We provide fast and convenient loan services to meet your various financial needs.',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
      copyright: 'All Rights Reserved',
    },
  },
  
  // 马来文翻译
  ms: {
    // 导航栏
    nav: {
      home: 'Laman Utama',
      services: 'Perkhidmatan',
      testimonials: 'Testimoni',
      contact: 'Hubungi Kami',
    },
    // 首页区块
    hero: {
      title: 'Perkhidmatan Pinjaman Cepat dan Mudah',
      subtitle: 'Memenuhi pelbagai keperluan kewangan anda dengan proses pinjaman yang dipermudahkan',
      buttonText: 'Mohon Sekarang',
      trusted: 'Dipercayai',
      basedOn: 'berdasarkan',
      reviews: 'ulasan'
    },
    // 服务特点区块
    services: {
      title: 'Perkhidmatan Kami',
      subtitle: 'Penyelesaian kewangan sehenti untuk memenuhi pelbagai keperluan kewangan anda',
      learnMore: 'Ketahui Lebih Lanjut',
      personalLoan: 'Pinjaman Peribadi',
      personalLoanDesc: 'Memenuhi keperluan kewangan peribadi anda dengan pilihan pembayaran balik yang fleksibel',
      homeLoan: 'Pinjaman Perumahan',
      homeLoanDesc: 'Pinjaman perumahan berkadar faedah rendah untuk membantu anda mencapai impian perumahan anda',
      carLoan: 'Pinjaman Kereta',
      carLoanDesc: 'Pinjaman kereta yang diluluskan dengan cepat membolehkan anda memiliki kereta dengan mudah',
      educationLoan: 'Pinjaman Pendidikan',
      educationLoanDesc: 'Melabur untuk masa depan dan menyokong perkembangan pendidikan anda',
      businessLoan: 'Pinjaman Perniagaan',
      businessLoanDesc: 'Meningkatkan pertumbuhan perniagaan anda dengan sokongan kewangan',
      microLoan: 'Pinjaman Mikro',
      microLoanDesc: 'Memenuhi keperluan pembiayaan jangka pendek dengan proses permohonan yang mudah dan ringkas',
    },
    // 客户评价区块
    testimonials: {
      title: 'Testimoni',
      subtitle: 'Lihat apa yang pelanggan kami katakan tentang perkhidmatan kami',
    },
    // 联系区块
    contact: {
      title: 'Hubungi Kami',
      description: 'Jika anda mempunyai sebarang pertanyaan atau memerlukan maklumat lanjut, sila hubungi kami. Pasukan kami sentiasa bersedia untuk membantu anda.',
      contactInfo: 'Maklumat Hubungan',
      address: 'Alamat',
      phone: 'Telefon',
      email: 'E-mel',
      hours: 'Waktu Perniagaan',
      sendMessage: 'Hantar Mesej',
      name: 'Nama',
      email: 'E-mel',
      phone: 'Telefon',
      message: 'Mesej',
      send: 'Hantar',
      sending: 'Menghantar...',
      successMessage: 'Mesej berjaya dihantar! Pasukan kami akan menghubungi anda tidak lama lagi.',
      errorMessage: 'Ralat menghantar mesej. Sila cuba lagi nanti.'
    },
    // 页脚
    footer: {
      about: 'Tentang Kami',
      aboutDesc: 'Kami menyediakan perkhidmatan pinjaman yang cepat dan mudah untuk memenuhi pelbagai keperluan kewangan anda.',
      contactInfo: 'Maklumat Hubungan',
      followUs: 'Ikuti Kami',
      copyright: 'Hak Cipta Terpelihara',
    },
  },
};

export default translations; 