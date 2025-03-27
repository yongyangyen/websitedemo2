// 此API端点仅作为文档用途，实际上我们会直接提供静态图片

export default function handler(req, res) {
  res.status(200).json({
    message: '请在public/images/目录下添加avatar-placeholder.jpg图片',
    instructions: '这个图片将作为新添加客户评价的默认头像，建议使用正方形图片，尺寸约为200x200像素'
  });
} 