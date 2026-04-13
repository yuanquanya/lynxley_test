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
  },
  {
    id: '3',
    title: '密码里的数学魔法',
    category: 'Logic',
    difficulty: 'Beginner',
    duration: '10 分钟',
    description: '通过数学组合数了解密码破解的原理与防御策略。',
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
      text: '在数据包封装中，"端口号"的作用通常被比作什么？',
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
      text: '网络层添加的"IP地址"的作用可以比喻为？',
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
    },
    {
      id: 'q11',
      text: '在数据包封装的过程中，随着经过的步骤增加，数据包的总大小会发生什么变化？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '逐渐变大（因为每一层都添加了新的“头部”信息）' },
        { id: 'b', label: 'B', text: '逐渐变小（因为数据被压缩了）' },
        { id: 'c', label: 'C', text: '保持不变' },
        { id: 'd', label: 'D', text: '随机变化' }
      ],
      correctOptionId: 'a',
      rationale: '每一层封装都会添加该层的协议头部信息，因此数据包的总长度会随着封装过程不断增加。'
    },
    {
      id: 'q12',
      text: '在可视化演示的第一步中，应用程序准备好的原始数据会被转换成什么格式以便计算机理解？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '图片格式' },
        { id: 'b', label: 'B', text: '纸质文档' },
        { id: 'c', label: 'C', text: '二进制格式' },
        { id: 'd', label: 'D', text: '声音信号' }
      ],
      correctOptionId: 'c',
      rationale: '学习资料提到，应用程序准备好数据后，数据会被转换成计算机能理解的二进制格式。'
    },
    {
      id: 'q13',
      text: '在可视化演示界面的表头中，使用“🌐”图标代表的是哪一层？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '应用层' },
        { id: 'b', label: 'B', text: '传输层' },
        { id: 'c', label: 'C', text: '网络层' },
        { id: 'd', label: 'D', text: '数据链路层' }
      ],
      correctOptionId: 'c',
      rationale: '在演示界面中，🌐 图标专门用于标识网络层。'
    },
    {
      id: 'q14',
      text: '在可视化演示界面的四步封装过程中，最后一步是哪一层？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '应用层' },
        { id: 'b', label: 'B', text: '传输层' },
        { id: 'c', label: 'C', text: '网络层' },
        { id: 'd', label: 'D', text: '数据链路层' }
      ],
      correctOptionId: 'd',
      rationale: '封装过程是从上到下的，数据链路层是四步中的最后一步，负责添加物理地址（MAC地址）。'
    },
    {
      id: 'q15',
      text: '假设在演示中输入的消息经UTF-8编码后为42字节，根据可视化中显示的各层头部大小（传输层20字节、网络层20字节、数据链路层14字节），完成全部封装后的数据包总大小应该是多少字节？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '42 字节' },
        { id: 'b', label: 'B', text: '76 字节' },
        { id: 'c', label: 'C', text: '96 字节' },
        { id: 'd', label: 'D', text: '128 字节' }
      ],
      correctOptionId: 'c',
      rationale: '数据包的总大小 = 应用层数据(42字节) + 传输层TCP头部(20字节) + 网络层IP头部(20字节) + 数据链路层以太网头部(14字节) = 96字节。这些数值可以直接从演示界面中各层显示的字节数计算得出。'
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
      text: '在网络中发送汉字"朝"时，实际上在网络中传输的是什么？',
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
      text: '在16x16或24x24的黑白点阵字体中，数字"1"和"0"通常分别代表什么？',
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
      text: '下列哪一项属于汉字被输入到电脑时的"外码"（或称输入码）？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: 'U+671D' },
        { id: 'b', label: 'B', text: 'zhao（拼音）' },
        { id: 'c', label: 'C', text: '24x24点阵' },
        { id: 'd', label: 'D', text: '"朝"的具体屏幕字形' }
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
      text: '发送方设备和接收方设备必须共同遵循什么准则才能保证"发送的内容和接收的内容基本一致"？',
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
        { id: 'b', label: 'B', text: '网络传输实质上仅包含字符代码，不包含任何用于屏幕显示的字形的"长相"数据' },
        { id: 'c', label: 'C', text: '数据中自带了宋体或者楷体这样的文字排版设计' },
        { id: 'd', label: 'D', text: 'U+671D直接发音代表了这个汉字的现代汉语读音' }
      ],
      correctOptionId: 'b',
      rationale: '简化版的网络传输包示意旨在强调传输的数据本质是它的身份ID也就是字符编码，绝无任何渲染形状方面的信息。'
    },
    {
      id: 'q10',
      text: '一名同学在互动页面上点击"隶书"按钮后，屏幕上的"朝"字变成了厚重的隶书风格，以下哪项内容并没有发生改变？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '屏幕上呈现出的点阵矩阵排列' },
        { id: 'b', label: 'B', text: '对应汉字在计算机内部用于存储和表示其本体的Unicode码点' },
        { id: 'c', label: 'C', text: '最终显示这个字符边缘所占用的绘制像素细节' },
        { id: 'd', label: 'D', text: '用户视觉上的观感与交互体验' }
      ],
      correctOptionId: 'b',
      rationale: '切换不同艺术字体只会改变字形本身基于预设算法进行点阵或矢量的重新渲染，对应字符最根源的内码永远保持不变。'
    },
    {
      id: 'q11',
      text: '计算机内部处理和流转文字时，使用的是什么格式的编码？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '外码（如拼音、五笔键位码）' },
        { id: 'b', label: 'B', text: '内码（如Unicode码点）' },
        { id: 'c', label: 'C', text: '字形码（如点阵矩阵）' },
        { id: 'd', label: 'D', text: '扫描仪产生的图像编码' }
      ],
      correctOptionId: 'b',
      rationale: '为了保证信息的统一性，计算机在存储及各种内部处理过程中，均使用与字形和输入方式无关的内码（如Unicode）来表示文字。'
    },
    {
      id: 'q12',
      text: '输入法软件在此场景下的核心本职工作是什么？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '负责给文字加上彩色艺术样式' },
        { id: 'b', label: 'B', text: '将用户的无规则敲击事件记录下来并保存到硬盘' },
        { id: 'c', label: 'C', text: '作为"翻译官"，将键盘敲入的"外码"（比如拼音序列）对应转换成计算机能懂的"内码"' },
        { id: 'd', label: 'D', text: '将字形码发送到显卡要求渲染' }
      ],
      correctOptionId: 'c',
      rationale: '输入法的任务就是在字典表里搜索，将拼音、五笔等键盘外码"翻译"并输出成标准的Unicode内码交由系统内核处理。'
    },
    {
      id: 'q13',
      text: '小明用一部非常旧的老式手机接收到了朋友发来的当年新发布的Emoji表情，结果屏幕上只显示了一个"方块"或"问号"。其本质原因是？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '发送方并没有真正的把这几个字节的数据通过网络发出去' },
        { id: 'b', label: 'B', text: '网络在这个表情的传输过程中出现了高丢包率' },
        { id: 'c', label: 'C', text: '小明手机虽然成功收到了正确的字符内码，但其本地字库太旧，找不到能用来画出这个新表情的字形' },
        { id: 'd', label: 'D', text: '这个新Emoji表情的点阵数据过于庞大，超出了老手机的内存' }
      ],
      correctOptionId: 'c',
      rationale: '显示"方块"通常是因为设备成功解码出了Unicode码点，但在本地落后且未更新的字体库文件中查无此字，只能使用代表缺失字符的占位符（Tofu符号）。'
    },
    {
      id: 'q14',
      text: '相比于传统的"点阵字体"，现代操作系统更倾向于使用"矢量字体"（如TrueType/OpenType），它的最大优势是？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '能够保存更丰富的多媒体视频文件' },
        { id: 'b', label: 'B', text: '任意放大或缩小都不会产生边缘的"马赛克"锯齿现象，并且字库文件体积更易控制' },
        { id: 'c', label: 'C', text: '它能把同一段文字翻译成地球上的上百种语言' },
        { id: 'd', label: 'D', text: '不需要依赖任何内码协议就能被读取' }
      ],
      correctOptionId: 'b',
      rationale: '矢量字体使用数学曲线和公式来描述字形的边缘轮廓，因此可以无损地缩放到任意清晰度，解决了点阵字体放大后变糊的顽疾。'
    },
    {
      id: 'q15',
      text: '对于一台中文电脑和一台日文电脑，如果不使用Unicode，而是各自使用传统的本地编码标准（如GBK与Shift-JIS）互传一个仅包含纯内码的文本文件，通常会导致？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '网络协议层自动挂断拦截此文件' },
        { id: 'b', label: 'B', text: '文字内容变得更加精彩丰富' },
        { id: 'c', label: 'C', text: '日文电脑强行让显卡改变分辨率来适应中文格式' },
        { id: 'd', label: 'D', text: '由于编码转换表的错位对应，屏幕上大概率会显示出一堆无意义的"乱码"' }
      ],
      correctOptionId: 'd',
      rationale: '如果没有统一的万国码标准作基础约束，不同语言地区制定的传统内码在相同字节序列下指代的字符大概率是不通用的，用错了解码本就会出现乱码。'
    }
  ]
};

export const SAMPLE_ASSESSMENT_3: Assessment = {
  id: 'arch-3',
  title: '密码里的数学魔法',
  volume: '第三套题',
  readingMaterial: {
    title: '密码里的数学魔法',
    iframeUrl: '/material3.html',
  },
  questions: [
    {
      id: 'q1',
      text: '警察破译保险柜通常需要一个个试密码，网络世界里黑客是怎么暴力破解密码的？',
      category: '安全基础',
      options: [
        { id: 'a', label: 'A', text: '找人问出密码' },
        { id: 'b', label: 'B', text: '运用社交工程学骗取' },
        { id: 'c', label: 'C', text: '让电脑飞快地"猜"所有的密码组合' },
        { id: 'd', label: 'D', text: '利用系统的超级后门直接绕过' }
      ],
      correctOptionId: 'c',
      rationale: '文章中提到，黑客在网络世界中一样是通过让电脑飞快地枚举、"猜"出密码来暴力破解密码的。'
    },
    {
      id: 'q2',
      text: '假设你的密码只有数字（0-9），且位数为4位，那么这种情况下总共有多少种可能的密码组合？',
      category: '问题测算',
      options: [
        { id: 'a', label: 'A', text: '100 种' },
        { id: 'b', label: 'B', text: '1000 种' },
        { id: 'c', label: 'C', text: '10,000 种' },
        { id: 'd', label: 'D', text: '100,000 种' }
      ],
      correctOptionId: 'c',
      rationale: '每位只有10种可能，4位数就是10×10×10×10=10,000种。'
    },
    {
      id: 'q3',
      text: '根据资料假设，如果黑客的电脑一秒钟能尝试1000个密码组合，那么破解一个4位数的纯数字密码最多需要多长时间？',
      category: '问题测算',
      options: [
        { id: 'a', label: 'A', text: '1 秒' },
        { id: 'b', label: 'B', text: '10 秒' },
        { id: 'c', label: 'C', text: '100 秒' },
        { id: 'd', label: 'D', text: '28 小时' }
      ],
      correctOptionId: 'b',
      rationale: '总组合数为10,000种，每秒跑1000次的话，最多只需10秒就能把所有的可能穷举一遍。'
    },
    {
      id: 'q4',
      text: '如果把密码长度从4位数字增加到8位纯数字密码，此时密码的可能的组合总数是？',
      category: '问题测算',
      options: [
        { id: 'a', label: 'A', text: '1 万种' },
        { id: 'b', label: 'B', text: '10 万种' },
        { id: 'c', label: 'C', text: '100 万种' },
        { id: 'd', label: 'D', text: '1 亿种' }
      ],
      correctOptionId: 'd',
      rationale: '8位纯数字密码的组合数是10的8次方，即足足1亿种组合。'
    },
    {
      id: 'q5',
      text: '根据资料假设（每秒尝试1000次），由于升级到了8位纯数字密码，破解它大约需要消耗多长时间？',
      category: '逻辑推理',
      options: [
        { id: 'a', label: 'A', text: '10 秒' },
        { id: 'b', label: 'B', text: '1 小时' },
        { id: 'c', label: 'C', text: '大约 28 小时' },
        { id: 'd', label: 'D', text: '大约 7 万年' }
      ],
      correctOptionId: 'c',
      rationale: '1亿种组合除以每秒1000次，等于10万秒，换算出来大约是28小时。'
    },
    {
      id: 'q6',
      text: '如果我们在密码中混合使用大写字母（26个）、小写字母（26个）和数字（10个），密码的每一位会有多少个不同的备选字符？',
      category: '安全基础',
      options: [
        { id: 'a', label: 'A', text: '10 个' },
        { id: 'b', label: 'B', text: '26 个' },
        { id: 'c', label: 'C', text: '52 个' },
        { id: 'd', label: 'D', text: '62 个' }
      ],
      correctOptionId: 'd',
      rationale: '大写字母26个 + 小写字母26个 + 数字10个 = 总计 62 个备选字符。'
    },
    {
      id: 'q7',
      text: '当使用由"大写字母+小写字母+数字"组成的复杂8位混合密码时（产生218万亿种可能），按每秒1000次的电脑速度破解它大约需要消耗多长时间？',
      category: '问题测算',
      options: [
        { id: 'a', label: 'A', text: '大约 28 小时' },
        { id: 'b', label: 'B', text: '1 个月' },
        { id: 'c', label: 'C', text: '大约 7 万年' },
        { id: 'd', label: 'D', text: '百万年' }
      ],
      correctOptionId: 'c',
      rationale: '包含62种字符的8位密码产生218万亿组合，按照上述速度计算破解大约需要7万年。'
    },
    {
      id: 'q8',
      text: '为什么各大系统的安全策略强烈建议你使用不但长，而且包含大小写、数字和特殊符号(@/#)组成的密码？',
      category: '安全基础',
      options: [
        { id: 'a', label: 'A', text: '因为长密码在输入时比较有节奏感' },
        { id: 'b', label: 'B', text: '因为这样做相当于给黑客的破解程序出了一道几乎解不开的数学难题' },
        { id: 'c', label: 'C', text: '只有长密码才能兼容新的网卡驱动' },
        { id: 'd', label: 'D', text: '这会增加本地电脑网页的浏览速度' }
      ],
      correctOptionId: 'b',
      rationale: '增加字符种类和长度能呈指数级膨胀组合数量，从而把破解时间拉长到百万年甚至更长，保护网络安全。'
    },
    {
      id: 'q9',
      text: '从本文阅读中可以总结，"暴力破解密码"能否成功拦截，其在数学上考验的主要因素是？',
      category: '逻辑推理',
      options: [
        { id: 'a', label: 'A', text: '加法与减法的快速运用' },
        { id: 'b', label: 'B', text: '空间几何图形的解析' },
        { id: 'c', label: 'C', text: '不同字符池与密码长度带来的排列组合的巨大基数' },
        { id: 'd', label: 'D', text: '高级微积分运算的复杂度' }
      ],
      correctOptionId: 'c',
      rationale: '破解时间取决于密码备选元素的广度及长度，即高中数学中的排列及乘法原理带来的庞大组合数。'
    },
    {
      id: 'q10',
      text: '【案例探究】如果张三的身份证信息被不慎泄露，且他习惯只使用"纯数字+姓名字母"来设置密码。那么针对张三这种特定的人，黑客极大概率会用什么信息做成字典，让那几万年的破解时间缩短到几分钟？',
      category: '案例分析',
      options: [
        { id: 'a', label: 'A', text: '他在游戏中获取的高级装备名称' },
        { id: 'b', label: 'B', text: '毫无逻辑且不重复的完全随机乱码' },
        { id: 'c', label: 'C', text: '张三的出生年月日、手机号码末位以及他名字的拼音首字母缩写' },
        { id: 'd', label: 'D', text: '世界著名密码学家的生平事迹' }
      ],
      correctOptionId: 'c',
      rationale: '黑客对于信息泄露者会进行定向社工爆破，常将其生日、姓名拼音等直接信息优先纳入字典进行测算尝试，使得破解防线迅速瓦解。'
    }
  ]
};

export const ASSESSMENTS: Record<string, Assessment> = {
  '1': SAMPLE_ASSESSMENT,
  '2': SAMPLE_ASSESSMENT_2,
  '3': SAMPLE_ASSESSMENT_3
};
