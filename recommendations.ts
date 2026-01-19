import { ReportSection, ReportState, ThinkingStep } from './types';
import { LIVE_METRICS_DATA, LIVE_METRICS_COLUMNS } from './constants';

export const THINKING_STEPS: ThinkingStep[] = [
  {
    id: '1',
    title: '实验核心目标验证',
    items: [
      { label: '生活服务直播-交易链路', type: 'metric', description: '购物袋链路关键节点变化，识别提升或流失环节' },
      { label: '生活服务直播-交易链路', type: 'metric', description: '拆分讲解卡与货架的贡献比例，看是否真实作用于货架卡' },
      { label: '生活服务直播-分组件交易链路明细', type: 'metric' }
    ]
  },
  {
    id: '2',
    title: '用户行为影响分析',
    items: [
      { label: '生活服务-直播用户核心指标', type: 'metric', description: '看播行为是否有影响' },
      { label: '生活服务直播-用户看播指标', type: 'metric' },
      { label: '生活服务直播-内容消费指标组', type: 'metric', description: '监控互动指标，判断用户对功能接受度' },
      { label: '生活服务-直播用户核心指标', type: 'metric' }
    ]
  },
  {
    id: '3',
    title: '分场景与分行业差异（泛化性验证）',
    items: [
      { 
        label: '生活服务直播-商品分行业核心指标', 
        type: 'metric',
        description: '分行业拆解，定位核心受益行业',
        children: [
            { label: 'C端一级行业', type: 'dimension' }
        ]
      },
      { 
        label: '生活服务-直播用户核心指标', 
        type: 'metric',
        description: '分场景拆解，验证在不同场景效果差异',
        children: [
            { label: 'room_type (直播间类型)', type: 'dimension' },
            { label: 'is_all_groupon_same_city (商品城市)', type: 'dimension' },
            { label: 'is_has_local_verify_poi (是否带POI)', type: 'dimension' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: '性能指标监控',
    items: [
      { label: '本地直播-货架-性能指标', type: 'metric' },
      { label: '本地直播-货架-性能指标-均值', type: 'metric' }
    ]
  },
  {
      id: '5',
      title: '护栏指标监控',
      items: [
          { label: 'APP-活跃天数', type: 'metric' },
          { label: '直播-业务核心【累计】', type: 'metric' },
          { label: '电商-业务核心-自然流量', type: 'metric' }
      ]
  }
];

export const INITIAL_SUMMARY_DATA = [
  {
    type: 'positive',
    title: '核心指标显著提升',
    content: '实验组在核心交易指标取得正向收益：直播GMV 显著提升 +6.27%，直播人均订单数 显著提升 +7.27%，验证了画面自适应对交易效率的促进作用。',
    highlights: [
      { text: '+6.27%', type: 'positive' },
      { text: '+7.27%', type: 'positive' }
    ]
  },
  {
    type: 'neutral',
    title: '用户行为分化明显',
    content: '商家自播场景表现最佳： 支付UV渗透率 +0.16%，人均订单数 +0.29% 显著提升，自适应策略更契合商品讲解型直播。',
    highlights: [
      { text: '+0.16%', type: 'positive' },
      { text: '+0.29%', type: 'positive' }
    ]
  },
  {
    type: 'warning',
    title: '支付活跃用户收益显著',
    content: '人均订单数 +7.27% 和 直播GMV +6.27% 提升，而支付流失用户货架支付CVR -1.10% 下降，需关注流失用户对新交互的适应性。',
    highlights: [
      { text: '+7.27%', type: 'positive' },
      { text: '+6.27%', type: 'positive' },
      { text: '-1.10%', type: 'negative' }
    ]
  }
];

export const DEFAULT_REPORT_SECTIONS: ReportSection[] = [
  {
    id: 'section_summary',
    type: 'summary',
    title: '实验总结',
    data: INITIAL_SUMMARY_DATA
  },
  {
    id: 'section_metric_1',
    type: 'metric_table',
    title: '生活服务-直播用户核心指标',
    level: '一级',
    data: {
      rows: LIVE_METRICS_DATA,
      columns: LIVE_METRICS_COLUMNS
    }
  },
  {
    id: 'section_metric_2',
    type: 'metric_table',
    title: '生活服务直播-商品分行业核心指标',
    level: '一级',
    data: {
      rows: LIVE_METRICS_DATA,
      columns: LIVE_METRICS_COLUMNS
    }
  }
];

export const getInitialReportState = (): ReportState => {
  return {
    sections: DEFAULT_REPORT_SECTIONS,
    thinkingSteps: THINKING_STEPS
  };
};
