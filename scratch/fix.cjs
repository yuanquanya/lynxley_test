const fs = require('fs');
let s = fs.readFileSync('src/constants.ts', 'utf8');
const m = {
  '应用层': '核心概念', '数据链路层': '核心概念', '编码理论': '核心概念', '流程认知': '核心概念', '编码类型': '核心概念', '统一标准': '核心概念',
  '传输层': '原理解析', '网络层': '原理解析', '字形渲染': '原理解析', '字形与内容': '原理解析', '字形呈现': '原理解析', '传输效率': '原理解析',
  '综合理解': '综合应用', '理解应用': '综合应用', '综合应用': '综合应用'
};
s = s.replace(/category:\s*'([^']+)'/g, (match, p1) => {
  return `category: '${m[p1] || p1}'`;
});
fs.writeFileSync('src/constants.ts', s);
