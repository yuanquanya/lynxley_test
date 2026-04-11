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
    },
    {
      id: 'q11',
      text: '在数据包封装和传输的过程中，如果原始数据太大，会在哪一层被分割成较小的数据段（Segments）？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '应用层' },
        { id: 'b', label: 'B', text: '传输层' },
        { id: 'c', label: 'C', text: '网络层' },
        { id: 'd', label: 'D', text: '数据链路层' }
      ],
      correctOptionId: 'b',
      rationale: '传输层（特别是TCP协议）会将应用层传来的大数据块分割成适合传输的较小数据段（Segments），并在接收端重新组装。'
    },
    {
      id: 'q12',
      text: '接收方设备收到数据包后，逐层剥离头部信息的反向过程称为什么？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '分段 (Segmentation)' },
        { id: 'b', label: 'B', text: '封装 (Encapsulation)' },
        { id: 'c', label: 'C', text: '路由 (Routing)' },
        { id: 'd', label: 'D', text: '解封装 (Decapsulation)' }
      ],
      correctOptionId: 'd',
      rationale: '接收方在收到数据后，会从数据链路层开始，向上逐层剥离对应的协议头部信息，这个过程被称为解封装。'
    },
    {
      id: 'q13',
      text: '如果接收方在解封装的第一步发现数据包中的MAC地址不是发给自己的，它会怎么处理这个数据包？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '修改MAC地址后继续向上传递' },
        { id: 'b', label: 'B', text: '直接丢弃这个数据包而不做进一步处理' },
        { id: 'c', label: 'C', text: '将其退回给发送方' },
        { id: 'd', label: 'D', text: '交由应用层来决定是否读取' }
      ],
      correctOptionId: 'b',
      rationale: '网络接口卡（网卡）在数据链路层工作，如果识别到目的MAC地址与自身不符，通常会在硬件层面直接丢弃该数据包，以减轻系统负担。'
    },
    {
      id: 'q14',
      text: '现实生活中我们传输大文件（如1GB的电影）时，网络并不会把它当成一个巨大的单独数据包发送。这是因为？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '网络硬件和协议栈在每一层都规定了最大传输单元（MTU），超大文件必须被切片' },
        { id: 'b', label: 'B', text: '大文件里包含恶意代码的可能性更大' },
        { id: 'c', label: 'C', text: '如果打包成一个数据包发送，传输速度会比切片慢很多' },
        { id: 'd', label: 'D', text: '应用层不支持超过1MB的连续读取操作' }
      ],
      correctOptionId: 'a',
      rationale: '网络每一层都有其最大传输单元限制（例如以太网通常为1500字节），因此网络协议栈必须将大型文件切片为一个个小数据包进行独立传输。'
    },
    {
      id: 'q15',
      text: '如果把“封装过程”比作俄罗斯套娃，那么最里面的那一层娃娃代表什么？',
      category: '原理解析',
      options: [
        { id: 'a', label: 'A', text: '以太网帧尾的错误校验码' },
        { id: 'b', label: 'B', text: '发送方计算机的MAC地址' },
        { id: 'c', label: 'C', text: '应用程序生成的原始有效载荷（即真实的原始数据）' },
        { id: 'd', label: 'D', text: '在网络中负责寻找路径的路由器' }
      ],
      correctOptionId: 'c',
      rationale: '原始数据在封装过程中被层层包裹，如同位于最内部的俄罗斯套娃，而外部的套娃则是各层叠加的网络协议首部。'
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
        { id: 'c', label: 'C', text: '作为“翻译官”，将键盘敲入的“外码”（比如拼音序列）对应转换成计算机能懂的“内码”' },
        { id: 'd', label: 'D', text: '将字形码发送到显卡要求渲染' }
      ],
      correctOptionId: 'c',
      rationale: '输入法的任务就是在字典表里搜索，将拼音、五笔等键盘外码“翻译”并输出成标准的Unicode内码交由系统内核处理。'
    },
    {
      id: 'q13',
      text: '小明用一部非常旧的老式手机接收到了朋友发来的当年新发布的Emoji表情，结果屏幕上只显示了一个“方块”或“问号”。其本质原因是？',
      category: '综合应用',
      options: [
        { id: 'a', label: 'A', text: '发送方并没有真正的把这几个字节的数据通过网络发出去' },
        { id: 'b', label: 'B', text: '网络在这个表情的传输过程中出现了高丢包率' },
        { id: 'c', label: 'C', text: '小明手机虽然成功收到了正确的字符内码，但其本地字库太旧，找不到能用来画出这个新表情的字形' },
        { id: 'd', label: 'D', text: '这个新Emoji表情的点阵数据过于庞大，超出了老手机的内存' }
      ],
      correctOptionId: 'c',
      rationale: '显示“方块”通常是因为设备成功解码出了Unicode码点，但在本地落后且未更新的字体库文件中查无此字，只能使用代表缺失字符的占位符（Tofu符号）。'
    },
    {
      id: 'q14',
      text: '相比于传统的“点阵字体”，现代操作系统更倾向于使用“矢量字体”（如TrueType/OpenType），它的最大优势是？',
      category: '核心概念',
      options: [
        { id: 'a', label: 'A', text: '能够保存更丰富的多媒体视频文件' },
        { id: 'b', label: 'B', text: '任意放大或缩小都不会产生边缘的“马赛克”锯齿现象，并且字库文件体积更易控制' },
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
        { id: 'd', label: 'D', text: '由于编码转换表的错位对应，屏幕上大概率会显示出一堆无意义的“乱码”' }
      ],
      correctOptionId: 'd',
      rationale: '如果没有统一的万国码标准作基础约束，不同语言地区制定的传统内码在相同字节序列下指代的字符大概率是不通用的，用错了解码本就会出现乱码。'
    }
  ]
};

export const ASSESSMENTS: Record<string, Assessment> = {
  '1': SAMPLE_ASSESSMENT,
  '2': SAMPLE_ASSESSMENT_2
};
