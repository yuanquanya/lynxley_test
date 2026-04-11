import { Assessment, AssessmentItem } from './types';

export const LIBRARY_ITEMS: AssessmentItem[] = [
  {
    id: '1',
    title: '数据包封装过程可视化',
    category: 'Logic',
    difficulty: 'Beginner',
    duration: '20 分钟',
    description: '通过数据从应用层到数据链路层的封装过程，了解网络协议是如何工作的。',
    status: 'Start'
  },
  {
    id: '2',
    title: '文字编码与显示',
    category: 'Logic',
    difficulty: 'Beginner',
    duration: '15 分钟',
    description: '深入了解字符背后的秘密，探究从键盘输入到屏幕显示的全过程。',
    status: 'Start'
  }
];

export const SAMPLE_ASSESSMENT: Assessment = {
  id: 'arch-1',
  title: '数据包封装过程可视化',
  volume: '第一套题',
  readingMaterial: {
    title: '数据包封装过程可视化',
    iframeUrl: '/material1.html',
  },
  questions: [
    {
      id: 'q1',
      text: '浏览器浏览网页使用的是超文本传输协议（HTTP协议），这个协议类型头部是在______添加的？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '数据链路层' },
        { id: 'b', label: 'B', text: '网络层' },
        { id: 'c', label: 'C', text: '传输层' },
        { id: 'd', label: 'D', text: '应用层' }
      ],
      correctOptionId: 'd',
      rationale: '应用程序准备好数据后，会在应用层将数据转换成计算机能理解的格式并添加应用层协议类型头部，例如HTTP或FTP。'
    },
    {
      id: 'q2',
      text: '在数据包封装的过程中，哪一层负责添加源端口和目的端口信息？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '应用层' },
        { id: 'b', label: 'B', text: '传输层' },
        { id: 'c', label: 'C', text: '网络层' },
        { id: 'd', label: 'D', text: '数据链路层' }
      ],
      correctOptionId: 'b',
      rationale: '传输层（TCP和UDP协议）为数据添加源端口和目的端口信息，确保数据被正确的应用程序接收。'
    },
    {
      id: 'q3',
      text: '网络层通过添加什么信息来决定数据包在互联网中的路由和转发路径？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '端口号' },
        { id: 'b', label: 'B', text: 'MAC地址' },
        { id: 'c', label: 'C', text: 'IP地址' },
        { id: 'd', label: 'D', text: '序列号' }
      ],
      correctOptionId: 'c',
      rationale: '网络层添加源IP地址和目的IP地址，这是数据包在互联网中路由的关键信息，它就像邮政编码一样告诉网络数据应该发往何处。'
    },
    {
      id: 'q4',
      text: '用于在局域网内唯一标识网络设备物理地址的信息是？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: 'MAC地址' },
        { id: 'b', label: 'B', text: 'IP地址' },
        { id: 'c', label: 'C', text: '端口号' },
        { id: 'd', label: 'D', text: '协议类型' }
      ],
      correctOptionId: 'a',
      rationale: '数据链路层添加的MAC地址是网络设备的唯一物理标识，它确保了数据在局域网内能够正确传递。'
    },
    {
      id: 'q5',
      text: '以下哪一层会添加错误检测码（CRC）以确保数据传输的完整性？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '应用层' },
        { id: 'b', label: 'B', text: '传输层' },
        { id: 'c', label: 'C', text: '网络层' },
        { id: 'd', label: 'D', text: '数据链路层' }
      ],
      correctOptionId: 'd',
      rationale: '数据链路层不仅添加MAC地址，还会添加错误检测码（如CRC）来验证数据的完整性，避免传输错误。'
    },
    {
      id: 'q6',
      text: 'TCP协议除了添加端口信息外，还会添加哪些信息来提供可靠的数据传输服务？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '序列号、确认号和标志位' },
        { id: 'b', label: 'B', text: 'HTTP头部' },
        { id: 'c', label: 'C', text: '源IP和目的IP' },
        { id: 'd', label: 'D', text: 'MAC地址' }
      ],
      correctOptionId: 'a',
      rationale: 'TCP协议在传输层不仅添加端口，还会添加序列号、确认号和标志位（如SYN、ACK等），从而提供可靠传输。'
    },
    {
      id: 'q7',
      text: '从发送者的角度来看，数据包封装的正确顺序是？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '应用层 -> 网络层 -> 传输层 -> 数据链路层' },
        { id: 'b', label: 'B', text: '应用层 -> 传输层 -> 网络层 -> 数据链路层' },
        { id: 'c', label: 'C', text: '数据链路层 -> 网络层 -> 传输层 -> 应用层' },
        { id: 'd', label: 'D', text: '网络层 -> 传输层 -> 应用层 -> 数据链路层' }
      ],
      correctOptionId: 'b',
      rationale: '在发送数据时，封装顺序是从上到下：应用层产生数据，经过传输层、网络层，最后到数据链路层封装成帧。'
    },
    {
      id: 'q8',
      text: '在数据包封装中，“端口号”的作用通常被比作什么？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '邮政编码' },
        { id: 'b', label: 'B', text: '房子的门牌号' },
        { id: 'c', label: 'C', text: '身份证' },
        { id: 'd', label: 'D', text: '车牌号' }
      ],
      correctOptionId: 'b',
      rationale: '端口号就像房子的门牌号，负责告诉计算机是哪个具体的应用程序应该接收这批数据。'
    },
    {
      id: 'q9',
      text: '网络层添加的“IP地址”的作用可以比喻为？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '邮政编码' },
        { id: 'b', label: 'B', text: '房子的门牌号' },
        { id: 'c', label: 'C', text: '快递员' },
        { id: 'd', label: 'D', text: '包裹' }
      ],
      correctOptionId: 'a',
      rationale: 'IP地址决定了数据包在互联网中的转发路径，就像邮政编码一样，告诉网络系统数据应该发送到哪个大致区域或目的地。'
    },
    {
      id: 'q10',
      text: '当我们使用聊天软件发送一条文字消息时，这条消息内容本身是在哪一层生成的？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '数据链路层' },
        { id: 'b', label: 'B', text: '网络层' },
        { id: 'c', label: 'C', text: '传输层' },
        { id: 'd', label: 'D', text: '应用层' }
      ],
      correctOptionId: 'd',
      rationale: '应用层是数据封装的起点，聊天软件作为应用程序，会在应用层准备并生成要发送的原始数据消息。'
    }
  ]
};

export const SAMPLE_ASSESSMENT_2: Assessment = {
  id: 'arch-2',
  title: '文字编码与显示',
  volume: '第二套题',
  readingMaterial: {
    title: '文字编码与显示',
    iframeUrl: '/material2.html',
  },
  questions: [
    {
      id: 'q1',
      text: '在网络中发送汉字“朝”时，实际上在网络中传输的是什么？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '汉字的拼音（如zhao）' },
        { id: 'b', label: 'B', text: '汉字的点阵图像' },
        { id: 'c', label: 'C', text: '汉字的唯一身份标识（Unicode码点）' },
        { id: 'd', label: 'D', text: '汉字的笔画数' }
      ],
      correctOptionId: 'c',
      rationale: '网络只传字符身份证号（如U+671D），不传字形编码，这样可以大大减少传输数据量。'
    },
    {
      id: 'q2',
      text: '接收方电脑是如何将收到的编码显示出不同字体的汉字的？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '根据发送方传来的字形数据直接绘制' },
        { id: 'b', label: 'B', text: '根据收到的编码，调用本地安装的字体库查找对应的点阵或矢量轮廓' },
        { id: 'c', label: 'C', text: '完全随机生成一个汉字字形' },
        { id: 'd', label: 'D', text: '向网络请求对应字体的图片并显示' }
      ],
      correctOptionId: 'b',
      rationale: '智能电视、手机或电脑里预装了各种字体，收到编码后立刻查找该字体下对应的点阵或矢量轮廓再进行绘制。'
    },
    {
      id: 'q3',
      text: '为什么同一篇文章更换一种字体后，文字显示的样子变了，但内容一字不差？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '因为不同字体对应的拼音不同' },
        { id: 'b', label: 'B', text: '因为网络自动纠正了显示的错误' },
        { id: 'c', label: 'C', text: '因为更换字体只改变了本地的字形绘制方式，而底层代码或编码根本没有发生改变' },
        { id: 'd', label: 'D', text: '因为汉字的笔画可以被变形拉伸不受干扰' }
      ],
      correctOptionId: 'c',
      rationale: '无论选择何种字体，文字背后的统一编码（如0x671D）是相同的，只改变了本地渲染的视觉样式。'
    },
    {
      id: 'q4',
      text: '关于在电脑上显示文字的过程，正确的顺序是？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '键盘输入 -> 字符身份证号(Unicode) -> 字形编码 -> 外码转换 -> 屏幕显示' },
        { id: 'b', label: 'B', text: '键盘输入 -> 外码转换 -> 字符身份证号(Unicode) -> 字形编码 -> 屏幕显示' },
        { id: 'c', label: 'C', text: '外码转换 -> 键盘输入 -> 字形编码 -> 屏幕显示 -> 字符身份证号' },
        { id: 'd', label: 'D', text: '字符身份证号 -> 键盘输入 -> 外码转换 -> 屏幕显示 -> 字形编码' }
      ],
      correctOptionId: 'b',
      rationale: '根据学习资料中的流程图指引，过程为：1.键盘输入 2.外码转换 3.字符身份证号（Unicode码点） 4.字形编码 5.屏幕显示。'
    },
    {
      id: 'q5',
      text: '在16x16或24x24的黑白点阵字体中，数字“1”和“0”通常分别代表什么？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '1代表背景颜色，0代表文字颜色' },
        { id: 'b', label: 'B', text: '1代表绘制一个点（即有颜色），0代表不绘制点（即空白）' },
        { id: 'c', label: 'C', text: '1代表坐标的左边位置，0代表坐标的右边位置' },
        { id: 'd', label: 'D', text: '1代表拼音的首字母识别，0代表拼音的尾字母识别' }
      ],
      correctOptionId: 'b',
      rationale: '点阵数字只通过0和1两种状态表示画面情况，通常1表示绘制该位置的点，0表示不操作，从而拼结出最终图形。'
    },
    {
      id: 'q6',
      text: '下列哪一项属于汉字被输入到电脑时的“外码”（或称输入码）？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: 'U+671D' },
        { id: 'b', label: 'B', text: 'zhao（拼音）' },
        { id: 'c', label: 'C', text: '24x24点阵' },
        { id: 'd', label: 'D', text: '“朝”的具体屏幕字形' }
      ],
      correctOptionId: 'b',
      rationale: '对于人类而言，我们通过键盘打出的拼音（如zhao）、五笔等都属于计算机接收外部输入的对应码，即外码。'
    },
    {
      id: 'q7',
      text: '如果网络传输的过程中，采用直接传输每一个汉字的24x24点阵数据，相比于仅仅传输Unicode编码，其数据量会？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '变得非常小' },
        { id: 'b', label: 'B', text: '保持不变' },
        { id: 'c', label: 'C', text: '传输性能完全相同' },
        { id: 'd', label: 'D', text: '变得非常大，极其浪费网络资源' }
      ],
      correctOptionId: 'd',
      rationale: '24x24点阵每个字至少需要576位（即72字节），而Unicode编码通常只需几字节，直接传字形会大幅增加数据体积。'
    },
    {
      id: 'q8',
      text: '发送方设备和接收方设备必须共同遵循什么准则才能保证“发送的内容和接收的内容基本一致”？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '必须使用同一款聊天软件应用' },
        { id: 'b', label: 'B', text: '必须拥有完全相同的出厂字体库文件' },
        { id: 'c', label: 'C', text: '采用统一的且相互认可的字符集编码标准（如Unicode）' },
        { id: 'd', label: 'D', text: '必须直接连接同一个局域WiFi' }
      ],
      correctOptionId: 'c',
      rationale: '只要双方底层都遵循统一的Unicode等编码标准，即使本地所用的个性化字体库不同，也能够顺利解析并显示出正确的对应字符。'
    },
    {
      id: 'q9',
      text: '网页代码中包含了一个简化版网络传输包的例子：`[ 源IP... 数据: 朝( U+671D ) ]`。这个例子想要强调说明什么？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '传输包内部包含了复杂的字形变形算法' },
        { id: 'b', label: 'B', text: '网络传输实质上仅包含字符代码，不包含任何用于屏幕显示的字形的“长相”数据' },
        { id: 'c', label: 'C', text: '数据中自带了宋体或者楷体这样的文字排版设计' },
        { id: 'd', label: 'D', text: 'U+671D直接发音代表了这个汉字的现代汉语读音' }
      ],
      correctOptionId: 'b',
      rationale: '简化版的网络传输包示意旨在强调传输的数据本质是它的身份ID也就是字符编码，绝无任何渲染形状方面的信息。'
    },
    {
      id: 'q10',
      text: '一名同学在互动页面上点击“隶书”按钮后，屏幕上的“朝”字变成了厚重的隶书风格，以下哪项内容并没有发生改变？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '屏幕上呈现出的点阵矩阵排列' },
        { id: 'b', label: 'B', text: '对应汉字在计算机内部用于存储和表示其本体的Unicode码点' },
        { id: 'c', label: 'C', text: '最终显示这个字符边缘所占用的绘制像素细节' },
        { id: 'd', label: 'D', text: '用户视觉上的观感与交互体验' }
      ],
      correctOptionId: 'b',
      rationale: '切换不同艺术字体只会改变字形本身基于预设算法进行点阵或矢量的重新渲染，对应字符最根源的内码永远保持不变。'
    }
  ]
};

export const ASSESSMENTS: Record<string, Assessment> = {
  '1': SAMPLE_ASSESSMENT,
  '2': SAMPLE_ASSESSMENT_2
};
